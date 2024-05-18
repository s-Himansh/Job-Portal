const express = require('express');
const Router = express.Router();
const Chat = require('../Models/Chat');

Router.get('/getChat/:rec_id/:user_id/:application_id', async (req, res) => {
    try {
        const { rec_id, user_id, application_id } = req.params;
        const chat = await Chat.findOne({ rec_id, user_id, application_id });
        if (!chat) {
            return res.json({ success: false, message: 'Chat not found' });
        }
        return res.json({ success: true, chat });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
});

Router.post('/sendMessage', async (req, res) => {
    try {
        const { rec_id, user_id, application_id, type, content } = req.body;
        let chat = await Chat.findOne({ rec_id, user_id, application_id });
        if (!chat) {
            chat = new Chat({ rec_id, user_id, application_id, messages: [] });
        }
        chat.messages.push({ type, content });
        await chat.save();
        return res.json({ success: true, chat });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
});

module.exports = Router;

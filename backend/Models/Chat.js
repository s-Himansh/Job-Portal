const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    type: { type: String, required: true }, 
    content: { type: String, required: true }
});

const chatSchema = new Schema({
    rec_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    application_id: { type: Schema.Types.ObjectId, required: true },
    messages: [messageSchema]
});

module.exports = mongoose.model('Chat', chatSchema);

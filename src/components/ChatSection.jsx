import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import { Link, useLocation } from 'react-router-dom';

function ChatSection() {
    const { rec_id, user_id, application_id } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const location = useLocation();

    // messages = [
    //     {type : "Recruiter", content : "Hi applier"},
    //     {type : "Job Seeker", content : "Hello Sir"},
    //     {type : "Recruiter", content : "Hi applier"},
    //     {type : "Job Seeker", content : "Hello Sir"},
    //     {type : "Recruiter", content : "Hi applier"},
    //     {type : "Job Seeker", content : "Hello Sir Hello Sir Hello Sir"},
    // ]


    const userData = JSON.parse(localStorage.getItem('user'));
    const backUrl = location.pathname;
    // console.log(backUrl);
    // console.log(userData);
    useEffect(() => {
        const fetchChat = async () => {
            const response = await fetch(`http://localhost:5000/getChat/${rec_id}/${user_id}/${application_id}`);
            const data = await response.json();
            if (data.success) {
                setMessages(data.chat.messages);
            }
        };
        fetchChat();
    });

    const handleSendMessage = async () => {
        const response = await fetch(`http://localhost:5000/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rec_id, user_id, application_id, type: userData.userType, content: newMessage })
        });
        const data = await response.json();
        if (data.success) {
            setMessages(data.chat.messages);
            setNewMessage('');
        }
    };

    return (
        <>
            <div className="absolute font-bold py-2 px-4 rounded bg-gradient-to-br from-blue-100 to-green-100 m-5 border-2 border-gray-600 hover:bg-gray-100">
                <Link to={userData.userType === 'Recruiter' ? `${backUrl.substring(0, backUrl.length - 86)}` : '/applications'}>
                    Back
                </Link>
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-4">
                {localStorage.getItem('session_token') !== null ? <SideNavbar userType={JSON.parse(localStorage.getItem('user')).userType} /> : <NavBar />}
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-center mb-6">Chat with {userData.userType === 'Recruiter' ? 'Applicant' : 'Recruiter'}</h1>
                    <div className="overflow-y-auto no-scrollbar h-[33rem] mb-4 border rounded-lg p-4 bg-gray-50">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 flex ${message.type === userData.userType ? 'justify-end' : 'justify-start'}`}>
                                {/* <div className={`max-w-xs p-3 rounded-lg ${message.type === 'Job Seeker' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    {message.content}
                                </div> */}
                                <div className={`max-w-xs p-3 rounded-lg ${userData.userType === message.type ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            className="flex-grow border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex justify-content items-center "
                        >
                            Send

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16" className='ml-1'>
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatSection;

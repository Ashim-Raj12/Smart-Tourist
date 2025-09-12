import React, { useState } from 'react';
import api from '../utils/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    try {
      const res = await api.post('/chatbot', { question: input });
      const botMessage = { text: res.data.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { text: 'Sorry, I couldn\'t find an answer.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput('');
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        💬
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
          <div className="p-4 bg-gray-700 rounded-t-lg">
            <h3 className="font-bold">Safety Chatbot</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-600">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-l focus:outline-none"
                placeholder="Ask a safety question..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

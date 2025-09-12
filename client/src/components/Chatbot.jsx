import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
      >
        💬
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-gray-800 text-white rounded-lg shadow-2xl flex flex-col animate-slide-up z-40">
          <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg">
            <h3 className="font-bold text-blue-400">Safety Chatbot</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'} animate-fade-in`}>
                <span className={`inline-block p-3 rounded-lg max-w-xs break-words ${msg.sender === 'user' ? 'bg-blue-600 shadow-md' : 'bg-gray-600 shadow-md'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-600 bg-gray-700 rounded-b-lg">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Ask a safety question..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg transition-colors duration-200"
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

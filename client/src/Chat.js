import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from './socket/socket';

function Chat({ username }) {
  const {
    connect,
    disconnect,
    messages,
    sendMessage,
    typingUsers,
    setTyping,
    users
  } = useSocket();

  const [message, setMessage] = useState('');
  const messageRef = useRef();

  useEffect(() => {
    connect(username);
    return () => disconnect();
  }, [username]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {username} 👋
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-600">
              Online: {users.map(u => u.username).join(', ') || 'No users online'}
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="animate-fadeIn">
                {msg.system ? (
                  <div className="text-center">
                    <span className="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {msg.message}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {msg.sender.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
                        <p className="text-sm font-semibold text-green-600 mb-1">
                          {msg.sender}
                        </p>
                        <p className="text-gray-800">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messageRef}></div>
          </div>
        </div>

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-sm text-gray-500">
                {typingUsers.join(', ')} is typing...
              </p>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => {
                setMessage(e.target.value);
                setTyping(e.target.value !== '');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
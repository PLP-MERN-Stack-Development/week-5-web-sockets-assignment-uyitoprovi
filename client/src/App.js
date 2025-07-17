import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {joined ? (
        <Chat username={username} />
      ) : (
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Chat</h2>
            <p className="text-gray-600">Enter your name to start chatting</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                onKeyDown={(e) => e.key === 'Enter' && username && setJoined(true)}
              />
            </div>
            
            <button
              onClick={() => username && setJoined(true)}
              disabled={!username}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
            >
              Join Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
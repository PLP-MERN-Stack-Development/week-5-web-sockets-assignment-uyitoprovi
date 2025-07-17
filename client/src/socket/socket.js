import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:5000', {
  autoConnect: false,
});

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const connect = (username) => {
    socket.connect();
    socket.emit('user_join', username);
  };

  const disconnect = () => socket.disconnect();

  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('user_joined', (user) => {
      setMessages((prev) => [...prev, {
        id: Date.now(),
        system: true,
        message: `${user.username} joined`,
      }]);
    });

    socket.on('user_left', (user) => {
      setMessages((prev) => [...prev, {
        id: Date.now(),
        system: true,
        message: `${user.username} left`,
      }]);
    });

    socket.on('user_list', (userList) => setUsers(userList));
    socket.on('typing_users', (typing) => setTypingUsers(typing));

    return () => socket.removeAllListeners();
  }, []);

  return {
    socket,
    isConnected,
    messages,
    typingUsers,
    users,
    connect,
    disconnect,
    sendMessage,
    setTyping,
  };
};

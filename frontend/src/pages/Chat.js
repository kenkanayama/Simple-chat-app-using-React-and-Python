import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import '../styles/chat.css';

const Chat = () => {
  const location = useLocation();
  const { username, room } = location.state;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.emit('join', { username, room });

    socket.current.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [username, room]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "" && socket.current) {
      socket.current.emit('message', { room, username, message });
      setMessage('');
    }
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.systemMessage
                  ? "chat-message"
                  : `chat-message ${message.username === username ? 'right' : 'left'}`
            }
          >
            {message.systemMessage ? (
              <div className="chat-message-text">{message.message}</div>
            ) : (
              <>
                <div className="chat-message-user">{message.username}</div>
                <div className="chat-message-text">{message.message}</div>
                <div className="chat-message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
              </>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

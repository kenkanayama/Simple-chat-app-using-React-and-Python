import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/chat.css';

const Chat = () => {
  const location = useLocation();
  const { username, room, server } = location.state;
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    // serverに基づいてURLを選択
    // マウント時にSocket.IOを作成し、Socket.IOサーバーに接続する
    const url = server === 'Flask-SocketIO' ? 'http://localhost:5000' : 'http://localhost:8888';
    socket.current = io(url);

    socket.current.emit('join', { username, room });

    // Socket.IOサーバーからのメッセージを受信するようになる
    socket.current.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.current.emit('leave', { username, room });
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

  const leaveRoom = () => {
    if(socket.current) {
      socket.current.emit('leave', { username, room });
      navigate('/');
    }
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
          key={index}
            // ユーザーのメッセージかどうかでクラスを変更する
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

      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
};

export default Chat;

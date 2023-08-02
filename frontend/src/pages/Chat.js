import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (socket.current) {
      socket.current.emit('join', { username, room });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (room.trim() === "") {
      alert("Please join a room to send a message.");
      return;
    }
    if (message !== "" && socket.current) {
      socket.current.emit('message', { room, username, message });
      setMessage('');
    }
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="Room"
        value={room}
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
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

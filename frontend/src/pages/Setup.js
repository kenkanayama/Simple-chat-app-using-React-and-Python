import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Setup = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [server, setServer] = useState('Flask-SocketIO');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      navigate('/chat', { state: { username, room, server } });
    } else {
      alert('username と room を入力してください');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <div>
          <input
            type="radio"
            id="flask-socketio"
            name="server"
            value="Flask-SocketIO"
            checked={server === 'Flask-SocketIO'}
            onChange={(event) => setServer(event.target.value)}
          />
          <label htmlFor="flask-socketio">Flask-SocketIO</label>
          <input
            type="radio"
            id="python-socketio"
            name="server"
            value="Python-SocketIO"
            checked={server === 'Python-SocketIO'}
            onChange={(event) => setServer(event.target.value)}
          />
          <label htmlFor="python-socketio">Python-SocketIO</label>
        </div>
        <button type="submit">Setup</button>
      </form>
    </div>
  );
};

export default Setup;

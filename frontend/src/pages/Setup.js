import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Setup = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      navigate('/chat', { state: { username, room } });
    } else {
      alert('Please fill in both fields.');
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
        <button type="submit">Setup</button>
      </form>
    </div>
  );
};

export default Setup;

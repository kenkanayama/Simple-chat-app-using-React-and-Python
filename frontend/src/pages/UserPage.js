// src/pages/UserPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const UserPage = () => {
  const [message, setMessage] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const { username } = useParams();

  useEffect(() => {
    // usernameのnamespaceで接続
    const socket = io(`http://localhost:5000/user/${username}`);

    // サーバーからのmessageイベントをリッスン
    socket.on('message', (msg) => {
      setMessage(msg.data);  // サーバーから送信されたデータをセット
    });

    // コンポーネントのアンマウント時にsocketを閉じる
    return () => {
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    console.log(recipient, inputMessage, username);
    fetch(`http://localhost:5000/user/${recipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: inputMessage, sender: username })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  // or response.text() if the response is not in JSON format
    })
    .then(data => {
      console.log('Success:', data);  // the response data from the server
      setMessage(data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h1>User: {username}</h1>
      <p>Message from server: {message}</p>
      <input
        type="text"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        placeholder="Enter recipient username"
      />
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default UserPage;

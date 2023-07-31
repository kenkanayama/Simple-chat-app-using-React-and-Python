// src/components/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // socket.ioのインスタンスを作成
    const socket = io('http://localhost:5000');

    // サーバーからのmessageイベントをリッスン
    socket.on('message', (msg) => {
      setMessage(msg);
    });

    // コンポーネントのアンマウント時にsocketを閉じる
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Communication</h1>
      <p>Message from server: {message}</p>
    </div>
  );
};

export default App;
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // バックエンドのアドレスを指定します

const MyComponent = () => {

  useEffect(() => {
    socket.on('response', (data) => {
      console.log('Response from server: ', data);
    });

    return () => {
      socket.off('response');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', 'Hello from client!');  // 'message'というイベント名でメッセージを送信します
  };

  return (
    <button onClick={sendMessage}>
      Send message
    </button>
  );
};

export default MyComponent;

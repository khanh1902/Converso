import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { socket } from '../App';

const Container = tw.div`flex flex-row px-3 gap-3 items-center py-4`;

const SendArea = () => {
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('userId');
  const urlParams = new URLSearchParams(window.location.search);
  const channelId = urlParams.get('channelId');

  const sendMessageToBot = (msg) => {
    if (!msg) return;
    socket.emit('message', { message: msg, address: channelId + '_' + userId });
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') return;

    sendMessageToBot(message);
  };

  return (
    <Container>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        type='text'
        autoFocus
        placeholder='Type your message'
        className='bg-gray-100 p-3 px-4 h-9 grow outline-none rounded-full'
      />
      <div
        onClick={() => sendMessageToBot(message)}
        className='w-[32px] h-[32px] px-3 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-all cursor-pointer'>
        <i className='fa-solid fa-paper-plane text-blue-400'></i>
      </div>
    </Container>
  );
};

export default SendArea;

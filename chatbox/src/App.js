import './App.css';
import Header from './components/Header';
import Body from './components/Body';

import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import SendArea from './components/SendArea';

const userId = localStorage.getItem('userId') || uuidv4();

if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', userId);
}

export const socket = io('https://converso.site', {
  query: {
    userId,
  },
});

function App() {
  let storedMessages = localStorage.getItem('storedMessages');

  try {
    storedMessages = JSON.parse(storedMessages);
  } catch (e) {
    console.log('Cant not get messages from localStorage', e);
  }

  const [messages, setMessages] = useState(storedMessages || []);

  const addMessage = (message, isBot) => {
    setMessages((prev) => {
      const newMessages = [...prev, { message: message, id: uuidv4(), isOther: isBot }];

      localStorage.setItem('storedMessages', JSON.stringify(newMessages));

      return newMessages;
    });
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (data) => {
      addMessage(data.message, true);
    });

    socket.on('received', (data) => {
      addMessage(data.message, false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='App flex flex-col h-screen'>
      <Header />
      <Body messages={messages} />
      <SendArea />
    </div>
  );
}

export default App;

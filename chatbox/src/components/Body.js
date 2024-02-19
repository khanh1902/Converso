import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`grow border border-b-1 flex flex-col p-3 overflow-y-auto gap-3`;
const Message = tw.div`p-3 bg-gray-100 rounded-2xl w-fit`;

const Body = ({ messages }) => {
  useEffect(() => {
    var messagesContainer = document.getElementById('messages-container'); // Updated ID here
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <Container id='messages-container'>
      {messages.map((e, i) => {
        return (
          <div key={e.id} className={e.isOther ? `` : `self-end`}>
            <Message className={e.isOther ? `` : `bg-blue-400 text-white`}>{e.message}</Message>
          </div>
        );
      })}
    </Container>
  );
};

export default Body;

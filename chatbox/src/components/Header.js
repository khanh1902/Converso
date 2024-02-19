import React from 'react';

const Header = () => {
  const toggleChatBox = () => {
    if (window.parent) {
      window.parent.postMessage(
        {
          type: 'TOGGLE_CHAT',
        },
        '*'
      );
    }
  };

  return (
    <div className='p-3 pr-4 w-full flex  justify-between font-semibold flex-row items-center border border-b-1'>
      <span>Converso bot</span>
      <div
        onClick={() => toggleChatBox()}
        className='bg-gray-100 hover:bg-gray-300 transition-all cursor-pointer w-[32px] h-[32px] rounded-full flex items-center justify-center'>
        <i className='fa-solid fa-minus' />
      </div>
    </div>
  );
};

export default Header;

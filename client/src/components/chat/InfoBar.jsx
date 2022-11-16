import React from 'react';
import 'remixicon/fonts/remixicon.css';

/**
 * chat 방 안에서 정보 표시 하는 컴포넌트
 * @param {string} sellerNickname
 * @returns
 */
const InfoBar = ({ sellerNickname, navigate, sellItem, marketItemId }) => {
  const price = sellItem.price;
  return (
    <div className='mb-4 flex flex-col justify-between w-full h-24 bg-white text rounded-t-md'>
      <div className='flex flex-row h-24'>
        <i
          onClick={() => navigate('/chat/list')}
          className='items-center m-auto mx-2 text-2xl leading-none text-center ri-arrow-left-line'
        ></i>
        <div className='flex items-center ml-1 text-2xl font-bold text-slate-900 py-2'>
          {sellerNickname}
        </div>
      </div>

      <div
        className='flex items-center w-full h-40 p-2 border-y-2 cursor-pointer'
        onClick={() => navigate(`/Market/${marketItemId}`)}
      >
        <img
          src={sellItem.path}
          alt='포카이미지'
          className='m-2 h-5 rounded-md'
        />
        <div>
          <p>{sellItem.title}</p>
          <p className='font-semibold'>{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;

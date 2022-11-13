import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const CommunityTop = ({ category, isLogin }) => {
  return (
    <>
      <div className='communityTab relative px-2.5 pb-2.5 border-b'>
        <ul className='flex justify-evenly'>
          <li>
            <NavLink to='/CommunityList'>자유</NavLink>
          </li>
          <li>
            <NavLink to='/CommunityBoast'>자랑</NavLink>
          </li>
        </ul>
        <button
          type='button'
          className='absolute top-0 right-2.5 w-12 py-px bg-black text-white rounded'
        >
          {isLogin ? (
            <Link to='/Community' state={{ category }}>
              작성
            </Link>
          ) : (
            <Link to='/login' state={{ category }}>
              작성
            </Link>
          )}
        </button>
      </div>
    </>
  );
};

export default CommunityTop;

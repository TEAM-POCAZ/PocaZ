import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { apis } from '../../utils/api';

const getIdolList = async (setIdol) => {
  const { data: IdolCateList } = await apis.getArtistGroup();
  setIdol(IdolCateList);
};

const MarketCategory = ({ setGroup }) => {
  const [IdolList, setIdol] = useState([]);

  useEffect(() => {
    getIdolList(setIdol);
  }, []);

  return (
    <>
      <div className='bg-white h-7 mb-1'>
        <ul className='flex items-center justify-around h-full'>
          <li key={0} onClick={() => setGroup(0)}>
            <p className='text-xs cursor-pointer text-slate-600 hover:text-blue-700'>
              전체
            </p>
          </li>
          {IdolList.map((cate) => {
            return (
              <li
                key={cate.id}
                onClick={() => {
                  setGroup(cate.id);
                }}
              >
                <img src={cate.grouplogoUrl} className='rounded-full'></img>
                <p className='text-xs cursor-pointer text-slate-600 hover:text-blue-700'>
                  {cate.koreanName}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default MarketCategory;

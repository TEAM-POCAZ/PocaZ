import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../utils/api';

const MarketListItem = ({ list }) => {
  console.log(
    '🚀 ~ file: MarketListItem.jsx ~ line 7 ~ MarketListItem ~ list',
    list
  );
  const navigate = useNavigate();
  return (
    <>
      <div className='mx-3.5'>
        <ul className='flex flex-row flex-wrap justify-between'>
          {list?.pages?.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.sellList.map((post) => {
                return (
                  <li
                    className='flex-[0_1_48%] mb-3.5 cursor-pointer'
                    key={post.id}
                    onClick={() => {
                      navigate(`/Market/${post.id}`);
                    }}
                  >
                    <div className='pocaThumb relative h-72 lg:h-96 mm:h-60 rounded-xl overflow-hidden'>
                      <img
                        src={`${baseURL}/${post.filePath}`}
                        crossOrigin={'anonymous'}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='pocaListBox mt-2.5 p-3.5 rounded-xl bg-white text-xs box-border'>
                      <p className='groupName font-extrabold text-sm text-[#034ac5]'>
                        {post.groupName}✨
                      </p>
                      <p className='memberName text-sm'>{post.stageName}</p>
                      <p className='pocaDetail mt-2.5 font-medium text-base'>
                        {post.pocaName}
                      </p>
                      <p className='pocaDesc mb-1 text-gray-500'>
                        {post.description}
                      </p>
                      <p className='pocaPrice mt-2.5 font-semibold text-base'>
                        <span>{post.price}</span>
                        <span className='won'>원</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MarketListItem;

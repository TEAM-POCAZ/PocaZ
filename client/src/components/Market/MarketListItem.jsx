import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../utils/api';

const MarketListItem = ({ list }) => {
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
                    className='flex-[0_1_48%] w-[45%] mb-3.5 cursor-pointer'
                    key={post.id}
                  >
                    <button
                      className='w-full'
                      onClick={() => {
                        navigate(`/Market/${post.id}`);
                      }}
                    >
                      <div className='pocaThumb relative h-72 lg:h-96 mm:h-60 rounded-xl overflow-hidden'>
                        <img
                          src={`${baseURL}/${post.filePath}`}
                          crossOrigin={'anonymous'}
                          className='w-full h-full object-cover'
                          alt='포토카드 썸네일'
                        />
                      </div>
                      <div className='pocaListBox mt-2.5 p-3.5 rounded-xl bg-white text-xs box-border text-left'>
                        <p className='groupName font-extrabold text-sm text-[#034ac5]'>
                          {post.groupName}✨
                        </p>
                        <p className='memberName text-sm'>{post.stageName}</p>
                        <p className='pocaDetail w-full mt-1.5 font-medium text-sm text-gray-300 overflow-hidden whitespace-nowrap text-ellipsis'>
                          {post.pocaName}
                        </p>
                        <p className='pocaDetail mt-2.5 font-medium text-lg'>
                          {post.title}
                        </p>
                        {/* <p className='pocaDesc mb-1 text-gray-500'>
                        {post.description}
                      </p> */}
                        <p className='pocaPrice mt-2.5 font-semibold text-base text-right'>
                          <span>{post.price.toLocaleString()}</span>
                          <span className='won'>원</span>
                        </p>
                      </div>
                    </button>
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

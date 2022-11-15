import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../utils/api';

const CommentListItem = ({ list }) => {
  const navigate = useNavigate();
  // console.log(list)
  return (
    <>
      <ul>
        {list?.pages?.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.postList.map((post) => {
              const days = dayjs(post.createAt).format('YYYY-MM-DD');
              return (
                <li
                  key={post.id}
                  className='flex justify-between py-2.5 border-b cursor-pointer'
                  onClick={() => navigate(`/Community/1/${post.id}`)}
                >
                  <div className='boardSubject w-[calc(100% - 100px)]'>
                    <p className='mr-1 mb-2.5 truncate'>{post.title}</p>
                    <div>
                      <div className='writeWrap flex items-center'>
                        <div className='writeProfile w-10 h-10 rounded-full bg-black mr-2.5'></div>
                        <span className='writeName'>{post.nickname}</span>
                      </div>
                      <time className='text-xs'>{days}</time>&nbsp;
                      <span className='comment text-xs'>
                        댓글 {post.replyCnt}
                      </span>
                      &nbsp;
                      <span className='hit text-xs'>조회 {post.viewCount}</span>
                    </div>
                  </div>
                  <div className='boardPhoto w-24 h-24 overflow-hidden'>
                    {post.filePath ? (
                      post.filePath.substring(0, 5) === 'https' ? (
                        <img
                          src={post.filePath}
                          className='w-full min-h-full object-fill border border-gray-100'
                        />
                      ) : (
                        <img
                          src={`${baseURL}/${post.filePath}`}
                          //
                          crossOrigin='anonymous'
                          //문제가 해결되면 crossOrigin 삭제할 예정
                          className='w-full min-h-full object-fill border border-gray-100'
                        />
                      )
                    ) : null}
                  </div>
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};
export default CommentListItem;

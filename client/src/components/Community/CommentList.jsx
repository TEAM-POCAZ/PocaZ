import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../../utils/api';
import CommentListItem from './CommentListItem';
import ReplyList from './ReplyList';

const CommentList = ({ comments, userId, refetch }) => {
  const [isReply, setReply] = useState({});
  const { category, id } = useParams();
  const replyRef = useRef();

  const toggleReply = (pid) => {
    Object.keys(isReply).length !== 0 && Object.keys(isReply)[0] == pid
      ? setReply({})
      : setReply({ [pid]: true });
  };

  const commentSubmit = async (event) => {
    if (!userId) return toast.error('로그인 유저만 댓글을 달 수 있습니다');

    if (replyRef.current.value)
      try {
        await fetch(`${baseURL}/post/reply/${category}/${id}/${userId}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify([
            {
              pid: Object.entries(isReply).filter((value) => value[1])[0][0],
              content: replyRef.current.value,
            },
          ]),
        });
        setReply({});
        refetch();
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <>
            <CommentListItem
              key={comment.id}
              comment={comment}
              toggleReply={toggleReply}
              userId={userId}
              refetch={refetch}
            />
            {isReply[comment.id] ? (
              <>
                <div className='flex py-4'>
                  <input
                    className='border w-full p-2.5'
                    type='text'
                    ref={replyRef}
                  />
                  <button
                    className='min-w-[40px] ml-2.5 text-xs bg-slate-500 text-white'
                    onClick={commentSubmit}
                  >
                    답글
                    <br />
                    작성
                  </button>
                </div>
              </>
            ) : null}
            <div className='preply'>
              <ReplyList comment={comment} userId={userId} refetch={refetch} />
            </div>
          </>
        ))}
    </>
  );
};

export default CommentList;

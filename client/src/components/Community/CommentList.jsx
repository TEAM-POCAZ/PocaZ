import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

import { baseURL } from '../../utils/api';
import CommentListItem from './CommentListItem';
import ReplyList from './ReplyList';

const CommentList = ({ comments, userId }) => {
  const [isReply, setReply] = useState({});
  const { category, id } = useParams();
  const replyRef = useRef();
  const qc = useQueryClient();

  const toggleReply = (pid) => {
    Object.keys(isReply).length !== 0 && Object.keys(isReply)[0] == pid
      ? setReply({})
      : setReply({ [pid]: true });
  };

  const repPost = useMutation(
    (reply) =>
      axios.post(`${baseURL}/post/reply/${category}/${id}/${userId}`, reply),
    {
      onSuccess: () => {
        qc.invalidateQueries(['reply']);
        setReply({});
        toast.success('대댓글이 등록되었습니다.', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      },
    }
  );

  const commentSubmit = async () => {
    if (!userId) return toast.error('로그인 유저만 댓글을 달 수 있습니다');

    if (replyRef.current.value)
      try {
        await repPost.mutateAsync([
          {
            pid: Object.entries(isReply).filter((value) => value[1])[0][0],
            content: replyRef.current.value,
          },
        ]);
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
              <ReplyList comment={comment} userId={userId} />
            </div>
          </>
        ))}
    </>
  );
};

export default CommentList;

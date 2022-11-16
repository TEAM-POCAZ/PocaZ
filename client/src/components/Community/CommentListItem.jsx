import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utils/api';
import { getTimeDiff } from '../../utils/dayday';

const CommentListItem = ({ comment, toggleReply, userId, refetch }) => {
  const [hidden, setHidden] = useState(true);
  const { category, id } = useParams();
  const modifyRef = useRef();

  const modifyToggle = (content) => {
    setHidden(!hidden);
    modifyRef.current.value = content;
  };

  const clickModify = async (cid) => {
    await fetch(`${baseURL}/post/reply/${category}/${id}/${userId}/${cid}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        content: modifyRef.current.value,
      }),
    });
    setHidden(true);
    refetch();
  };

  const clickDelete = () => {
    if (confirm('정말 삭제할까용')) {
      fetch(`${baseURL}/post/reply/${category}/${id}/${userId}/${comment.id}`, {
        method: 'DELETE',
      });
      toast.success('삭제가 완료되었습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setHidden(true);
      window.location.reload();
    }
  };

  return (
    <>
      <div className='mb-2.5 p-2.5 border-b'>
        {!comment.deleteAt ? (
          <>
            <div className='writeWrap flex items-center'>
              <div className='commentThumb w-10 h-10 rounded-full bg-black mr-2.5'></div>
              <span className='writeName'>{comment.nickname}</span>
            </div>
            <div className='commentBox py-2.5'>
              <p>{comment.content}</p>
            </div>
            <div className='flex cursor-pointer'>
              <p className='text-slate-500 text-sm'>
                {getTimeDiff(comment.createAt)} &nbsp;
                {!comment?.pid | (comment.user == userId) ? '·' : ''} &nbsp;
              </p>
              {comment.pid ? null : (
                <button
                  className='mr-2.5 text-slate-500 text-sm'
                  onClick={() => {
                    setHidden(true);
                    toggleReply(comment.id);
                  }}
                >
                  답글달기
                </button>
              )}
              {comment.user == userId ? (
                <>
                  <button
                    className='mr-2.5 text-sm'
                    onClick={() => {
                      toggleReply(0);
                      modifyToggle(comment.content);
                    }}
                  >
                    수정
                  </button>
                  <button className=' text-sm' onClick={clickDelete}>
                    삭제
                  </button>
                </>
              ) : null}
            </div>
          </>
        ) : (
          <div className='commentBox py-2.5'>
            <p>삭제된 댓글입니다.</p>
          </div>
        )}
      </div>
      {
        <div
          className={`${!hidden ? 'flex justify-between py-4' : 'invisible'} `}
          hidden={hidden}
        >
          <input className='border w-full p-2.5' type='text' ref={modifyRef} />
          <button
            className='min-w-[40px] ml-2.5 text-xs bg-slate-500 text-white'
            onClick={() => {
              userId === comment.user
                ? clickModify(comment.id)
                : toast.error('댓글 작성자만 수정할 수 있습니다.', {
                    autoClose: 500,
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
            }}
          >
            댓글
            <br />
            수정
          </button>
        </div>
      }
    </>
  );
};
export default CommentListItem;

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import dayjs from 'dayjs';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../utils/Layout';
import LikeBtn from '../components/Community/LikeBtn';
import CommentList from '../components/Community/CommentList';
import { useLoginStore } from '../store/store';
import { baseURL } from '../utils/api';
// import ModifyInterface from '../components/Community/ModifyInterface';

/**
 * 댓글 상태 관리 콜백 함수
 * @param {string} category
 * @param {string} id
 * @param {React.Dispatch<React.SetStateAction<number>>} setReplyCnt
 * @returns
 */
const getReply = async (category, id, setReplyCnt) => {
  try {
    const response = await axios.get(`${baseURL}/post/reply/${category}/${id}`);
    const [originComments, replyComments] = response.data;
    setReplyCnt(
      originComments.filter(({ deleteAt }) => !deleteAt).length +
        replyComments.filter(({ deleteAt }) => !deleteAt).length
    );
    return originComments.map((preply) => {
      preply.reply = replyComments.filter((rep) => rep.pid == preply.id);
      return preply;
    });
  } catch (e) {
    console.error(e);
  }
};

const CommunityDetail = () => {
  const { category, id } = useParams();
  const { userInfo } = useLoginStore();
  const [DetailContent, setDetailContent] = useState(null);
  const [toggle, setToggle] = useState(false);
  const replyRef = useRef();
  const [replyCnt, setReplyCnt] = useState(0);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [imgs, setImg] = useState([]);

  const {
    data: comments,
    isLoading: replyLoading,
    isError: replyError,
    refetch,
  } = useQuery('reply', () => getReply(category, id, setReplyCnt), {
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const Detail = async () => {
      try {
        let isLiked = 0;
        if (userInfo?.id)
          (async () => {
            const { data: toggleLike } = await axios.get(
              `${baseURL}/post/likes/${id}/${userInfo.id}`
            );
            toggleLike.length > 0 && (setLike(true) || isLiked++);
          })();
        await axios.patch(`${baseURL}/post/view/${category}/${id}`);

        setDetailContent(null);
        const {
          data: [detail],
        } = await axios.get(`${baseURL}/post/${category}/${id}`);
        // console.log(detail);
        setDetailContent({ ...detail, likesCnt: detail.likesCnt - isLiked });
        const { data: postImgs } = await axios.get(
          `${baseURL}/post/img/${category}/${id}`
        );
        setImg(postImgs);
      } catch (e) {
        console.error(e);
      }
    };
    Detail();
  }, []);

  const onReplySubmit = async () => {
    if (userInfo?.id)
      try {
        await axios.post(
          `${baseURL}/post/reply/${category}/${id}/${userInfo.id}`,
          [
            {
              pid: null,
              content: replyRef.current.value,
            },
          ]
        );
        toast.success('댓글이 등록되었습니다.', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        replyRef.current.value = '';
        refetch();
      } catch (err) {
        console.error(err);
      }
  };

  const modifyAction = () => {
    if (DetailContent && DetailContent.userId === userInfo?.id) {
      navigate('/Community', { state: { category, id } });
    } else {
      toast.success('수정 권한이 없습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const deleteAction = async () => {
    if (!userInfo) {
      return toast.error('로그인 이후 삭제할 수 있습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    if (DetailContent.userId != userInfo?.id) {
      return toast.error('게시글 작성자만 삭제할 수 있습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    if (confirm('정말 삭제할까용')) {
      try {
        await axios.delete(`${baseURL}/post/${category}/${id}/${userInfo.id}`);
        toast.success('삭제가 완료되었습니다.', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        navigate('/CommunityList');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onToggleLike = () => {
    if (!userInfo?.id) {
      return toast.error('로그인 이후 좋아요를 누를 수 있습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    if (like) {
      axios.delete(`${baseURL}/post/likes/${id}/${userInfo.id}`);
      setLike(false);
    } else {
      axios.post(`${baseURL}/post/likes/${id}/${userInfo.id}`);
      setLike(true);
    }
  };

  return (
    <>
      <Layout>
        <div className={`communityDetailBoxWrap`}>
          {/* {toggle ? ( css error 해결 후 적용 예정
            <ModifyInterface
              setToggle={setToggle}
              modifyAction={modifyAction}
              deleteAction={deleteAction}
            />
          ) : null} */}
          <div className='communitDetailTop flex justify-between px-2.5 border-b'>
            <button type='button' onClick={() => navigate(-1)}>
              <i className='ri-arrow-left-line'></i>
            </button>
            <h2 className='text-base translate-x-2.5 mb-2'>
              {parseInt(category) === 1 ? '자유' : '자랑'}
            </h2>
            <button
              type='button'
              className={!userInfo?.id ? 'invisible z-5' : 'z-5'}
              onClick={() => setToggle(!toggle)}
            >
              {!userInfo?.id ? (
                <i className='ri-more-line'></i>
              ) : (
                <div>
                  <button onClick={modifyAction}>수정</button>&nbsp;&nbsp;
                  <button onClick={deleteAction}>삭제</button>
                </div>
              )}
            </button>
          </div>
          <div className='communityDetailContents my-2.5'>
            {DetailContent &&
              (() => {
                const days = dayjs(DetailContent.createAt).format('YYYY-MM-DD');

                return (
                  <div key={DetailContent.userId} className='mb-3.5'>
                    <div className='mb-2.5 pb-2.5 px-2.5 border-b'>
                      <h3 className='pb-1 text-lg font-bold'>
                        {DetailContent.title}
                      </h3>
                      <div className='writeWrap flex items-center pb-2.5'>
                        <div className='writeThumb w-10 h-10 rounded-full bg-black mr-2.5'></div>
                        <span className='writeName'>
                          {DetailContent.nickname}
                        </span>
                      </div>
                      <time>{days}</time>&nbsp;·&nbsp;
                      <span>댓글 {replyCnt}</span>&nbsp;·&nbsp;
                      <span className='hit'>
                        조회 {DetailContent.viewCount}
                      </span>
                    </div>
                    <div className='px-2.5 min-h-[300px]'>
                      {imgs.length > 0
                        ? imgs.map((img) => (
                            <img
                              key={`${img.id}_img`}
                              src={`${baseURL}/${img.path}`}
                              className=' w-full h-full object-cover mb-2.5 rounded-xl'
                              alt={img.path}
                              crossOrigin='anonymous'
                            />
                          ))
                        : null}
                      {/* {imgs ? <ImageList imgs={datum.imgs} /> : null} */}
                      <p className='py-2.5 break-all whitespace-pre-line'>
                        {DetailContent.text}
                      </p>
                    </div>
                    <LikeBtn
                      like={like}
                      onClick={onToggleLike}
                      cnt={DetailContent.likesCnt}
                    />
                  </div>
                );
              })()}
            <div className='replyWrap m-2.5 border-t '>
              {replyLoading ? (
                <div>로딩 중...</div>
              ) : replyError ? (
                <div>에러!</div>
              ) : comments ? (
                <CommentList comments={comments} userId={userInfo?.id} />
              ) : null}
              <div className='commentWriteBtn flex mt-4'>
                <textarea className='border w-full p-2.5' ref={replyRef} />
                <button
                  onClick={onReplySubmit}
                  className='min-w-[40px] ml-2.5 text-xs bg-blue-800 text-white'
                >
                  댓글
                  <br />
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityDetail;

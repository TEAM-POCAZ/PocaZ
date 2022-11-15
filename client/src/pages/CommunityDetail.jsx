import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../utils/Layout';
import axios from 'axios';
import LikeBtn from '../components/Community/LikeBtn';
import CommentList from '../components/Community/CommentList';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import { useLoginStore } from '../store/store';
import { useQuery } from 'react-query';
import { baseURL } from '../utils/api';

const getReply = async (category, id, setReplyCnt) => {
  try {
    const response = await axios.get(`${baseURL}/post/reply/${category}/${id}`);
    const [originComments, replyComments] = response.data;
    // console.log(originComments);
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
  // const [comments, setComments] = useState(null);
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
  } = useQuery('reply', () => getReply(category, id, setReplyCnt));

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
    // console.log(userInfo);
    if (userInfo?.id)
      try {
        const { data } = await axios.post(
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
        const del = await axios.delete(
          `${baseURL}/post/${category}/${id}/${userInfo.id}`
        );
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
        <div className='communityDetailBoxWrap'>
          <div className='communitDetailTop flex justify-between px-2.5 border-b'>
            <button type='button' onClick={() => navigate(-1)}>
              <i className='ri-arrow-left-line'></i>
            </button>
            <h2 className='text-base translate-x-2.5'>자유</h2>
            <button type='button'>
              <i className='ri-more-line'></i>
            </button>
            <button onClick={modifyAction}>수정</button>
            <button onClick={deleteAction}>삭제</button>
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
                      <time>{days}</time>&nbsp;
                      <span>댓글 {replyCnt}</span>&nbsp;
                      <span className='hit'>
                        조회 {DetailContent.viewCount}
                      </span>
                    </div>
                    <div className='px-2.5 min-h-[300px]'>
                      {imgs.length > 0
                        ? imgs.map((img) => (
                            <img
                              src={`${baseURL}/${img.path}`}
                              className='relative w-full h-full object-cover mb-2.5 rounded-xl'
                              //
                              crossOrigin='anonymous'
                              //문제가 해결되면 crossOrigin 삭제할 예정\
                            />
                          ))
                        : null}
                      {/* {imgs ? <ImageList imgs={datum.imgs} /> : null} */}
                      <p className='py-2.5 break-all'>{DetailContent.text}</p>
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
                <CommentList
                  comments={comments}
                  userId={userInfo?.id}
                  refetch={refetch}
                />
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

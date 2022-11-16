import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../utils/Layout';
import 'remixicon/fonts/remixicon.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ImageList from '../components/Community/ImageList';
import { baseURL } from '../utils/api';
import ModifyInterface from '../components/Community/ModifyInterface';

const CommunityWrite = () => {
  const navigate = useNavigate();
  const [cate, setCate] = useState(1);
  const [toggle, setToggle] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  // const [imgs, setImg] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [prevImgs, setPrevImgs] = useState([]);
  const [currImgs, setCurrImgs] = useState([]);
  const postInfo = useLocation();

  const getModifyPost = async () => {
    if (postInfo.state.id) {
      const {
        state: { category, id },
      } = postInfo;
      const [
        {
          data: [post],
        },
        { data: postImgs },
      ] = await Promise.all([
        axios.get(`${baseURL}/post/${category}/${id}`),
        axios.get(`${baseURL}/post/img/${category}/${id}`),
      ]);
      titleRef.current.value = post.title;
      contentRef.current.value = post.text;
      setCate(parseInt(category));

      setPrevImgs(postImgs.map((postImg) => ({ ...postImg, isDel: false })));
      // setImg(imges.map((img) => ({ ...img, isDel: false, isRecent: false })));
    }
  };

  const onImgSubmit = async (e) => {
    e.preventDefault();

    if (prevImgs.length + currImgs.length > 2) {
      return toast.error('이미지는 최대 10개까지 올릴 수 있습니다.');
    }

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setImgs((imgs) => [...imgs, uploadFile]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrImgs((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  /**
   * 올린 이미지의 키와 종류를 받아서 삭제 상태로 바꾼다.
   * 기존에 올린 이미지인 경우 삭제 상태로 바꿔주고
   * 현재 화면에서 새로 올린 이미지의 경우 미리보기와 이미지 상태를 지운다.
   * @param {Event} e : event
   * @param {String} action: 기존 이미지인지 새 이미지인지 구분
   */
  const onImgDelete = (e, action) => {
    // if (parseInt(cate) === 2 && prevImgs.length + currImgs.length === 1) {
    //   return toast.error('자랑게시판에는 최소 1개의 사진이 필요해요');
    // }
    const imgKey = e.target.value;
    action === 'prev' &&
      setPrevImgs((prev) =>
        prev.map((img) => (img.file == imgKey ? { ...img, isDel: true } : img))
      );

    if (action === 'curr') {
      setCurrImgs((prev) => prev.filter((_, idx) => idx != imgKey));
      setImgs((prev) => prev.filter((_, idx) => idx != imgKey));
    }
  };

  const submitBtn = async () => {
    if (!titleRef.current.value) {
      return toast.error('제목을 입력해주세요');
    }
    if (!contentRef.current.value) {
      return toast.error('내용을 입력해주세요');
    }
    if (parseInt(cate) === 2 && prevImgs.length + currImgs.length < 1) {
      return toast.error('자랑게시판에는 최소 1개의 사진이 필요해요');
    }

    try {
      let pid;
      if (postInfo?.state?.id) {
        const { category, id } = postInfo.state;
        // 글 제목 및 내용 수정
        await fetch(`${baseURL}/post/${category}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify([
            {
              title: titleRef.current.value,
              content: contentRef.current.value,
            },
          ]),
        });
        // 기존 이미지 중 삭제 상태의 이미지 삭제 요청
        prevImgs.length > 0 &&
          prevImgs.filter((img) => img.isDel).length > 0 &&
          (await fetch(`${baseURL}/post/img/${cate}/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              filesKeys: prevImgs.reduce(
                (result, img) => (img.isDel ? [...result, img.file] : result),
                []
              ),
            }),
          }));
        pid = id;
      } else {
        const [newPostId] = await (
          await fetch(`${baseURL}/post`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify([
              {
                category: cate,
                title: titleRef.current.value,
                content: contentRef.current.value,
              },
            ]),
          })
        ).json();
        pid = newPostId;
      }

      if (imgs.length > 0) {
        const formData = new FormData();
        imgs.forEach((img) => {
          formData.append('img', img);
        });
        const {
          data: [fileId],
        } = await axios({
          method: 'post',
          url: `${baseURL}/file`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8',
          },
        });

        await fetch(`${baseURL}/post/img/${cate}/${pid}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            filesKeys: new Array(imgs.length)
              .fill()
              .map((_, idx) => idx + fileId),
          }),
        });
      }
      postInfo.state.id
        ? toast.success('글이 수정되었습니다')
        : toast.success('게시물이 작성되었습니다.', {
            autoClose: 500,
            position: toast.POSITION.BOTTOM_CENTER,
          });
      navigate(`${cate}/${pid}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    postInfo.state?.id ? getModifyPost() : setCate(postInfo.state.category);
  }, []);
  return (
    <>
      <Layout>
        <div className='communityWriteBoxWrap min-h-[89vh]'>
          {toggle ? (
            <ModifyInterface
              setToggle={setToggle}
              modifyAction={setCate}
              isWrite={true}
            />
          ) : null}
          <div className='communityWriteTop flex justify-between mx-2.5'>
            <button type='button' onClick={() => navigate(-1)}>
              <i className='ri-arrow-left-line'></i>
            </button>
            <button onClick={() => setToggle(!toggle)}>
              <h2 className='text-base translate-x-2.5'>
                {parseInt(cate) === 1
                  ? '자유'
                  : parseInt(cate) === 2
                  ? '자랑'
                  : '등록 위치 선택'}
                <i className='ri-arrow-down-s-fill'></i>
              </h2>
            </button>
            <div hidden={true}>
              {cate}
              {/* <select value={cate} onChange={(e) => setCate(e.target.value)}>
                <option value={1}>자유</option>
                <option value={2}>자랑</option>
              </select> */}
            </div>
            <button
              onClick={submitBtn}
              type='button'
              className='px-2.5 bg-black text-white rounded'
            >
              등록
            </button>
          </div>
          <div className='communityWriteContents mt-3.5'>
            {/* 제목 */}
            <input
              type='text'
              className='w-full py-3 px-2.5 border-t border-b'
              placeholder='제목을 입력해 주세요'
              id='title'
              ref={titleRef}
            />

            {/* {imgs.length > 0 ? (
              <ImageList imgs={imgs} isWrite={true} imgDelete={imgDelete} />
            ) : null} */}
            <div className='dfdfdf'>
              <ul className='m-5'>
                {prevImgs.length > 0
                  ? prevImgs.map((img) =>
                      !img.isDel ? (
                        <li
                          className='relative border-2 border-black rounded-xl'
                          key={img.path}
                        >
                          <img
                            src={`${baseURL}/${img.path}`}
                            alt={img.path}
                            className='relative w-full h-full object-cover mb-2.5 rounded-xl'
                            //
                            crossOrigin='anonymous'
                            //문제가 해결되면 crossOrigin 삭제할 예정\
                          />
                          <button
                            className='absolute top-5 right-5 bg-blue-700 rounded p-2'
                            onClick={(e) => {
                              onImgDelete(e, 'prev');
                            }}
                            value={img.file}
                          >
                            삭제
                          </button>
                        </li>
                      ) : null
                    )
                  : null}
                {currImgs.length > 0
                  ? currImgs.map((currImg, idx) => (
                      <li
                        className='relative border-2 border-black rounded-xl'
                        key={currImg.id}
                      >
                        <img src={currImg} alt='preview' />
                        <button
                          className='absolute top-5 right-5 bg-blue-700 rounded p-2'
                          onClick={(e) => {
                            onImgDelete(e, 'curr');
                          }}
                          value={idx}
                        >
                          삭제
                        </button>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <div className='attachedFileBtn py-3 border-t'>
              <label htmlFor='file'>
                <div className='uploadBtn flex items-center justify-center cursor-pointer'>
                  <i className='ri-camera-fill text-3xl'></i>
                </div>
              </label>
              <input
                type='file'
                name='avatar'
                id='file'
                accept='image/png, image/jpeg'
                className='hidden'
                onChange={onImgSubmit}
              />
            </div>
            <div className='m-2.5 h-screen'>
              {/* 내용 */}
              <textarea
                className='w-full h-full py-2.5'
                id='content'
                ref={contentRef}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityWrite;

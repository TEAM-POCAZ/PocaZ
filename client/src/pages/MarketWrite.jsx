import React from 'react';
import Layout from '../utils/Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MarketWritePocaList from '../components/Market/MarketWritePocaList';
import { toast } from 'react-toastify';
import { useLoginStore } from '../store/store';
import { apis } from '../utils/api';

const MarketWrite = () => {
  const navigate = useNavigate();
  const { userInfo } = useLoginStore();
  const marketInfo = useLocation();
  const [choose, setChoose] = useState({ artists: [], groups: [] });
  const [group, setGroup] = useState(1);
  const [pocas, setPoca] = useState([]); // 멤버 선택 시 불러온 포카 저장
  const [modal, setModal] = useState(false);
  const [pocaMemo, setPocaMemo] = useState({});
  const [artist, setArtist] = useState(1);
  const [imgs, setImgs] = useState([]);
  const [prevImgs, setPrevImgs] = useState([]);
  const [currImgs, setCurrImgs] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const chooseGroup = (e) => {
    const group = e.target.value;
    setGroup(group);
    setArtist(
      choose.artists.filter((artist) => artist.artistGroup == group)[0].id
    );
  };
  const chooseArtist = (e) => setArtist(e.target.value);

  const getPhotocard = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/artist/poca?artist=${artist}`
    );
    setPoca(data);
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

  const onImgDelete = (e, action) => {
    const imgKey = e.target.value;
    if (action === 'prev') {
      setPrevImgs((prev) =>
        prev.map((img) => (img.file == imgKey ? { ...img, isDel: true } : img))
      );
    }
    if (action === 'curr') {
      setCurrImgs((prev) => prev.filter((_, idx) => idx != imgKey));
    }
  };

  const marketSubmit = async () => {
    if (!titleRef.current.value) {
      return toast.error('제목을 입력해주세요');
    }
    if (!descriptionRef.current.value) {
      return toast.error('내용을 입력해주세요');
    }

    let mId;

    if (marketInfo?.state?.MarketId) {
      mId = marketInfo.state.MarketId;
      await fetch(`http://localhost:8080/api/market/${mId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify([
          {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
          },
        ]),
      });
      await fetch(`http://localhost:8080/api/market/img/${mId}`, {
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
      });
    } else {
      const [marketId] = await (
        await fetch('http://localhost:8080/api/market', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify([
            {
              photocard: pocaMemo.id,
              user: userInfo.id,
              title: titleRef.current.value,
              description: descriptionRef.current.value,
              price: priceRef.current.value,
            },
          ]),
        })
      ).json();
      mId = marketId;
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
        url: 'http://localhost:8080/api/file',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8',
        },
      });

      await fetch(`http://localhost:8080/api/market/img/${mId}`, {
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

    toast.success(
      `게시물이 ${marketInfo?.state?.MarketId ? '수정' : '작성'}되었습니다.`,
      {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      }
    );

    navigate(`/Market/${mId}`);
  };
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8080/api/artist'),
      axios.get('http://localhost:8080/api/artist/group'),
    ])
      //async 쓰삼***
      .then(
        axios.spread((response1, response2) => {
          setChoose({
            artists: response1.data,
            groups: response2.data,
          });
        })
      )
      .catch((e) => console.log(e.response.status));

    if (marketInfo?.state?.MarketId) {
      (async () => {
        const m_id = marketInfo?.state?.MarketId;
        const {
          data: [result],
        } = await apis.getMarketDetail(m_id);
        setGroup(result.groupId);
        titleRef.current.value = result.title;
        descriptionRef.current.value = result.sellDesc;
        priceRef.current.value = result.price;
        setArtist(result.artistId);
        setPocaMemo({ id: result.pocaId, name: result.pocaName });

        const { data: marketImgs } = await apis.getMarketImgs(m_id);
        setPrevImgs(
          marketImgs.map((marketImg) => ({ ...marketImg, isDel: false }))
        );
      })();
    }
  }, []);

  useEffect(() => {
    !marketInfo?.state?.MarketId && getPhotocard();
  }, [artist]);

  return (
    <>
      <Layout>
        <div className='marketWriteTop relative flex justify-between px-2.5 pb-2.5 border-b'>
          <button type='button' onClick={() => navigate(-1)}>
            <i className='ri-arrow-left-line'></i>
          </button>
          <h2 className='absolute top-0 left-2/4 translate-x-[-50%] text-lg'>
            팝니다
          </h2>
          <button
            type='button'
            className='px-2.5 bg-black text-white rounded'
            onClick={marketSubmit}
          >
            등록
          </button>
        </div>
        <button onClick={() => console.log(prevImgs)}>ddd</button>
        {currImgs.length > 0
          ? currImgs.map((currImg, idx) => (
              <div className='relative' key={`${idx}th curr`}>
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
              </div>
            ))
          : null}
        {prevImgs.length > 0
          ? prevImgs.map((img) =>
              !img.isDel ? (
                <div className='relative' key={img.file}>
                  <img
                    src={`http://localhost:8080/${img.path}`}
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
                </div>
              ) : null
            )
          : null}
        <div className=''>
          <div className='attachedFileBtn'>
            <label htmlFor='file'>
              <div className='uploadBtn flex items-center justify-center py-3.5 cursor-pointer'>
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
          <div className='subject border-t'>
            <h3 className='py-5 pb-0 px-3.5'>제목</h3>
            <textarea
              ref={titleRef}
              placeholder='글 제목을 입력해 주세요.'
              className='w-full p-3.5 border-0'
            />
          </div>
          <div
            className={`groupName flex py-5 px-3.5 border-t border-b
                        ${marketInfo?.state?.MarketId ? 'text-gray-300' : ''}`}
          >
            <label className='w-6/12'>그룹명</label>
            <select
              className='w-6/12'
              value={group}
              onChange={chooseGroup}
              disabled={marketInfo?.state?.MarketId ? true : false}
            >
              {choose?.groups.length > 0 ? (
                choose?.groups.map((group) => (
                  <option value={group.id}>{group.koreanName}</option>
                ))
              ) : (
                <option>로딩 중...</option>
              )}
            </select>
          </div>
          <div
            className={`memeberName flex py-5 px-3.5 border-b
                        ${marketInfo?.state?.MarketId ? 'text-gray-300' : ''}`}
          >
            <label className='w-6/12'>멤버명</label>
            <select
              className='w-6/12'
              value={artist}
              onChange={chooseArtist}
              disabled={marketInfo?.state?.MarketId ? true : false}
            >
              {choose?.artists.length > 0
                ? choose?.artists
                    .filter((artist) => artist.artistGroup == group)
                    .map((artist) => (
                      <option value={artist.id}>{artist.stageName}</option>
                    ))
                : null}
            </select>
          </div>
          <button
            type='button'
            className={`flex justify-between w-full py-5 px-3.5 border-b text-left
                        ${marketInfo?.state?.MarketId ? 'text-gray-300' : ''}`}
            onClick={() => {
              // console.log(pocaMemo);
              setModal(!modal);
            }}
            disabled={marketInfo?.state?.MarketId ? true : false}
          >
            <p className='w-6/12'>포카 리스트</p>
            {pocaMemo.id ? (
              <span className='relative w-6/12'>
                {pocaMemo.name}
                <i className='ri-arrow-right-s-fill absolute right-0'></i>
              </span>
            ) : null}
          </button>
          {modal ? (
            <MarketWritePocaList
              pocas={pocas}
              setPocaMemo={setPocaMemo}
              setModal={setModal}
            />
          ) : null}
          <div className='desc'>
            <h3 className='py-5 pb-0 px-3.5'>한줄 소개</h3>
            <textarea
              ref={descriptionRef}
              placeholder='포카 상태 및 한줄 소개를 간단히 입력해 주세요.'
              className='w-full p-3.5 border-0'
            />
          </div>
          <div className='price pb-9 px-3.5 border-t'>
            <h3 className='pt-4 pb-3.5'>가격 입력</h3>
            <input
              type='text'
              ref={priceRef}
              placeholder='ex) 19000'
              className='mr-2.5 p-2.5 border'
            />
            <span className='won'>원</span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MarketWrite;

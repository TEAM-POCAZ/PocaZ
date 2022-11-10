import React from 'react';
import Layout from '../utils/Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
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
  // const artistRef = useRef();
  const [artist, setArtist] = useState(1);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const chooseGroup = (e) => setGroup(e.target.value);
  const chooseArtist = (e) => setArtist(e.target.value);

  const getPhotocard = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/artist/poca?artist=${artist}`
    );
    setPoca(data);
  };
  const marketSubmit = async () => {
    // console.log(pocaMemo.id)
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
    toast.success('게시물이 작성되었습니다.', {
      autoClose: 500,
      position: toast.POSITION.BOTTOM_CENTER,
    });
    // console.log(marketId);
    navigate(`/Market/${marketId}`);
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
        const {
          data: [result],
        } = await apis.getMarketDetail(marketInfo?.state?.MarketId);
        setGroup(result.groupId);
        titleRef.current.value = result.title;
        descriptionRef.current.value = result.sellDesc;
        priceRef.current.value = result.price;
        setArtist(result.artistId);
        setPocaMemo({ id: result.pocaId, name: result.pocaName });
      })();
    }
  }, []);

  useEffect(() => {
    getPhotocard();
  }, [artist]);
  //   artistRef?.current?.value && getPhotocard();
  // }, [artistRef?.current?.value]);
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
            />
          </div>
          <div className='subject border-b'>
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
            onClick={() => setModal(!modal)}
            disabled={marketInfo?.state?.MarketId ? true : false}
          >
            포카 리스트 {pocaMemo.id ? <span>{pocaMemo.name}</span> : null}
            <i className='ri-arrow-right-s-fill'></i>
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
          <div className='price pb-5 px-3.5 border-t'>
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

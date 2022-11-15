import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../utils/Layout';
import Input from '../components/MyPage/Input';
import Artist from '../components/MyPage/Artist';
import { useLoginStore } from '../store/store';
import { useQuery } from 'react-query';
import axios from 'axios';
const API = import.meta.env.VITE_HOST_URL;
import Footer from '../components/Footer';

const MyPage = () => {
  const { userInfo, setUserInfo, resetUserInfo } = useLoginStore();
  const [axiosError, setAxiosError] = useState(null);

  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const fileInput = useRef();
  const { isLoading, data, isError, error } = useQuery(
    'me',
    () => {
      return axios.get(`${API}/api/auth/me`, { withCredentials: true });
    },
    {
      retry: false,
      onSuccess: (res) => {
        setUserInfo(res.data);
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          navigate('/login');
        } else {
          console.log('unexpected error: ', err.response.data.error);
        }
      },
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Selected file - ${fileInput.current.files[0]}`);
    if (disabled) {
      setDisabled(false);
    } else {
      const data = {
        id: userInfo.id,
        email: userInfo.email,
        nickname: userInfo.nickname,
        profileImage: userInfo.profileImage,
        artist: userInfo.artist,
      };
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      if (fileInput.current.files[0]) {
        formData.append('photo', fileInput.current.files[0]);
      }
      try {
        const res = await axios.put(`${API}/api/user`, formData, {
          retry: false,
          withCredentials: true,
        });
        setUserInfo(res.data);
        setDisabled(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setAxiosError(err.response.data.error);
        } else {
          console.log('unexpected error: ', err.response.data.error);
        }
      }
    }
  };

  const logout = async () => {
    await axios.get(`${API}/api/auth/logout`, { withCredentials: true });
    setUserInfo({});
    navigate('/');
  };

  const withdrawal = async () => {
    await axios.post(`${API}/api/auth/withdrawal`, null, {
      withCredentials: true,
    });
    setUserInfo({});
    navigate('/');
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Layout>
        <div>{axiosError}</div>
        <div className='flex flex-col justify-center'>
          <img
            className='mx-auto'
            crossOrigin='anonymous'
            src={userInfo.profileImage}
          ></img>
        </div>
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <Input
            property='id'
            optionalText='개발용'
            placeholder='database primary key'
            value={userInfo.id}
            setValue={(id) => {
              setUserInfo({ ...userInfo, id });
            }}
            disabled={true}
          />
          <Input
            property='username'
            optionalText='개발용'
            placeholder='username by OAuth'
            value={userInfo.username}
            setValue={(username) => {
              setUserInfo({ ...userInfo, username });
            }}
            disabled={true}
          />
          <Input
            property='email'
            optionalText='이메일을 수정한다면 인증 절차 필요'
            placeholder='example@example.com'
            value={userInfo.email}
            setValue={(email) => {
              setUserInfo({ ...userInfo, email });
            }}
            disabled={disabled}
          />
          <Input
            property='nickname'
            placeholder='예쁜 닉네임'
            value={userInfo.nickname}
            setValue={(nickname) => {
              setUserInfo({ ...userInfo, nickname });
            }}
            disabled={disabled}
          />
          <Input
            property='profileImage'
            optionalText='경로에서 사진 뿌리기로 변경 필요'
            placeholder='프로필 이미지 경로'
            value={userInfo.profileImage}
            setValue={(profileImage) => {
              setUserInfo({ ...userInfo, profileImage });
            }}
            disabled={disabled}
          />
          <label>
            프로필 파일 업로드하기
            <input
              type='file'
              accept='image/*'
              name='photo'
              ref={fileInput}
              disabled={disabled}
            />
          </label>
          <Input
            property='artist'
            placeholder='최애 아이돌id'
            value={userInfo.artist ?? ''}
            setValue={(artistId) => {
              setUserInfo({ ...userInfo, artist: artistId });
            }}
            disabled={disabled}
          />
          <Artist artistId={userInfo.artist}></Artist>
          <Input
            property='deleteAt'
            optionalText='개발용'
            placeholder='삭제되지 않음'
            value={userInfo.deleteAt ?? ''}
            setValue={(deleteAt) => {
              setUserInfo({ ...userInfo, deleteAt });
            }}
            disabled={true}
          />
          <Input
            property='createAt'
            optionalText='개발용'
            value={userInfo.createAt}
            setValue={(createAt) => {
              setUserInfo({ ...userInfo, createAt });
            }}
            disabled={true}
          />
          <Input
            property='updateAt'
            optionalText='개발용'
            placeholder='업데이트되지 않음'
            value={userInfo.updateAt}
            setValue={(updateAt) => {
              setUserInfo({ ...userInfo, updateAt });
            }}
            disabled={true}
          />
          <input
            type='submit'
            value={disabled ? '개인정보 수정하기' : '수정 완료'}
            className='submit mt-5'
          />
        </form>
        <div className='right'>
          <Link to={'/MyIdol'}>최애 아이돌 변경하기</Link>
          <br></br>
          <Link to={'/MyPage/UserPosts'}>내가 작성한 게시글 보기</Link>
          <br></br>
          <button className='submit mt-5' onClick={logout}>
            로그아웃하기
          </button>
          <br></br>
          <button className='submit' onClick={withdrawal}>
            탈퇴하기
          </button>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default MyPage;

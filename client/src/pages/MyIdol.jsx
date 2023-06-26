import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../utils/Layout';
import Input from '../components/MyPage/Input';
import Artist from '../components/MyPage/Artist';
import Artists from '../components/MyPage/Artists';
import { useLoginStore } from '../store/store';
import { useQuery } from 'react-query';
import axios from 'axios';
const API = import.meta.env.VITE_HOST_URL;

const MyIdol = () => {
  const { userInfo, setUserInfo } = useLoginStore();
  const [axiosError, setAxiosError] = useState(null);
  const [artistId, setArtistId] = useState(userInfo.artist);
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
    const data = {
      id: userInfo.id,
      email: userInfo.email,
      nickname: userInfo.nickname,
      profileImage: userInfo.profileImage,
      artist: artistId,
    };
    console.log('요청:', data);
    try {
      const res = await axios.put(`${API}/api/user`, data, {
        retry: false,
        withCredentials: true,
      });
      console.log('응답:', res.data);
      setUserInfo(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAxiosError(err.response.data.error);
      } else {
        console.log('unexpected error: ', err.response.data.error);
      }
    }
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
        <div className='flex flex-col justify-center'></div>
        <form onSubmit={handleSubmit}>
          <Input
            property='artist'
            placeholder='최애 아이돌id'
            value={artistId ?? ''}
            setValue={setArtistId}
            disabled={false}
          />
          <Artist artistId={artistId}></Artist>
          <Artists setArtistId={setArtistId}></Artists>
          <input
            type='submit'
            value='최애 아이돌 수정하기'
            className='submit mt-5'
          />
        </form>
      </Layout>
    </>
  );
};

export default MyIdol;

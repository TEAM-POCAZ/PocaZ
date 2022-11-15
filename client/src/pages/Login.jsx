import React from 'react';
import { useNavigate } from 'react-router-dom';
import Google from '../assets/img/google.png';
import Apple from '../assets/img/apple.png';
import Twitter from '../assets/img/twitter.png';
import Layout from '../utils/Layout';

const Login = () => {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_HOST_URL;

  const google = () => {
    window.open(`${API}/api/auth/google`, '_self');
  };
  const twitter = () => {
    window.open(`${API}/api/auth/twitter`, '_self');
  };
  const apple = () => {
    window.open(`${API}/api/auth/apple`, '_self');
  };

  return (
    <>
      <Layout>
        <div className='login m-2.5'>
          <div className='flex items-center justify-center flex-col h-[82vh]'>
            <h2 className='loginTitle text-[24px] font-semibold'>
              포카즈 로그인
            </h2>
            <h3 className='mb-10'>이제 포카즈와 함께 해 주실 거죠?</h3>
            <div
              className='loginButton google flex items-center w-6/12 mb-2.5 p-2.5 border rounded cursor-pointer'
              onClick={google}
            >
              <img
                src={Google}
                alt=''
                className='icon w-[20px] h-full mr-1.5'
              ></img>
              구글로 로그인
            </div>
            <div
              className='loginButton apple flex items-center w-6/12 mb-2.5 p-2.5 border rounded cursor-pointer'
              onClick={apple}
            >
              <img
                src={Apple}
                alt=''
                className='icon w-[20px] h-full mr-1.5'
              ></img>
              애플로 로그인
            </div>
            <div
              className='loginButton twitter flex items-center w-6/12 p-2.5 border rounded cursor-pointer'
              onClick={twitter}
            >
              <img
                src={Twitter}
                alt=''
                className='icon w-[20px] h-full mr-1.5'
              ></img>
              트위터로 로그인
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;

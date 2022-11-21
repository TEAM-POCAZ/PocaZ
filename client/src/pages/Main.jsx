import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Layout from '../utils/Layout';
import mainSlideBn1 from '../assets/img/main_slide_bn1.png';
import mainSlideBn2 from '../assets/img/main_slide_bn2.jpeg';
import mainSlideBn3 from '../assets/img/main_slide_bn3.jpeg';
import axios from 'axios';
import dayjs from 'dayjs';
import MainPocaItem from '../components/MainPocaItem';
import Footer from '../components/Footer';
import MainPocaRecentItem from '../components/MainRecentPocaItem';
import { baseURL } from '../utils/api';

const Main = () => {
  const [users, setUsers] = useState(null);
  const [users2, setUsers2] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .all([axios.get(`${baseURL}/post/1`), axios.get(`${baseURL}/post/2`)])
      .then(
        axios.spread((response1, response2) => {
          setUsers(response1.data.postList);
          setUsers2(response2.data.postList);
        })
      )
      .catch((e) => console.log(e.response.status));
  }, []);

  return (
    <>
      <Layout>
        <div className='mainContentsWrap'>
          <div className='mainSlide'>
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              navigation
              pagination={{ clickable: true, type: 'fraction' }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              className='h-72'
            >
              <SwiperSlide className='relative'>
                <img
                  className='w-full h-full object-cover'
                  src={mainSlideBn1}
                  alt='메인 배너 01'
                />
                <div className='slideTxt absolute top-[60%] left-0 ml-3.5 text-white font-bold text-[24px] tracking-tighter'>
                  <h3>포~카즈! 런칭 기념</h3>
                  <h4>더보이즈 포카 구경하러 가기 🥰</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide className='relative'>
                <img
                  className='w-full h-full object-cover'
                  src={mainSlideBn2}
                  alt='메인 배너 02'
                />
                <div className='slideTxt absolute top-[60%] left-0 ml-3.5 text-white font-bold text-[24px] tracking-tighter'>
                  <h3>르세라핌 컴백</h3>
                  <h4>랜덤 포토카드 5종 출시❗️</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide className='relative'>
                <img
                  className='w-full h-full object-cover'
                  src={mainSlideBn3}
                  alt='메인 배너 03'
                />
                <div className='slideTxt absolute top-[60%] left-0 ml-3.5 text-white font-bold text-[24px] tracking-tighter'>
                  <h3>MZ 세대들의 중심</h3>
                  <h4>뉴진스 본격 분석 💙</h4>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className='px-3.5 mt-7 bg-white'>
            <div className='boardWrap mb-6'>
              <h2 className='flex mb-3.5 text-2xl font-extrabold'>
                최근 게시물<i className='ri-arrow-drop-right-line'></i>
              </h2>
              <div className='boardList'>
                <ul>
                  {users &&
                    users.map((user) => {
                      const days = dayjs(user.createAt).format('YYYY-MM-DD');
                      return (
                        <li key={user.id}>
                          <button
                            onClick={() => navigate(`/Community/1/${user.id}`)}
                            className='flex justify-between w-full mb-1.5 cursor-pointer'
                          >
                            <h4 className='mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden'>
                              {user.title}
                            </h4>
                            <time className='timeWrap text-sm font-normal'>
                              {days}
                            </time>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className='bestPoca mb-6'>
              <div className='subject mb-3.5'>
                <h3 className='text-2xl font-extrabold'>BEST 포카</h3>
                <h4 className='text-gray-500 text-sm'>
                  내가 사는 포카〰️ 너를 위해 구매했지! 🍪
                </h4>
              </div>
              <MainPocaItem />
            </div>
            <div className='newPoca mb-6'>
              <div className='subject mb-3.5'>
                <h3 className='text-2xl font-extrabold'>최근 올라온 포카</h3>
                <h4 className='text-gray-500 text-sm'>
                  어제 컴백한 내 가수가 이 세계 포카?! ✨
                </h4>
              </div>
              <MainPocaRecentItem />
            </div>
            <div className='boardBoast mb-6'>
              <div className='subject mb-3.5'>
                <h3 className='text-2xl font-extrabold'>포꾸 자랑</h3>
                <h4 className='text-gray-500 text-sm'>
                  하늘 아래 똑같은 포카는 없다 🤩
                </h4>
              </div>
              <div className='boastGallery'>
                <ul className='grid grid-cols-3 grid-rows-3'>
                  {users2 &&
                    users2.map((user) => (
                      <li key={user.id} className='h-36'>
                        <button
                          onClick={() => navigate(`/Community/2/${user.id}`)}
                          className='w-full h-full cursor-pointer'
                        >
                          <img
                            src={`${baseURL}/${user.filePath}`}
                            className='w-full h-full object-cover'
                            crossOrigin='anonymous'
                            alt='포꾸 자랑 업로드 이미지'
                          />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Main;

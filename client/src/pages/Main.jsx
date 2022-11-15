import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Layout from '../utils/Layout';
import mainSlideBn1 from '../assets/img/main_slide_bn1.jpeg';
import mainSlideBn2 from '../assets/img/main_slide_bn2.jpeg';
import mainSlideBn3 from '../assets/img/main_slide_bn3.gif';
import axios from 'axios';
import dayjs from 'dayjs';
import MainPocaItem from '../components/MainPocaItem';
import Footer from '../components/Footer';
import MainPocaRecentItem from '../components/MainRecentPocaItem';

const Main = () => {
  const [users, setUsers] = useState(null);
  const [users2, setUsers2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { category } = useParams();
  const postInfo = useLocation();

  useEffect(() => {
    axios
      .all([
        axios.get('http://localhost:8080/api/post/1'),
        axios.get('http://localhost:8080/api/post/2'),
      ])
      //async 쓰삼***
      .then(
        axios.spread((response1, response2) => {
          setUsers(response1.data.postList);
          setUsers2(response2.data.postList);
        })
      )
      .catch((e) => console.log(e.response.status));
  }, []);

  // if (loading) return <div>로딩중...</div>
  // if (error) return <div>에러가 발생했슈</div>
  // if (!users) return null
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
              className='h-96'
            >
              <SwiperSlide>
                <img
                  className='w-full h-full object-cover'
                  src={mainSlideBn1}
                  alt={mainSlideBn1}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className='w-full h-full object-cover'
                  src={mainSlideBn2}
                  alt={mainSlideBn2}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className='w-full h-full object-cover'
                  src={mainSlideBn3}
                  alt={mainSlideBn3}
                />
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
                        <li
                          key={user.id}
                          onClick={() => navigate(`/Community/1/${user.id}`)}
                          className='flex justify-between mb-3.5 cursor-pointer'
                        >
                          <h4 className='mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden'>
                            {user.title}
                          </h4>
                          <time className='timeWrap text-sm font-normal'>
                            {days}
                          </time>
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
                  내 콜렉트북 한 자리를 차지할 HOT한 포카 😘
                </h4>
              </div>
              <MainPocaItem />
            </div>
            <div className='newPoca mb-6'>
              <div className='subject mb-3.5'>
                <h3 className='text-2xl font-extrabold'>최근 올라온 포카</h3>
                <h4 className='text-gray-500 text-sm'>
                  내 콜렉트북 한 자리를 차지할 HOT한 포카 😘
                </h4>
              </div>
              <MainPocaItem />
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
                      <li
                        key={user.id}
                        onClick={() => navigate(`/Community/2/${user.id}`)}
                        className='h-36 cursor-pointer'
                      >
                        <img
                          src={'http://localhost:8080/' + user.filePath}
                          className='w-full h-full object-cover'
                          crossOrigin='anonymous'
                        />
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

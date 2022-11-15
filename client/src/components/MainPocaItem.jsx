import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { useQuery } from 'react-query';
import { baseURL } from '../utils/api';
import { IsLoading } from '../utils/IsLoading';
import { useNavigate } from 'react-router-dom';

const MainPocaItem = () => {
  const navigate = useNavigate();
  const result = useQuery('poca', () =>
    axios.get(`${baseURL}/market/`).then((a) => {
      return a.data.sellList;
    })
  );

  // const price = Number(pocas.price);

  return (
    <>
      <Swiper slidesPerView={2.4} spaceBetween={14} className=''>
        {result.isLoading ? (
          <IsLoading />
        ) : result.error ? (
          'error'
        ) : result.data ? (
          result.data.map((pocas) => {
            console.log(typeof pocas.price);
            return (
              <SwiperSlide key={pocas.id}>
                <div
                  onClick={() => navigate(`/Market/${pocas.id}`)}
                  className='cursor-pointer'
                >
                  <div className='pocaThumb relative h-72 lg:h-96 mm:h-60 rounded-xl overflow-hidden'>
                    <img
                      src={pocas.pocaImg}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='pocaListWrap mt-1 text-xs'>
                    <p className='groupName font-extrabold'>
                      {pocas.groupName}
                    </p>
                    <p className='memberName text-sm'>{pocas.stageName}</p>
                    {/* <p className='pocaDetail text-base'>{pocas.pocaName}</p> */}
                    <p className='pocaDesc mb-1 text-gray-500'>
                      {pocas.pocaName}
                    </p>
                    <p className='pocaPrice font-medium text-base'>
                      <span className='mr-1.5 text-gray-500'>평균 거래가</span>
                      <span>{pocas.price.toLocaleString()}</span>
                      <span className='won'>원</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : null}
      </Swiper>
    </>
  );
};

export default MainPocaItem;

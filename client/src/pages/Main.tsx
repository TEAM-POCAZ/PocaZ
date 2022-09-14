import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import ador from 'pages/img/ador.jpeg'
import Layout from './Layout'

const Main = () => {
  return (
    <>
      <div className="mainSlide">
        <Swiper onSwiper={(swiper) => console.log(swiper)}>
          <SwiperSlide>
            <img src={ador} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ador} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default Main

import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const Main = () => {
    return(
        <div className="mobileWrap mm:static mm:block mm:w-full absolute top-0 right-0 w-[480px] mr-10 bg-white">
            <div className="logo p-3.5">
                <h1 className="italic text-3xl font-extrabold"><a href="#">POCAZ.</a></h1>
            </div>
            <div className='mainSlide'>
                <Swiper
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>메인사진 들어와유</SwiperSlide>
                    <SwiperSlide>메인사진 들</SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Main;
import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import ador from 'assets/img/ador.jpeg'
import Layout from 'utils/Layout'

const Main = () => {
  return (
    <>
      <Layout>
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
        <div className="boardWrap">
          <h2>최근 게시물</h2>
          <div className="boardList">
            <ul>
              <li>
                <h4>포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.</h4>
                <time>2022.08.29</time>
              </li>
              <li>
                <h4>
                  포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.포카에 대한
                  게시물을 올려 주세요.
                </h4>
                <time>2022.08.29</time>
              </li>
              <li>
                <h4>포카에 대한 게시물을 올려 주세요.</h4>
                <time>2022.08.29</time>
              </li>
              <li>
                <h4>
                  포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.포카에 대한
                  게시물을 올려 주세요.
                </h4>
                <time>2022.08.29</time>
              </li>
              <li>
                <h4>포카에 대한 게시물을 올려 주세요.</h4>
                <time>2022.08.29</time>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Main

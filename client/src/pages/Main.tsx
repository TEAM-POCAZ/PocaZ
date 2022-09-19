import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Layout from 'utils/Layout'
import mainSlideBn1 from 'assets/img/main_slide_bn1.jpeg'
import mainSlideBn2 from 'assets/img/main_slide_bn2.jpeg'

const Main = () => {
  return (
    <>
      <Layout>
        <div className="mainSlide">
          <Swiper className="h-96">
            <SwiperSlide>
              <img className="w-full h-full object-cover" src={mainSlideBn1} alt={mainSlideBn1} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full h-full object-cover" src={mainSlideBn2} alt={mainSlideBn2} />
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

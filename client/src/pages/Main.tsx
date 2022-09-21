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

          <div className="mainContentsWrap px-3.5 bg-white">
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
            <div className="bestPoca">
              <div className="subject">
                <h3>BEST 포카</h3>
                <h4>내 콜렉트북 한 자리를 차지할 HOT한 포카 😘</h4>
              </div>
              <Swiper slidesPerView={2.4} spaceBetween={14} className="">
                <SwiperSlide className="">
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn1}
                    alt={mainSlideBn1}
                  />
                  <div className="">
                    <p className="group-name">NewJeans</p>
                    <p className="member-name">민지</p>
                    <p className="poca-detail">뉴진스 공방 포카</p>
                    <p className="poca-desc">민지 얼굴 도라방스 😢</p>
                    <p className="poca-price">
                      <span>25,000</span>원
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="newPoca">
              <div className="subject">
                <h3>최근 올라온 포카</h3>
                <h4>내 콜렉트북 한 자리를 차지할 HOT한 포카 😘</h4>
              </div>
              <Swiper slidesPerView={2.4} spaceBetween={14} className="">
                <SwiperSlide className="">
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn1}
                    alt={mainSlideBn1}
                  />
                  <div className="">
                    <p className="group-name">NewJeans</p>
                    <p className="member-name">민지</p>
                    <p className="poca-detail">뉴진스 공방 포카</p>
                    <p className="poca-desc">민지 얼굴 도라방스 😢</p>
                    <p className="poca-price">
                      <span>25,000</span>원
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn2}
                    alt={mainSlideBn2}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="boardBoast">
              <div className="subject">
                <h3>포꾸 자랑</h3>
                <h4>하늘 아래 똑같은 포카는 없다 🤩</h4>
              </div>
              <div className="boastGallery">
                <ul>
                  <li>
                    <img
                      className="w-full h-full object-cover"
                      src={mainSlideBn1}
                      alt={mainSlideBn1}
                    />
                  </li>
                  <li>
                    <img
                      className="w-full h-full object-cover"
                      src={mainSlideBn1}
                      alt={mainSlideBn1}
                    />
                  </li>
                  <li>
                    <img
                      className="w-full h-full object-cover"
                      src={mainSlideBn1}
                      alt={mainSlideBn1}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Main

import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import Layout from 'utils/Layout'
import mainSlideBn1 from 'assets/img/main_slide_bn1.jpeg'
import mainSlideBn2 from 'assets/img/main_slide_bn2.jpeg'
import mainSlideBn3 from 'assets/img/main_slide_bn3.gif'
import axios from 'axios'

const Main = () => {
  return (
    <>
      <Layout>
        <div className="mainContentsWrap">
          <div className="mainSlide">
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              navigation
              pagination={{ clickable: true, type: 'fraction' }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              className="h-96"
            >
              <SwiperSlide>
                <img className="w-full h-full object-cover" src={mainSlideBn1} alt={mainSlideBn1} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-cover" src={mainSlideBn2} alt={mainSlideBn2} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-cover" src={mainSlideBn3} alt={mainSlideBn3} />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="px-3.5 mt-7 bg-white">
            <div className="boardWrap mb-6">
              <h2 className="flex mb-3.5 text-2xl font-extrabold">
                최근 게시물<i className="ri-arrow-drop-right-line"></i>
              </h2>
              <div className="boardList">
                {/* 더미데이터 테스트 */}
                <button
                  onClick={() => {
                    axios
                      .get('http://localhost:8000/post/1')
                      .then((data) => {
                        console.log(data.data)
                      })
                      .catch((e) => {
                        console.log(e)
                      })
                  }}
                >
                  더미데이터 테스트입니다롱
                </button>
                <ul>
                  <li className="flex justify-between mb-3.5">
                    <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                      포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.
                    </h4>
                    <time className="text-sm font-normal">2022.08.29</time>
                  </li>
                  <li className="flex justify-between mb-3.5">
                    <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                      포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.
                    </h4>
                    <time className="text-sm font-normal">2022.08.29</time>
                  </li>
                  <li className="flex justify-between mb-3.5">
                    <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                      포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.
                    </h4>
                    <time className="text-sm font-normal">2022.08.29</time>
                  </li>
                  <li className="flex justify-between mb-3.5">
                    <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                      포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.
                    </h4>
                    <time className="text-sm font-normal">2022.08.29</time>
                  </li>
                  <li className="flex justify-between mb-3.5">
                    <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                      포카에 대한 게시물을 올려 주세요.포카에 대한 게시물을 올려 주세요.
                    </h4>
                    <time className="text-sm font-normal">2022.08.29</time>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bestPoca mb-6">
              <div className="subject mb-3.5">
                <h3 className="text-2xl font-extrabold">BEST 포카</h3>
                <h4 className="text-gray-500 text-sm">
                  내 콜렉트북 한 자리를 차지할 HOT한 포카 😘
                </h4>
              </div>
              <Swiper slidesPerView={2.4} spaceBetween={14} className="">
                <SwiperSlide className="">
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn1}
                    alt={mainSlideBn1}
                  />
                  <div className="pocaListWrap mt-1 text-xs">
                    <p className="groupName font-extrabold">THEBOYZ</p>
                    <p className="memberName text-sm">현재</p>
                    <p className="pocaDetail text-base">블룸블룸 공방 포카</p>
                    <p className="pocaDesc mb-1 text-gray-500">현재 얼굴이 다 했어요</p>
                    <p className="pocaPrice font-medium text-base">
                      <span>25,000</span>
                      <span className="won">원</span>
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
            <div className="newPoca mb-6">
              <div className="subject mb-3.5">
                <h3 className="text-2xl font-extrabold">최근 올라온 포카</h3>
                <h4 className="text-gray-500 text-sm">
                  내 콜렉트북 한 자리를 차지할 HOT한 포카 😘
                </h4>
              </div>
              <Swiper slidesPerView={2.4} spaceBetween={14} className="">
                <SwiperSlide className="">
                  <img
                    className="w-full h-full object-cover"
                    src={mainSlideBn1}
                    alt={mainSlideBn1}
                  />
                  <div className="pocaListWrap mt-1 text-xs">
                    <p className="groupName font-extrabold">THEBOYZ</p>
                    <p className="memberName text-sm">현재</p>
                    <p className="pocaDetail text-base">블룸블룸 공방 포카</p>
                    <p className="pocaDesc mb-1 text-gray-500">현재 얼굴이 다 했어요</p>
                    <p className="pocaPrice font-medium text-base">
                      <span>25,000</span>
                      <span className="won">원</span>
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
            <div className="boardBoast mb-6">
              <div className="subject mb-3.5">
                <h3 className="text-2xl font-extrabold">포꾸 자랑</h3>
                <h4 className="text-gray-500 text-sm">하늘 아래 똑같은 포카는 없다 🤩</h4>
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

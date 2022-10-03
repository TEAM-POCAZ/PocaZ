import React, { useState, useEffect } from 'react'
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
  const [users, setUsers] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null>(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(null)
        setError(null)
        // 두가지값을 초기화 해주는 거임
        setLoading(true) //로딩이 시작됐다는 것을 의미
        const response = await axios.get('http://localhost:8000/post/1')
        setUsers(response.data)
      } catch (e: any) {
        console.log(e.response.status) //http 응답상태 코드
        setError(e)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])
  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했슈</div>
  if (!users) return null
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
            <div className="boardWrap mb-6">
              <h2 className="flex mb-3.5 text-2xl font-extrabold">
                최근 게시물<i className="ri-arrow-drop-right-line"></i>
              </h2>
              <div className="boardList">
                {/* 더미데이터 테스트 */}
                <ul>
                  {users.map((user: any) => (
                    <li key={user.id} className="flex justify-between mb-3.5">
                      <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {user.content}
                      </h4>
                      <time className="text-sm font-normal">{user.createAt}</time>
                    </li>
                  ))}
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
                <ul className="grid gap-4 grid-cols-3 grid-rows-3">
                  {users.map((user: any) => (
                    <li key={user.id}>
                      <img src={user.filePath} className="w-full h-full object-cover" />
                    </li>
                  ))}
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

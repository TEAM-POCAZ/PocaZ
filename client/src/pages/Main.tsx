import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
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
import dayjs from 'dayjs'

import useStore from 'store/store'

const Main = () => {
  const [users, setUsers] = useState<any[] | null>(null)
  const [users2, setUsers2] = useState<any[] | null>(null)
  const [photocards, setPhotocards] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null>(null)
  const navigate = useNavigate()
  const { category } = useParams()
  const postInfo = useLocation()

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       setUsers(null)
  //       setError(null)
  //       // 두가지값을 초기화 해주는 거임
  //       setLoading(true) //로딩이 시작됐다는 것을 의미
  //       const response = await axios.get('http://localhost:8000/post/1')
  //       setUsers(response.data)
  //     } catch (e: any) {
  //       console.log(e.response.status) //http 응답상태 코드
  //       setError(e)
  //     }
  //     setLoading(false)
  //   }
  //   fetchUsers()
  // }, [])

  useEffect(() => {
    axios
      .all([
        axios.get('https://pocaz.ystoy.shop/api/post/1'),
        axios.get('https://pocaz.ystoy.shop/api/post/2'),
        axios.get('https://pocaz.ystoy.shop/api/market/'),
      ])
      //async 쓰삼***
      .then(
        axios.spread((response1: any, response2: any, response3: any) => {
          setUsers(response1.data)
          setUsers2(response2.data)
          setPhotocards(response3.data)
        }),
      )
      .catch((e: any) => console.log(e.response.status))
  }, [])

  // if (loading) return <div>로딩중...</div>
  // if (error) return <div>에러가 발생했슈</div>
  // if (!users) return null
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
                <img className="object-cover w-full h-full" src={mainSlideBn1} alt={mainSlideBn1} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="object-cover w-full h-full" src={mainSlideBn2} alt={mainSlideBn2} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="object-cover w-full h-full" src={mainSlideBn3} alt={mainSlideBn3} />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="px-3.5 mt-7 bg-white">
            {/* <button
              onClick={() => {
                axios
                  .get('http://localhost:8000/api/market/')
                  .then((data) => {
                    console.log(data.data)
                  })
                  .catch((e) => {
                    console.log(e)
                  })
              }}
            >
              더미데이터 테스트입니다롱
            </button> */}
            <div className="mb-6 boardWrap">
              <h2 className="flex mb-3.5 text-2xl font-extrabold">
                최근 게시물<i className="ri-arrow-drop-right-line"></i>
              </h2>
              <div className="boardList">
                <ul>
                  {users &&
                    users.map((user: any) => {
                      const days = dayjs(user.createAt).format('YYYY-MM-DD')
                      return (
                        <li
                          key={user.id}
                          onClick={() => navigate(`/Community/1/${user.id}`)}
                          className="flex justify-between mb-3.5 cursor-pointer"
                        >
                          <h4 className="mr-3.5 text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                            {user.title}
                          </h4>
                          <time className="text-sm font-normal timeWrap">{days}</time>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
            <div className="mb-6 bestPoca">
              <div className="subject mb-3.5">
                <h3 className="text-2xl font-extrabold">BEST 포카</h3>
                <h4 className="text-sm text-gray-500">
                  내 콜렉트북 한 자리를 차지할 HOT한 포카 😘
                </h4>
              </div>
              <Swiper slidesPerView={2.4} spaceBetween={14} className="">
                {photocards &&
                  photocards.map((photocard: any) => (
                    <SwiperSlide key={photocard.id}>
                      <div className="relative pocaThumb h-72 lg:h-96 mm:h-60">
                        <img src={photocard.pocaImg} className="object-cover w-full h-full" />
                      </div>
                      <div className="mt-1 text-xs pocaListWrap">
                        <p className="font-extrabold groupName">{photocard.groupName}</p>
                        <p className="text-sm memberName">{photocard.stageName}</p>
                        <p className="text-base pocaDetail">{photocard.pocaName}</p>
                        <p className="mb-1 text-gray-500 pocaDesc">{photocard.description}</p>
                        <p className="text-base font-medium pocaPrice">
                          <span>{photocard.price}</span>
                          <span className="won">원</span>
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="mb-6 newPoca">
              <div className="subject mb-3.5">
                <h3 className="text-2xl font-extrabold">최근 올라온 포카</h3>
                <h4 className="text-sm text-gray-500">
                  내 콜렉트북 한 자리를 차지할 HOT한 포카 😘
                </h4>
              </div>
              <Swiper slidesPerView={2.4} spaceBetween={14} className="">
                {photocards &&
                  photocards.map((photocard: any) => (
                    <SwiperSlide key={photocard.id}>
                      <div className="relative pocaThumb h-72 lg:h-96 mm:h-60">
                        <img src={photocard.pocaImg} className="object-cover w-full h-full" />
                      </div>
                      <div className="mt-1 text-xs pocaListWrap">
                        <p className="font-extrabold groupName">{photocard.groupName}</p>
                        <p className="text-sm memberName">{photocard.stageName}</p>
                        <p className="text-base pocaDetail">{photocard.pocaName}</p>
                        <p className="mb-1 text-gray-500 pocaDesc">{photocard.description}</p>
                        <p className="text-base font-medium pocaPrice">
                          <span>{photocard.price}</span>
                          <span className="won">원</span>
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="mb-6 boardBoast">
              <div className="subject mb-3.5">
                <h3 className="text-2xl font-extrabold">포꾸 자랑</h3>
                <h4 className="text-sm text-gray-500">하늘 아래 똑같은 포카는 없다 🤩</h4>
              </div>
              <div className="boastGallery">
                <ul className="grid grid-cols-3 grid-rows-3">
                  {users2 &&
                    users2.map((user: any) => (
                      <li
                        key={user.id}
                        onClick={() => navigate(`/Community/2/${user.id}`)}
                        className="cursor-pointer h-36"
                      >
                        <img src={user.filePath} className="object-cover w-full h-full" />
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

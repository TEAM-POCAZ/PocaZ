import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from 'utils/Layout'
import { Link } from 'react-router-dom'

interface IChatRoom {
  chatRoom: number
  email: string
  id: number
  message: string
  nickname: string
  profileImage: string
}

const ChatMain = () => {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('') //TODO login 정보에서 가져오기(store)
  const [room, setRoom] = useState('') //TODO 1:1채팅방 room은 어떻게 만들까?
  const [roomData, setRoomData] = useState<IChatRoom[]>([])

  useEffect(() => {
    async function getRooms() {
      try {
        const response = await axios.get(`http://localhost:8080/chatroom/1`)
        setRoomData(response.data)

        setLoading(false)
      } catch (e) {
        console.log('axios get Error')
      }
    }
    getRooms()
  }, [])

  return (
    <Layout>
      {loading ? (
        <>loading 중</>
      ) : (
        <>
          <h1>채팅목록</h1>
          <div>나는 공지사항</div>
          {/* //TODO MAP으로 돌려서 뿌리기  */}
          <div className="m-2 border-2">
            <h2>나는 사용자채팅목록</h2>
            <div>
              <input type="text" placeholder="닉네임" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input
                type="text"
                placeholder="채팅방"
                onChange={(event) => setRoom(event.target.value)}
              />
            </div>
            <Link
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}`}
            >
              <button type="submit" disabled={!name || !room} className="text-black">
                1:1 채팅방 입장
              </button>
            </Link>
          </div>

          {roomData.map((item) => {
            //FIXME key값 수정필요
            return (
              <div className="m-2 border-2 flex flex-col" key={item.chatRoom}>
                <Link
                  onClick={(e) => (!roomData ? e.preventDefault() : null)}
                  to={`/chat?room=${item.chatRoom}`}
                  className="flex"
                >
                  <div className="m-3">
                    <img src={item.profileImage} alt="프로필이미지" />
                  </div>
                  <div>
                    <p>닉네임 : {item.nickname}</p>
                    <p>마지막 메세지 : {item.message} </p>
                  </div>
                </Link>
              </div>
            )
          })}
        </>
      )}
    </Layout>
  )
}

export default ChatMain

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from 'utils/Layout'
import { Link } from 'react-router-dom'

const ChatMain = () => {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('') //TODO login 정보에서 가져오기(store)
  const [room, setRoom] = useState('') //TODO 1:1채팅방 room은 어떻게 만들까?
  const [roomData, setRoomdata] = useState([])

  useEffect(() => {
    async function getRooms() {
      try {
        const response = await axios.get(`http://localhost:8080/chatroom/1`)

        console.log('response :>> ', response)
        setRoomdata(response.data)
        console.log('🚀 ~ file: ChatMain.tsx ~ line 11 ~ ChatMain ~ roomData', roomData)
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
        </>
      )}
    </Layout>
  )
}

export default ChatMain

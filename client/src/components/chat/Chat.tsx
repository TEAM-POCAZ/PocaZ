import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import dayjs from 'dayjs'
import queryString from 'query-string'

import Layout from 'utils/Layout'

import InfoBar from './InfoBar'
import Messages from './Messages'
import InputMsg from './InputMsg'

//type
export interface IMessage {
  user: number | string
  message: string | object
  timestamp?: string
  chatRoom?: number
  createAt?: string
  id?: number
  updateAt?: string
}
// interface IMessage {
//   user: any
//   text: string
//   timestamp?: string
// }

type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

/**
 * front-back 통신 흐름
 * front -> back : api post
 * front <- back : socketIO.on
 *
 * back  -> front : socketIO.emit
 * back <- front : api get
 *
 * @returns
 */

const Chat = () => {
  const [loading, setLoading] = useState(true)
  const [nickName, setNickName] = useState<any>(1) //1인칭 나의 닉네임 //FIXME 1 이 나인것으로 가정함
  const [room, setRoom] = useState<any>('호준호준')
  const [users, setUsers] = useState('')
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([
    {
      user: '포카즈',
      message: `${room}방에 오신것을 환영합니다.`,
    },
  ])
  const navigate = useNavigate()
  const thisTime = dayjs().format('HH:mm') // for timeStamp

  useEffect(() => {
    const { room } = queryString.parse(location.search)
    setRoom(room)

    async function getChat() {
      try {
        const response = await axios.get(`http://localhost:8080/chat/${room}`)

        const apiNewMsg = response.data
        setMessages((prev) => [...prev, ...apiNewMsg])
        setLoading(false)
      } catch (e) {
        console.log('axios get Error')
      }
    }
    getChat()
  }, [location.search])

  const sendMessage = (event: btnClickEvent) => {
    event.preventDefault()

    if (text) {
      const newMessage = {
        user: nickName,
        message: text,
        timeStamp: thisTime,
      }
      setMessages((prev) => [...prev, newMessage])
      setText('')
    }
    // if (message) {
    //     socket.emit("sendMessage", { message, thisTime }, () =>
    //         setMessage("")
    //     );
    // }
  }

  return (
    <Layout>
      {loading ? (
        <>로딩중입니다</>
      ) : (
        <div className="outerContainer flex justify-center items-center h-screen bg-gray-800">
          <div className="container flex flex-col justify-between bg-white rounded-lg h-2/3 w-5/6 ">
            <h1>하이 여긴 챗</h1>
            <div className="flex">
              <button onClick={() => navigate(-1)} className="border">
                채팅목록으로
              </button>
            </div>
            <InfoBar room={nickName} />
            <Messages messages={messages} nickName={nickName} />
            <InputMsg message={text} setMessage={setText} sendMessage={sendMessage} />
          </div>
          {/* <TextContainer users={users} /> */}
        </div>
      )}
    </Layout>
  )
}
export default Chat

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import queryString from 'query-string'
import { useQuery } from 'react-query'

import Layout from 'utils/Layout'
import { apis } from 'utils/api'

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

type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

/**
 * front-back api 통신 흐름
 * front -> back : api post // 메세지를 send 할 때
 * front <- back : socketIO.on
 *
 * back  -> front : socketIO.emit
 * back <- front : api get
 *
 * @returns
 */

const Chat = () => {
  const [nickName, setNickName] = useState<any>('1') //1인칭 나의 닉네임 //FIXME 1 이 나인것으로 가정함
  const [room, setRoom] = useState<any>('호준호준')
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([
    {
      user: '포카즈',
      message: `${room}방에 오신것을 환영합니다.`,
    },
  ])
  const navigate = useNavigate()

  const getChat = async () => {
    const { room, name } = queryString.parse(location.search)

    if (room && name) {
      setRoom(room)
      setNickName(name)
      const { data } = await apis.getChat(room)
      setMessages((prev) => [...prev, ...data])
      return data
    }
  }
  const { isLoading, error, data } = useQuery<IMessage[], Error>('getChat', getChat, {
    refetchOnWindowFocus: false,
  })

  // useEffect(() => {
  //   console.log('nickName :>> ', typeof nickName)
  // }, [nickName])

  const sendMessage = async (event: btnClickEvent) => {
    event.preventDefault()
    if (text) {
      const newMessage = {
        user: nickName,
        message: text,
        chatRoom: room,
      }

      const { data } = await apis.postChat(newMessage)

      // setMessages((prev) => [...prev, newMessage])
      setMessages((prev) => [...prev, data])
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
      {isLoading ? (
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
            {/* FIXME inforbar props로 nickName 이 아니라 상대방 이름이 넘어가야함 */}
            <InfoBar room={nickName} />
            <Messages messages={messages} />
            <InputMsg message={text} setMessage={setText} sendMessage={sendMessage} />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default Chat

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import queryString from 'query-string'
import { useQuery } from 'react-query'

import Layout from 'utils/Layout'
import { apis } from 'utils/api'

import InfoBar from './InfoBar'
import Messages from './Messages'
import InputMsg from './InputMsg'

//type
export interface IChat {
  id: number
  chatRoom: number
  user: number
  message: string
  createAt: Date
  updateAt: null | string
}

//FIXME 왜 안들어갈까?
interface ILocationProps {
  room: unknown
  name: number | string | unknown
  oppNickname: number | string | unknown
}

/**
 * front-back api 통신 흐름
 * front -> back : api post // 메세지를 send 할 때
 * front <- back : socketIO.on
 *
 * back  -> front : socketIO.emit
 * back <- front : api get
 *
 * @returns 개인이 가진 채팅 목록
 */

const Chat = ({ socket }: any) => {
  const navigate = useNavigate()
  // const location = useLocation()

  const { room, name } = queryString.parse(location.search)
  const [chats, setChats] = useState<IChat[]>([])
  // const { room, name, oppNickname }: any = location.state

  useEffect(() => {
    getChat()
    socket.joinRoom(room)

    const close = socket.onSync('test', (a: any) => {
      setChats((prev) => [...prev, a])
    })

    // clear up function 이라고 하며 unmount 시 실행됨
    return () => close() // useEffect 동작 전 실행됨
  }, [])

  const getChat = async () => {
    if (room && name) {
      const { data } = await apis.getChat(room)
      setChats(data)
      return data
    }
  }

  // const { isLoading, error, data } = useQuery<IChat[], Error>('getChat', getChat, {
  //   // refetchOnWindowFocus: false,
  // })

  const handleMessage = async (sendMessage: string | undefined) => {
    if (sendMessage) {
      const newMessage = {
        user: name,
        message: sendMessage,
        chatRoom: room,
      }

      socket.emitSync('sendMessage', newMessage)
      // const { data } = await apis.postChat(newMessage)
      // await apis.postChat(newMessage) // post로 보낼 때
      // setChats((prev) => [...prev, data])
    }
  }

  const isLoading = false
  return (
    <Layout>
      {isLoading ? (
        <>로딩중입니다</>
      ) : (
        <div className="outerContainer flex justify-center items-center h-screen bg-gray-800">
          <div className=" flex flex-col justify-between bg-white rounded-lg h-2/3 w-5/6 ">
            <h1>하이 여긴 챗</h1>
            <div className="flex">
              <button onClick={() => navigate('/chat/list')} className="border">
                채팅목록으로
              </button>
            </div>
            {/* <InfoBar oppNickname={oppNickname} /> */}
            <Messages chats={chats} />
            <InputMsg handleMessage={handleMessage} />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default Chat

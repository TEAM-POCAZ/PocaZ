import React, { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import queryString from 'query-string'

import useStore from 'store/store'
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
  const [chats, setChats] = useState<IChat[]>([])
  const { newMsg, setNewMsg } = useStore()

  const navigate = useNavigate()
  const location = useLocation()
  const { room, name } = queryString.parse(location.search)

  // const { oppNickname }: any = location.state //TODO 지워야함

  useEffect(() => {
    socket.joinRoom(room) //TODO login 붙으면 조인 빼야됨

    socket.onSync('test', (message: any) => {
      setChats((prev) => [...prev, message])
      setNewMsg(message)
      //TODO 이 a 값을 zustand에도 넣는다.
      // 이 값을 chatlist도 바라보게한다.
    })

    // clear up function 이라고 하며 unmount 시 실행됨
    // return () => close() // useEffect 동작 전 실행됨
  }, [])

  const getChat = async () => {
    if (room && name) {
      const { data } = await apis.getChat(room)
      setChats(data)
      return data
    }
  }
  const chatss = useMemo(() => {
    getChat()
  }, [])

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

      socket.emitSync('message', newMessage)
      // socket.emitSync('sendMessage', newMessage)
      // await apis.postChat(newMessage) // post로 보낼 때
      // const { data } = await apis.postChat(newMessage)
      // setChats((prev) => [...prev, data])
    }
  }

  const isLoading = false
  return (
    <Layout>
      {isLoading ? (
        <>로딩중입니다</>
      ) : (
        <div className="flex items-center justify-center bg-gray-800 outerContainer h-[100vh]">
          <div className="flex flex-col justify-between w-full bg-white rounded-lg h-2/3">
            <InfoBar navigate={navigate} />
            {/* <InfoBar oppNickname={oppNickname} navigate={navigate} /> */}
            <Messages chats={chats} />
            <InputMsg handleMessage={handleMessage} />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default Chat

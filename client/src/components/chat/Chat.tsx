import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import Layout from 'utils/Layout'

import InfoBar from './InfoBar'
import Messages from './Messages'
import InputMsg from './InputMsg'

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

interface Message {
  user: string
  text: string
  timestamp?: string
}

const Chat = () => {
  const [name, setName] = useState('호준')
  const [room, setRoom] = useState('호준호준')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      user: 'admin',
      text: `${room}방에 오신것을 환영합니다.`,
    },
  ])
  const navigate = useNavigate()
  const thisTime = dayjs().format('HH:mm') // for timeStamp

  type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

  const sendMessage = (event: btnClickEvent) => {
    event.preventDefault()

    if (message) {
      const newMessage = {
        user: name,
        text: message,
        timeStamp: thisTime,
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage('')
    }
    // if (message) {
    //     socket.emit("sendMessage", { message, thisTime }, () =>
    //         setMessage("")
    //     );
    // }
  }

  return (
    <Layout>
      <div className="outerContainer flex justify-center items-center h-screen bg-gray-800">
        <div className="container flex flex-col justify-between bg-white rounded-lg h-2/3 w-5/6 ">
          <h1>하이 여긴 챗</h1>
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <InputMsg message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        {/* <TextContainer users={users} /> */}
      </div>
      <button onClick={() => navigate(-1)}>채팅목록으로</button>
    </Layout>
  )
}
export default Chat

import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from 'utils/Layout'

const Chat = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <div className="outerContainer flex justify-center items-center h-screen bg-gray-800">
        <div className="container flex flex-col justify-between bg-white rounded-lg h-3/4 w-2/3">
          <h1>하이 여긴 챗</h1>
          {/* <InfoBar room={room} />
      <Messages messages={messages} name={name} />
      <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
      /> */}
        </div>
        {/* <TextContainer users={users} /> */}
      </div>
      <button onClick={() => navigate(-1)}>채팅목록으로</button>
    </Layout>
  )
}
export default Chat

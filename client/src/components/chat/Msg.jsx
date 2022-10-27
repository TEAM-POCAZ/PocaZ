import React from 'react'
import dayjs from 'dayjs'

import useStore from '../../store/store'
import queryString from 'query-string'

/**
 * sender : 메세지를 보낸 사람
 * userInfo state의 NickName은 로그인 정보 기반
 * sender오 userInfo.nickname을 비교하여 로그인사용자의 메세지인지를 확인한다.
 * @param {object} chat post 받아온 obj를 담고 있고 채팅창에 보여줄 value
 * @param {string} name 접속한 사용자의 이름을 가져옴. 위의 user랑 비교할 값 // 광역에서 가져온다.
 * @returns 1:1 사용자 채팅창
 */

const Msg = ({ chat }) => {
  const { room, name } = queryString.parse(location.search)
  const { userInfo } = useStore()
  const { createAt, message } = chat

  const MsgReceivedTime = dayjs(createAt).format('HH:mm') // for timeStamp

  return chat.user === +(name) ? (
    // return chat.user === userInfo.nickName ? (
    <div className="messageContainer flex justify-end py-3 mt-1">
      <div>
        <p className="sentText flex items-center text-gray-400 tracking-tight">{chat.user}</p>
        <p>{MsgReceivedTime}</p>
      </div>
      <div className="messageBox bg-blue-700 rounded-3xl px-2 py-5 inline-block text-white max-w-fit">
        <p className="messageText colorWhite w-full letter tracking-normal float-left text-lg ">
          {message}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer flex justify-start py-3 mt-1">
      <div className="messageBox bg-yellow-300 rounded-3xl px-2 py-5 inline-block text-white max-w-fit">
        <p className="messageText text-gray-800 w-full letter tracking-normal float-left text-base ">
          <span className=" align-middle">{message}</span>
        </p>
      </div>
      <p className="sentText  flex items-center text-gray-400 tracking-tight pl-2 ">{chat.user}</p>
      <p>{MsgReceivedTime}</p>
    </div>
  )
}

export default Msg

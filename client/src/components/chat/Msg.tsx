import React from 'react'

/**
 * @param {object} message text & user & timeStamp를 담고 있고 채팅창에 보여줄 value
 * @param {string} name 접속한 사용자의 이름을 가져옴. 위의 user랑 비교할 값
 * @returns 1:1 사용자 채팅창
 */

const Msg = ({ messageSrc: { message, user, timeStamp }, nickName }: any) => {
  // const trimmedName = nickName.trim().toLowerCase() //FIXME string으로 들어와야하는데 지금 1로 들어옴
  const trimmedName = nickName

  let isSentByCurrentUser = false //FIXME  false 로 시작
  if (user === trimmedName) isSentByCurrentUser = true

  return isSentByCurrentUser ? (
    <div className="messageContainer flex justify-end py-3 mt-1">
      <div>
        <p className="sentText flex items-center text-gray-400 tracking-tight">{trimmedName}</p>
        <p>{timeStamp}</p>
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
          {/* <span className=" align-middle">여긴 텍스트</span> */}
        </p>
      </div>
      <p className="sentText  flex items-center text-gray-400 tracking-tight pl-2 ">{user}</p>
      {/* <p>여긴 너이름</p> */}
      <p>{timeStamp}</p>
      {/* <p>여긴 타임스탬프</p> */}
    </div>
  )
}

export default Msg

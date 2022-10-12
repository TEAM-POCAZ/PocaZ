import React, { useEffect, useState } from 'react'

import { useQuery } from 'react-query'

import Layout from 'utils/Layout'
import useStore from 'store/store'

import { Link } from 'react-router-dom'
import { apis } from '../utils/api'

interface IChatRoom {
  chatRoom: number
  email: string
  id: number
  message: string
  nickname: string
  profileImage: string
}

export interface IUserInfo {
  nickName: string | number
}

const ChatMain = () => {
  const getChatList = async () => {
    const { data } = await apis.getChatList(1) //FIXME id를 담아보낸다.
    return data
  }

  const {
    isLoading,
    error,
    data: roomData,
  } = useQuery<IChatRoom[], Error>('getChatList', getChatList)

  if (error) console.log('"axois", error.message :>> ', error.message)

  // const [name, setName] = useState(1) //FIXME  login 정보에서 가져오기(store) // nickName은 1인 유저로 가정한다.
  const { userInfo } = useStore() // 광역 상태관리
  const [room, setRoom] = useState('') //TODO 1:1채팅방 room은 어떻게 만들까?

  return (
    <Layout>
      {isLoading ? (
        <>loading 중</>
      ) : (
        <>
          <div className="m-2 border-2 flex flex-col">공지사항 컴포넌트</div>
          {roomData?.map((item: IChatRoom) => {
            //FIXME key값 수정필요
            return (
              <div className="m-2 border-2 flex flex-col" key={item.chatRoom}>
                <Link
                  onClick={(e) => (!roomData ? e.preventDefault() : null)}
                  to={`/chat?room=${item.chatRoom}&name=${userInfo?.nickName}`} //FIXME msg 쿼리스트링 때문에 일단 사용
                  // to={`/chat?room=${item.chatRoom}`}
                  // to={`/chat`}
                  // state={{
                  //   room: item.chatRoom,
                  //   name: userInfo?.nickName,
                  //   oppNickname: item.nickname,
                  // }}
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

{
  /* <h1>채팅목록</h1>
<div>나는 공지사항</div>

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
</div> */
}

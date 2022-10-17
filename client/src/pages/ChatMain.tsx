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
  createAt?: Date
}

export interface IUserInfo {
  nickName: string | number
}

/**
 * RoomData는 접속 초기 api.get으로 가져와서 뿌려줌
 * 추가적인 메세지는 useStore에서 메세지값을 가져와서 새로 넣어준다.
 * @returns chat list 반환
 */
const ChatMain = () => {
  const [isReceive, setIsReceive] = useState(true)
  const getChatList = async () => {
    const { data } = await apis.getChatList(1) //FIXME id를 담아보낸다.
    return data
  }

  const {
    isLoading,
    error,
    data: roomData,
  } = useQuery<IChatRoom[], Error>('getChatList', getChatList, {
    // refetchInterval: 1000, // 1초마다 갱신
  })

  // TODO
  //   // 새메세지 수신 시 메세지 갈아끼우기 참고
  //   const logout = () => {
  //     console.log("omg logout! boom");
  //     setSession({ ...session, loginUser: null });
  // };

  if (error) console.log('"axois", error.message :>> ', error.message)

  // const [name, setName] = useState(1) //FIXME  login 정보에서 가져오기(store) // nickName은 1인 유저로 가정한다.
  const { userInfo } = useStore() // 광역 상태관리
  // const [room, setRoom] = useState('') //TODO 1:1채팅방 room은 어떻게 만들까?

  return (
    <Layout>
      {isLoading ? (
        <>loading 중</>
      ) : (
        <>
          <div className=" h-96">
            <div></div>
            <div className="flex flex-col m-2 border-2">공지사항 컴포넌트</div>
            <ul className="p-6 divide-y divide-slate-200">
              {roomData?.map((item: IChatRoom) => {
                //FIXME key값 수정필요
                return (
                  <Link
                    key={item.chatRoom}
                    onClick={(e) => (!roomData ? e.preventDefault() : null)}
                    to={`/chat?room=${item.chatRoom}&name=${userInfo?.nickName}`} //FIXME msg 쿼리스트링 때문에 일단 사용
                    // to={`/chat?room=${item.chatRoom}`}
                    // to={`/chat`}
                    // state={{
                    //   room: item.chatRoom,
                    //   name: userInfo?.nickName,
                    //   oppNickname: item.nickname,
                    // }}
                    className="flex py-4 border-2x"
                  >
                    <li className="flex w-full ">
                      <div className="m-3">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={item.profileImage}
                          alt="profile"
                        />
                      </div>
                      <div className="w-full m-auto ml-3 overflow-hidden">
                        <p className="text-base font-medium text-slate-900">{item.nickname}</p>
                        <p className="text-sm truncate text-slate-500">{item.message} </p>
                      </div>
                      <div className="m-auto">
                        <p className="text-sm truncate text-slate-400">메세지도착시간</p>
                        {isReceive ? (
                          <div className="flex items-center justify-end w-full pr-1 my-1 margin-auto">
                            <p className="w-4 h-4 text-xs text-center text-white bg-blue-500 rounded-full">
                              N
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </div>
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

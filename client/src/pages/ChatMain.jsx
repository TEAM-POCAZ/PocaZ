import React, { Fragment, useEffect, useState } from 'react';

import { useQuery } from 'react-query';

import Layout from '../utils/Layout';
import { useLoginStore } from '../store/store';

import { Link } from 'react-router-dom';
import { apis } from '../utils/api';
import { source } from '../utils/api';

import dayjs from 'dayjs';
import { IsLoading } from '../utils/IsLoading';

const now = dayjs();
/**
 * chatList 접속 초기 api.get으로 가져와서 뿌려줌
 * 추가적인 메세지는 socket.on 으로 받아와 chatList state를 업데이트해준다.
 * @param {object} socket index.js에서 생성된 socket 공유
 * @returns loginUser가 가지고 있는 chat list 나열
 */
const ChatMain = ({ socket }) => {
  const { userInfo } = useLoginStore(); // 광역 상태관리
  const [isLoading, setIsLoading] = useState(true);
  const [chatList, setChatList] = useState();
  const [updatedRoom, setUpdatedRoom] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apis.getChatList(userInfo.id);
        data.sort((a, b) => dayjs(b.createAt) - dayjs(a.createAt));
        setChatList(data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
      return () => source.cancel();
    })();

    socket.onSync('alert-new-message', (message) => {
      setUpdatedRoom(message);
    });
  }, []);

  useEffect(() => {
    chatList?.forEach((item) => {
      socket.joinRoom(String(item.chatRoom), (res) => {
        if (res) {
          console.log('join ===>', res);
        }
      });
    });
  }, [chatList]);

  useEffect(() => {
    if (updatedRoom) {
      const newChatRooms = [];
      for (const value of chatList) {
        if (value.chatRoom === updatedRoom.chatRoom) {
          value.message = updatedRoom.message;
          value.createAt = updatedRoom.createAt;

          const newCondition =
            userInfo.id !== updatedRoom.user && value.msgId < updatedRoom.id;
          if (newCondition) value.newSign = true;
        }
        newChatRooms.push(value);
      }
      newChatRooms.sort((a, b) => dayjs(b.createAt) - dayjs(a.createAt));
      setChatList(newChatRooms);
    }
  }, [updatedRoom]);

  return (
    <Layout>
      {isLoading ? (
        userInfo ? (
          <IsLoading />
        ) : (
          <IsLoading needLogin='로그인이 필요합니다.' />
        )
      ) : (
        <>
          <div className='h-[86vh]'>
            <div></div>
            <div className='flex flex-col m-2 ml-4 border-b-2 border-blue-400 text-base w-40 font-medium decoration-inherit cursor-default'>
              Chat
            </div>
            <ul className='p-6 divide-y divide-slate-200'>
              {chatList &&
                chatList?.map((item) => {
                  const todayMsg = dayjs(item.createAt).isSame(now, 'day');
                  return (
                    <Link
                      key={item.chatRoom}
                      to={`/chat`}
                      state={{
                        room: item.chatRoom,
                        sellerNickname: item.nickname,
                        marketItemId: item.sellItemid, //FIXME 실제 chatlist api 에서 바뀐 데이터!
                      }}
                      className='flex py-4 border-2x'
                    >
                      <li className='flex w-full '>
                        <div className='m-3'>
                          <img
                            className='w-10 rounded-full'
                            src={item.profileImage}
                            alt='profile'
                          />
                        </div>
                        <div className='w-full m-auto ml-3 overflow-hidden'>
                          <p className='text-base font-medium text-slate-900'>
                            {item.nickname}
                          </p>
                          <p className='text-sm truncate text-slate-500'>
                            {item.message}{' '}
                          </p>
                        </div>
                        <div className='m-auto'>
                          <p className='text-sm truncate text-slate-400'>
                            {todayMsg
                              ? dayjs(item.createAt).format('HH:mm')
                              : dayjs(item.createAt).format('MM-DD')}
                          </p>

                          <div
                            className={
                              'flex items-center justify-end w-full pr-1 my-1 margin-auto'
                            }
                          >
                            <p
                              className={
                                'w-4 h-4 text-xs text-center text-white rounded-full' +
                                (item.newSign ? ' bg-blue-500' : ' bg-white')
                              }
                            >
                              N
                            </p>
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ChatMain;

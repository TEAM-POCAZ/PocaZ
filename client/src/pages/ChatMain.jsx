import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";

import Layout from "../utils/Layout";
import { useLoginStore } from "../store/store";

import { Link } from "react-router-dom";
import { apis } from "../utils/api";
import { source } from "../utils/api";

import dayjs from "dayjs";

const now = dayjs();
/**
 * chatList 접속 초기 api.get으로 가져와서 뿌려줌
 * 추가적인 메세지는 socket.on 으로 받아와 chatList state를 업데이트해준다.
 * @params socket index에서 생성된 socket 공유
 * @returns chat list 반환
 */
const ChatMain = ({ socket }) => {
    const { userInfo } = useLoginStore(); // 광역 상태관리
    const [isLoading, setIsLoading] = useState(true);
    const [chatList, setChatList] = useState();
    const [updatedRoom, setUpdatedRoom] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        const list = async () => {
            try {
                const { data } = await apis.getChatList(userInfo.id);
                setChatList(data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
            return () => source.cancel();
        };

        list();
        socket.onSync("alert-new-message", (message) => {
            setUpdatedRoom(message);
        });
    }, []);

    useEffect(() => {
        chatList?.forEach((item) => {
            socket.joinRoom(String(item.chatRoom), (res) => {
                if (res) {
                    console.log("join ===>", res);
                }
            });
        });
        console.log("chatList :>> ", chatList);
    }, [chatList]);

    useEffect(() => {
        if (updatedRoom) {
            const newChatRooms = [];
            for (const value of chatList) {
                if (value.chatRoom === updatedRoom.chatRoom) {
                    value.message = updatedRoom.message;
                    value.createAt = updatedRoom.createAt;

                    const newCondition =
                        userInfo.id !== updatedRoom.user &&
                        value.msgId < updatedRoom.id;
                    if (newCondition) value.newSign = true;
                }
                newChatRooms.push(value);
            }
            setChatList(newChatRooms);
        }
    }, [updatedRoom]);
    // const soId = socket.io.id;
    // var rooms = Object.keys(socket.io.sockets.adapter.sids[soId]);
    // console.log("🚀 ~ file: ChatMain.jsx ~ line 68 ~ ChatMain ~ rooms", rooms);

    return (
        <Layout>
            {isLoading ? (
                <>loading 중</>
            ) : (
                <>
                    <div className="h-screen ">
                        <div></div>
                        <div className="flex flex-col m-2 border-2">
                            공지사항 컴포넌트
                        </div>
                        <ul className="p-6 divide-y divide-slate-200">
                            {chatList &&
                                chatList?.map((item) => {
                                    // console.log(item.newSign);

                                    const todayMsg = dayjs(
                                        item.createAt
                                    ).isSame(now, "day");

                                    return (
                                        <Link
                                            key={item.chatRoom}
                                            to={`/chat`}
                                            state={{
                                                room: item.chatRoom,
                                                oppNickname: item.nickname,
                                            }}
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
                                                    <p className="text-base font-medium text-slate-900">
                                                        {item.nickname}
                                                    </p>
                                                    <p className="text-sm truncate text-slate-500">
                                                        {item.message}{" "}
                                                    </p>
                                                </div>
                                                <div className="m-auto">
                                                    <p className="text-sm truncate text-slate-400">
                                                        {todayMsg
                                                            ? dayjs(
                                                                  item.createAt
                                                              ).format("HH:mm")
                                                            : dayjs(
                                                                  item.createAt
                                                              ).format("MM-DD")}
                                                    </p>

                                                    <div
                                                        className={
                                                            "flex items-center justify-end w-full pr-1 my-1 margin-auto"
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                "w-4 h-4 text-xs text-center text-white rounded-full" +
                                                                (item.newSign
                                                                    ? " bg-blue-500"
                                                                    : " bg-white")
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

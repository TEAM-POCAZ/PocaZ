import React from "react";
import dayjs from "dayjs";

import { useLoginStore } from "../../store/store";

/**
 * sender : 메세지를 보낸 사람
 * userInfo state의 NickName은 로그인 정보 기반
 * sender오 userInfo.nickname을 비교하여 로그인사용자의 메세지인지를 확인한다.
 * @param {object} chat post 받아온 obj를 담고 있고 채팅창에 보여줄 value
 * @param {string} oppNickname chatList에서 받아온 상대방 닉네임을 받아온다.
 * @returns 1:1 사용자 채팅창
 */

const Msg = ({ chat, oppNickname }) => {
    const { userInfo } = useLoginStore();
    const { createAt, message } = chat;


    
    const MsgReceivedTime = dayjs(createAt).format("HH:mm"); // for timeStamp

    return chat.user === userInfo.id ? (
        // return chat.user === userInfo.nickName ? (
        <div className="flex justify-end py-3 mt-1 messageContainer">
            <div>
                {/* <p className="flex items-center tracking-tight text-gray-400 sentText">
                    {chat.user}
                </p> */}
                <p className="flex items-center pl-2 text-sm tracking-tight text-gray-400 sentText">
                    {MsgReceivedTime}
                </p>
            </div>
            <div className="inline-block px-2 py-5 text-white bg-blue-800 messageBox rounded-3xl max-w-fit">
                <p className="float-left w-full text-lg tracking-normal messageText colorWhite letter ">
                    {message}
                </p>
            </div>
        </div>
    ) : (
        <div className="flex justify-start py-3 mt-1 messageContainer">
            <div className="inline-block px-2 py-5 bg-gray-200 messageBox rounded-3xl max-w-fit">
                <p className="float-left w-full text-base tracking-normal messageText letter ">
                    <span className="align-middle ">{message}</span>
                </p>
            </div>
            <div>
                <p className="flex items-center pl-2 text-sm tracking-tight text-gray-700 sentText ">
                    {oppNickname}
                </p>
                <p className="flex items-center pl-2 text-sm tracking-tight text-gray-400 sentText">
                    {MsgReceivedTime}
                </p>
            </div>
        </div>
    );
};

export default Msg;

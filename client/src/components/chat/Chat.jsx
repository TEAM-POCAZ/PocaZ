import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLoginStore } from "../../store/store";
import Layout from "../../utils/Layout";
import { apis } from "../../utils/api";

import InfoBar from "./InfoBar";
import Messages from "./Messages";
import InputMsg from "./InputMsg";

//type

/**
 *
 * @returns 개인이 가진 채팅 목록
 */

const Chat = ({ socket }) => {
    const {
        userInfo: { nickname: name, id },
    } = useLoginStore();
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const { oppNickname, room } = location.state; //FIXME 장터에서 입장했을 때...

    useEffect(() => {
        getChat();
        // socket.joinRoom(room); // from 장터에서 새로운 채팅방이 생겼을 때 join

        socket.onSync("new-message", (message) => {
            setChats((prev) => [...prev, message]);
        });

        // clear up function 이라고 하며 unmount 시 실행됨
        // return 방 join을 leave해야함
        setIsLoading(false);
    }, []);

    const getChat = useCallback(async () => {
        if (room && name) {
            const { data } = await apis.getChat(room);
            setChats(data);
            return data;
        }
    }, []);

    // const { isLoading, error, data } = useQuery<IChat[], Error>('getChat', getChat, {
    //   // refetchOnWindowFocus: false,
    // })

    const handleMessage = async (sendMessage) => {
        if (sendMessage) {
            const newMessage = {
                user: id,
                message: sendMessage,
                chatRoom: room,
            };

            socket.emitSync("message", newMessage);
            // socket.emitSync('sendMessage', newMessage)
            // await apis.postChat(newMessage) // post로 보낼 때
            // const { data } = await apis.postChat(newMessage)
            // setChats((prev) => [...prev, data])
        }
    };
    return (
        <Layout>
            {isLoading ? (
                <>로딩중입니다</>
            ) : (
                <div className="flex items-center justify-center bg-gray-800 outerContainer h-[100vh]">
                    <div className="flex flex-col justify-between w-full bg-white rounded-lg h-2/3">
                        {/* <InfoBar navigate={navigate} /> */}
                        <InfoBar
                            oppNickname={oppNickname}
                            navigate={navigate}
                        />
                        <Messages chats={chats} oppNickname={oppNickname} />
                        <InputMsg handleMessage={handleMessage} />
                    </div>
                </div>
            )}
        </Layout>
    );
};
export default Chat;

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLoginStore } from '../../store/store';
import Layout from '../../utils/Layout';
import { apis } from '../../utils/api';

import InfoBar from './InfoBar';
import Messages from './Messages';
import InputMsg from './InputMsg';
import { IsLoading } from '../../utils/IsLoading';
import axios from 'axios';

/**
 * chatList / MarketDetail 에서 가져온 marketItemId를 활용하여 api get 송출
 * @params {Object} socket
 * @returns join 으로 연결된 1:1 채팅방
 */

const Chat = ({ socket }) => {
  const {
    userInfo: { nickname: userName, id },
  } = useLoginStore();
  const [chats, setChats] = useState([]);
  const [sellItem, setSellItem] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const { sellerNickname, room, marketItemId } = location.state; //FIXME 장터에서 입장했을 때...
  console.log(
    '🚀 ~ file: Chat.jsx ~ line 30 ~ Chat ~ marketItemId',
    marketItemId
  );

  useEffect(() => {
    // getChat();
    axios
      .all([apis.getChat(room), apis.getSellItem(marketItemId)])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1.data);
          console.log(res2.data);
          setChats(res1.data);
          setSellItem(res2.data);
        })
      )
      .then(() => setIsLoading(false));

    socket.joinRoom(String(room), (res) => {
      if (res) {
        console.log('join ===>', res);
      }
    }); // from 장터에서 새로운 채팅방이 생겼을 때 join

    socket.onSync('new-message', (message) => {
      setChats((prev) => [...prev, message]);
    });

    // clear up function 이라고 하며 unmount 시 실행됨
    // return 방 join을 leave해야함
  }, []);

  const getChat = async () => {
    const { data } = await apis.getChat(room);
    // setChats(data);
    return data;
  };

  const getItemInfo = async () => {
    if (marketItemId) {
      const { data } = await apis.getSellItem(marketItemId);
      return data;
    }
  };

  const handleMessage = async (sendMessage) => {
    if (sendMessage) {
      const newMessage = {
        user: id,
        message: sendMessage,
        chatRoom: room,
      };

      socket.emitSync('message', newMessage);
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className='flex items-center justify-center bg-gray-800 outerContainer h-[86vh]'>
          <div className='flex flex-col justify-between w-full bg-white rounded-lg h-4/5'>
            <InfoBar
              sellerNickname={sellerNickname}
              navigate={navigate}
              sellItem={sellItem}
              marketItemId={marketItemId}
            />
            <Messages chats={chats} sellerNickname={sellerNickname} />
            <InputMsg handleMessage={handleMessage} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Chat;

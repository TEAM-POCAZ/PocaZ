
import React from 'react';
import Layout from '../../utils/Layout';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLoginStore } from '../../store/store';

import { apis } from '../../utils/api';
import { toast } from 'react-toastify';
import axios from 'axios';

/**
 * for chat
 * seller id
 * seller nickname
 *
 * @param {object} socket user 간 채팅 연결을 위한 socket Class
 *
 * }
 * @returns chatDetail page => seller and user chatting 연결
 */
const MarketDetail = ({ socket }) => {
  const { userInfo } = useLoginStore();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [tradeStat, setTradeStat] = useState();
  const { id: _id } = useParams(); // 포카판매글 id

  const onClickLinkChat = () => {
    // sellerId, userInfo.id, _id
    socket.createRoom(
      {
        sellerId: null,
        loginUserId: userInfo.id,
        marketItemId: _id,
      },
      (res) => {
        if (res) {
          console.log('market detail chat res ===>', res);
        }
      }
    );
    navigate('/chat', {
      state: { sellerNickname: content.nickname, marketItemId: _id },
    });
  };

  //TODO API post 보내야함
  const onChangeTradeStat = (e) => {
    setTradeStat(e.target.value);
  };

  const onModify = (sellerId) =>
    userInfo.id != sellerId
      ? toast.error('해당 글 작성자만 수정할 수 있습니다')
      : navigate('/MarketWrite', {
          state: { MarketId: _id },
        });

  const onDelete = async (sellerId) => {
    if (userInfo.id != sellerId) {
      toast.error('해당 글 작성자만 삭제할 수 있습니다');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/market/${_id}`);
      toast.success('삭제가 완료되었습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate('/Market');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      const {
        data: [result],
      } = await apis.getMarketDetail(_id);
      setContent(result);
      setTradeStat(result.tradeStatus);
    })();
  }, []);

    const price = Number(content.price);
    return (
        <>
            <Layout>
                <div className="">
                    <div className="marketDetailTop relative flex items-center justify-between px-2.5 pb-2.5 border-b">
                        <button type="button" onClick={() => navigate(-1)}>
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <div className="absolute top-0 left-2/4 translate-x-[-50%] text-lg">
                            <h4 className="flex mb-1 text-sm">
                                <span className="pr-2">
                                    {content.groupName}
                                </span>
                                <span className="text-slate-400">
                                    {content.stageName}
                                </span>
                            </h4>
                        </div>
                        <button onClick={onClickLinkChat}>
                            <i className="ri-chat-3-fill text-2xl" />
                        </button>
                    </div>
                    {content && (
                        <div className="m-3">
                            {/* <div className="pocaDetailImg h-80 mb-2.5 pb-80 rounded-xl bg-slate-200"> */}
                            <img
                                className="relative w-full h-full object-cover mb-2.5 rounded-xl"
                                src={content.pocaImg}
                                alt={content.pocaName}
                            />
                            {/* </div> */}
                            <div className="sellerInfo pt-3 items-center flex border-b">
                                <img
                                    className="m-3 h-10 rounded-full"
                                    src={content.profileImage}
                                    alt="seller"
                                />
                                <span className="font-semibold">
                                    {content.nickname}
                                </span>
                            </div>
                            <div className="pocaDesc pt-2 min-h-[47vh]">
                                <h3 className="pb-2 font-semibold text-2xl mt-5">
                                    {content.title}
                                </h3>
                                <p className="text-gray-400 text-sm break-all pb-3">
                                    {/* 포카 카테고리입니다. */}
                                    {content.sellDesc}
                                </p>
                                <p className="text-black text-base break-all pb-3">
                                    {content.sellDesc}
                                </p>
                            </div>
                            <div className="flex justify-between border-t">
                                <p className="my-2.5 text-2xl font-bold mr-2">
                                    {price.toLocaleString()}
                                    <b className="font-normal">원</b>
                                </p>
                                {/* //TODO content.sellerId로 수정 필요 */}
                                {userInfo.id === content.sellerId ? (
                                    <div className="flex">
                                        <select
                                            value={tradeStat}
                                            onChange={onChangeTradeStat}
                                        >
                                            <option value={1}>판매중</option>
                                            <option value={2}>판매완료</option>
                                        </select>
                                        <button
                                            className="bg-gray-500 text-white p-2 rounded-md text-xl my-2.5 mr-1 ml-2"
                                            onClick={() =>
                                                navigate("/MarketWrite", {
                                                    state: { MarketId: _id },
                                                })
                                            }
                                        >
                                            수정
                                        </button>
                                        <button className="bg-gray-500 text-white p-2 rounded-md text-xl my-2.5">
                                            삭제
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className=" p-2 w-40 text-white bg-main rounded-xl ml-2"
                                        onClick={onClickLinkChat}
                                    >
                                        채팅으로 거래하기
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default MarketDetail;

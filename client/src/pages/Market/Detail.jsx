import React from "react";
import Layout from "../../utils/Layout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * 필요 api
 * {
 * title
 * img
 * 그룹명
 * 멤버명
 * 내용
 * 가격
 *
 * for chat
 * seller id
 * seller nickname
 *
 *
 * }
 * @returns
 */
const MarketDetail = () => {
    const navigate = useNavigate();
    const { _id } = useParams(); // 상품의 ID

    /**
     * 1. 채팅하기 버튼을 누르면 채팅으로 연결된다.(navigate)
     * 2-1. 판매자와 유저(로그인)가 기존 채팅이 있을 경우, 기존 채팅방에 join 시켜준다.
     * 어떻게? socket.emit에 createRoom 이벤트를 태우고, sellerId와 userId를 인자로 넘겨준다.
     * 서버에서 해방 채팅방 확인 후, Join 시켜준다.
     * Navigate(/chat)으로 가서
     * 2-2. 판매자와 유저가 처음 채팅을 하는 경우,
     * @param {*} params
     */
    const onClickChat = (params) => {};

    return (
        <>
            <Layout>
                <div className="marketDetailTop relative flex items-center justify-between px-2.5 pb-2.5 border-b">
                    <button type="button" onClick={() => navigate(-1)}>
                        <i className="ri-arrow-left-line"></i>
                    </button>
                    <h2 className="absolute top-0 left-2/4 translate-x-[-50%] text-lg">
                        팝니다
                        {/* 제목 */}
                    </h2>
                    <button>
                        <i className="text-2xl ri-chat-3-fill"></i>
                    </button>
                </div>
                <div className="m-2.5">
                    <div className="pocaDetailImg h-80 mb-2.5 pb-80 rounded-xl bg-slate-200">
                        포카 이미지 들어올 곳
                    </div>
                    <div className="pt-2 pocaDesc">
                        <h4 className="flex mb-1 text-sm">
                            <span className="pr-2">그룹명</span>
                            <span className="text-slate-400">멤버명</span>
                        </h4>
                        <h4 className="pb-2 font-semibold">
                            사용자가 입력한 제목이 노출됩니다
                        </h4>
                        <p className="text-sm text-gray-400">
                            한줄 소개가 노출됩니다 한줄 소개가 노출됩니다 한줄
                            소개가 노출됩니다 한줄 소개가 노출됩니다 한줄 소개가
                            노출됩니다
                        </p>
                        <p className="my-2.5 text-2xl font-bold">
                            50000
                            {/* toLocalString() */}
                            <b className="font-normal">원</b>
                        </p>
                        <button
                            className="w-full p-2 text-white bg-gray-500 rounded-full"
                            onClick={onClickChat}
                        >
                            채팅하기
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default MarketDetail;

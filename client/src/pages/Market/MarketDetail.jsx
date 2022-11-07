import React from "react";
import Layout from "../../utils/Layout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLoginStore } from "../../store/store";

import { apis } from "../../utils/api";

/**
 * for chat
 * seller id
 * seller nickname
 *
 *
 * }
 * @returns
 */
const MarketDetail = () => {
    const { userInfo } = useLoginStore();
    const navigate = useNavigate();
    const [content, setContent] = useState([]);
    const { id } = useParams(); // 포카판매글 id

    const onClickChat = (params) => {};

    useEffect(() => {
        (async () => {
            const {
                data: [result],
            } = await apis.getMarketDetail(id);
            setContent(result);
        })();
    }, []);

    const price = Number(content.price);
    return (
        <>
            <Layout>
                <div className="marketDetailTop relative flex items-center justify-between px-2.5 pb-2.5 border-b">
                    <button type="button" onClick={() => navigate(-1)}>
                        <i className="ri-arrow-left-line"></i>
                    </button>
                    <h2 className="absolute top-0 left-2/4 translate-x-[-50%] text-lg">
                        팝니다
                    </h2>

                    <button>
                        <i className="ri-chat-3-fill text-2xl"></i>
                    </button>
                </div>
                {content && (
                    <div className="m-2.5">
                        {/* <div className="pocaDetailImg h-80 mb-2.5 pb-80 rounded-xl bg-slate-200"> */}
                        <img
                            className="relative w-full h-full object-cover mb-2.5 rounded-xl"
                            src={content.pocaImg}
                            alt={content.pocaName}
                        />
                        {/* </div> */}
                        <div className="sellerInfo pt-2 flex pb-5 border-b-orange-300 border">
                            <img
                                className="m-3"
                                src={content.profileImage}
                                alt="seller"
                            />
                            <span>{content.nickname}</span>
                        </div>
                        <div className="pocaDesc pt-2">
                            <h4 className="flex mb-1 text-sm">
                                <span className="pr-2">
                                    {content.groupName}
                                </span>
                                <span className="text-slate-400">
                                    {content.stageName}
                                </span>
                            </h4>
                            <h4 className="pb-2 font-semibold">
                                {content.title}
                            </h4>
                            <p className="text-gray-400 text-sm break-all">
                                {content.sellDesc}
                            </p>
                        </div>
                        <div className="flex">
                            <p className="my-2.5 text-2xl font-bold">
                                {price.toLocaleString()}
                                <b className="font-normal">원</b>
                            </p>
                            {userInfo.id === content.id ? (
                                <div>
                                    <button className="bg-gray-500 text-white p-1 rounded-md text-xl my-2.5 mr-1 ml-2">
                                        수정
                                    </button>
                                    <button className="bg-gray-500 text-white p-1 rounded-md text-xl my-2.5">
                                        삭제
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className=" p-2 w-40 text-white bg-gray-500 rounded-xl"
                                    onClick={onClickChat}
                                >
                                    채팅으로 거래하기
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Layout>
        </>
    );
};

export default MarketDetail;

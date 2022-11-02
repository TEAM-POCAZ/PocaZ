import React from "react";
import Layout from "../utils/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MarketDetail = () => {
  const navigate = useNavigate();
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
        <div className="m-2.5">
          <div className="pocaDetailImg h-80 mb-2.5 pb-80 rounded-xl bg-slate-200">
            포카 이미지 들어올 곳
          </div>
          <div className="pocaDesc pt-2">
            <h4 className="flex mb-1 text-sm">
              <span className="pr-2">그룹명</span>
              <span className="text-slate-400">멤버명</span>
            </h4>
            <h4 className="pb-2 font-semibold">
              사용자가 입력한 제목이 노출됩니다
            </h4>
            <p className="text-gray-400 text-sm">
              한줄 소개가 노출됩니다 한줄 소개가 노출됩니다 한줄 소개가
              노출됩니다 한줄 소개가 노출됩니다 한줄 소개가 노출됩니다
            </p>
            <p className="my-2.5 text-2xl font-bold">
              50000
              <b className="font-normal">원</b>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MarketDetail;

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
          <div className="pocaDetailImg h-80 mb-2.5 rounded-xl bg-blue-400">
            이미지 들어올 곳
          </div>
          <div className="pocaDesc">
            <div className="">
              <h4 className="flex">
                <span>그룹명</span>
                <span>멤버명</span>
              </h4>
              <h4>포카명이 노출됩니다</h4>
              <p>한줄 소개가 노출됩니다</p>
              <p>가격이 노출됩니다</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MarketDetail;

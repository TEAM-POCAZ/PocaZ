import React from "react";
import Layout from "../utils/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MarketWrite = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div className="marketWriteTop relative flex justify-between px-2.5 pb-2.5 border-b">
          <button type="button" onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-line"></i>
          </button>
          <h2 className="absolute top-0 left-2/4 translate-x-[-50%] text-lg">
            팝니다
          </h2>
          <button type="button" className="px-2.5 bg-black text-white rounded">
            등록
          </button>
        </div>
        <div className="m-2.5">
          <div className="attachedFileBtn">
            <label htmlFor="file">
              <div className="uploadBtn flex items-center justify-center cursor-pointer">
                <i className="ri-camera-fill text-3xl"></i>
              </div>
            </label>
            <input
              type="file"
              name="avatar"
              id="file"
              accept="image/png, image/jpeg"
              className="hidden"
            />
          </div>
          <div className="groupName">
            <label>그룹명</label>
            <select>
              <option>더보이즈</option>
              <option>엔시티</option>
              <option>뉴진스</option>
              <option>에스파</option>
              <option>아이브</option>
              <option>르세라핌</option>
              <option>블랙핑크</option>
            </select>
          </div>
          <div className="memeberName">
            <label>멤버명</label>
            <select>
              <option>멤버1</option>
              <option>멤버2</option>
              <option>멤버3</option>
              <option>멤버4</option>
            </select>
          </div>
          <button type="button">포카 리스트</button>
          <div className="desc">
            <h3>한줄 소개</h3>
            <textarea placeholder="포카 상태 및 한줄 소개를 간단히 입력해 주세요." />
          </div>
          <div className="price">
            <h3>가격 입력</h3>
            <input type="text" placeholder="ex) 19000" />
            <span className="won">원</span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MarketWrite;

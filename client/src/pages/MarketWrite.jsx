import React from "react";
import Layout from "../utils/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const MarketWrite = () => {
  const navigate = useNavigate();
  const [choose, setChoose] = useState({artists: [], groups:[]});

  useEffect(() => {
    Promise
      .all([
        axios.get("http://localhost:8080/api/artist"),
        axios.get("http://localhost:8080/api/artist/group"),
      ])
      //async 쓰삼***
      .then(
        axios.spread((response1, response2) => {
          setChoose({
            artists: response1.data,
            groups: response2.data
          });
        })
      )
      .catch((e) => console.log(e.response.status));
  }, []);

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
        <div className="">
          <div className="attachedFileBtn">
            <label htmlFor="file">
              <div className="uploadBtn flex items-center justify-center py-3.5 cursor-pointer">
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
          <div className="groupName flex py-5 px-3.5 border-t border-b">
            <label className="w-6/12">그룹명</label>
            <select className="w-6/12">
              {choose?.groups.length > 0 ?
                  choose?.groups.map(group=><option value={group.id}>{group.koreanName}</option>) :
                 <option>로딩 중...</option> }
            </select>
          </div>
          <div className="memeberName flex py-5 px-3.5 border-b">
            <label className="w-6/12">멤버명</label>
            <select className="w-6/12">
              <option>멤버1</option>
              <option>멤버2</option>
              <option>멤버3</option>
              <option>멤버4</option>
            </select>
          </div>
          <button
            type="button"
            className="flex justify-between w-full py-5 px-3.5 border-b text-left"
          >
            포카 리스트<i className="ri-arrow-right-s-fill"></i>
          </button>
          <div className="subject border-b">
            <h3 className="py-5 pb-0 px-3.5">포카 이름</h3>
            <textarea
              placeholder="포카 이름 입력해 주세요."
              className="w-full p-3.5 border-0"
            />
          </div>
          <div className="desc">
            <h3 className="py-5 pb-0 px-3.5">한줄 소개</h3>
            <textarea
              placeholder="포카 상태 및 한줄 소개를 간단히 입력해 주세요."
              className="w-full p-3.5 border-0"
            />
          </div>
          <div className="price pb-5 px-3.5 border-t">
            <h3 className="pt-4 pb-3.5">가격 입력</h3>
            <input
              type="text"
              placeholder="ex) 19000"
              className="mr-2.5 p-2.5 border"
            />
            <span className="won">원</span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MarketWrite;

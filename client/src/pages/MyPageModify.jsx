import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import { useLoginStore } from "../store/store";
import { useQuery } from "react-query";
import axios from "axios";
import MyInfo from "../components/MyPage/MyInfo";
const API = import.meta.env.VITE_HOST_URL;

const MyPageModify = () => {
  const { userInfo, setUserInfo } = useLoginStore();
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <form action={`${API}/user`} method="POST">
          <input type="hidden" name="_method" value="PUT" />
          <MyInfo myInfo={userInfo} disabled={false}></MyInfo>
          <button type="submit">제출</button>
        </form>
      </Layout>
    </>
  );
};

export default MyPageModify;

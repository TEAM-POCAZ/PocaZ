import React, { useEffect, useState } from "react";
import Layout from "../utils/Layout";

import { useCookies } from "react-cookie";
import axios from "axios";

const DevelopmentError = () => {
  const API = import.meta.env.VITE_HOST_URL;

  const [cookies, removeCookie] = useCookies(["error"]);
  const error = cookies.error;
  useEffect(() => {
    return () => {
      removeCookie("error", "", { maxAge: 0 });
    };
  });
  return (
    <Layout>
      에러페이지 인데요. 새로고침하면 날라감. 로컬스토리지에 캐싱하는 코드
      추가해야함
      <div className="break-all">
        <p>에러 이름: {error?.name}</p>
        <p>에러 메시지: {error?.message}</p>
        <p>에러 스택: {error?.stack}</p>
      </div>
    </Layout>
  );
};

export default DevelopmentError;

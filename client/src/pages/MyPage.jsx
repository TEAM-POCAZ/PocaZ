import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import { useLoginStore } from "../store/store";
import { useQuery } from "react-query";
import axios from "axios";
import MyInfo from "../components/MyPage/MyInfo";
const API = import.meta.env.VITE_HOST_URL;

const MyPage = () => {
    const { userInfo, setUserInfo } = useLoginStore();
    const navigate = useNavigate();
    const { isLoading, data, isError, error } = useQuery(
        "me",
        () => {
            return axios.get(`${API}/api/auth/me`, { withCredentials: true });
        },
        {
            retry: false,
            enabled: !!userInfo,
            onSuccess: (res) => {
                setUserInfo(res.data);
            },
            onError: (err) => {
                if (axios.isAxiosError(err)) {
                    navigate("/login");
                } else {
                    console.log("unexpected error: ", err);
                }
            },
        }
    );
    const modify = () => {
        navigate("/MyPageModify");
    };

    const logout = () => {
        fetch(`${API}/api/auth/logout`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setUserInfo({});
            });
        navigate("/");
    };

    const withdrawal = () => {
        fetch(`${API}/api/auth/withdrawal`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                ContentType: "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUserInfo({});
                console.log(data);
            });
    };

    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <>
            <Layout>
                <MyInfo myInfo={userInfo} disabled={true}></MyInfo>
                <div className="right">
                    <button className="mt-5 submit" onClick={modify}>
                        개인정보 수정하기
                    </button>
                    <br></br>
                    <button className="mt-5 submit" onClick={logout}>
                        로그아웃하기
                    </button>
                    <br></br>
                    <button className="submit" onClick={withdrawal}>
                        탈퇴하기
                    </button>
                </div>
            </Layout>
        </>
    );
};

export default MyPage;

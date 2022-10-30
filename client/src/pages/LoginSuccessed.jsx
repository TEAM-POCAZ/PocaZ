import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import { useLoginStore } from "../store/store";

const LoginSuccessed = () => {
    const { setUserInfo } = useLoginStore();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const API = import.meta.env.VITE_HOST_URL;
    console.log(API);
    // if (process.env.NODE_ENV !== 'production') {
    //   API = 'http://localhost:8000'
    // }

    const onClickNextPage = (event) => {
        event.preventDefault();
        navigate("/community");
    };
    useEffect(() => {
        fetch(`${API}/api/auth/me`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
                setUserInfo(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Layout>
                <button onClick={onClickNextPage}>커뮤니티가기</button>
                <h3 className="break-all">
                    사용자 데이터: {JSON.stringify(userData)}
                </h3>
            </Layout>
        </>
    );
};

export default LoginSuccessed;

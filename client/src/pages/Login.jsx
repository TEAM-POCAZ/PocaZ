import React from "react";
import { useNavigate } from "react-router-dom";
import Google from "../assets/img/google.png";
import Apple from "../assets/img/apple.png";
import Twitter from "../assets/img/twitter.png";
import Layout from "../utils/Layout";

const Login = () => {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_HOST_URL;

  const google = () => {
    window.open(`${API}/api/auth/google`, "_self");
  };
  const twitter = () => {
    window.open(`${API}/api/auth/twitter`, "_self");
  };
  const apple = () => {
    window.open(`${API}/api/auth/apple`, "_self");
  };

  return (
    <>
      <Layout>
        <div className="login">
          <h1 className="loginTitle">로그인하기</h1>
          <div className="wrapper">
            <div className="left">
              <div className="loginButton google" onClick={google}>
                <img src={Google} alt="" className="icon"></img>
                Google
              </div>
              <div className="loginButton twitter" onClick={twitter}>
                <img src={Twitter} alt="" className="icon"></img>
                twitter
              </div>
              <div className="loginButton apple" onClick={apple}>
                <img src={Apple} alt="" className="icon"></img>
                apple
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;

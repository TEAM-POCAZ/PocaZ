import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import Input from "../components/MyPage/Input";
import Artist from "../components/MyPage/Artist";
import { useLoginStore } from "../store/store";
import { useQuery } from "react-query";
import axios from "axios";
const API = import.meta.env.VITE_HOST_URL;
import Footer from "../components/Footer";

const MyPage = () => {
  const { userInfo, setUserInfo } = useLoginStore();
  const [axiosError, setAxiosError] = useState(null);
  const [id, setId] = useState(userInfo.id);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [profileImage, setProfileImage] = useState(userInfo.profileImage);
  const [artistId, setArtistId] = useState(userInfo.artist);
  const [deleteAt, setDeleteAt] = useState(userInfo.deleteAt);
  const [createAt, setCreateAt] = useState(userInfo.createAt);
  const [updateAt, setUpdateAt] = useState(userInfo.updateAt);
  const [disabled, setDisabled] = useState(true);
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
          console.log("unexpected error: ", err.response.data.error);
        }
      },
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) {
      setDisabled(false);
    } else {
      const data = {
        id,
        email,
        nickname,
        profileImage,
        artist: artistId,
      };
      try {
        const res = await axios.put(`${API}/api/user`, data, {
          retry: false,
          withCredentials: true,
        });
        setUserInfo(res.data);
        setDisabled(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setAxiosError(err.response.data.error);
        } else {
          console.log("unexpected error: ", err.response.data.error);
        }
      }
    }
  };

  const logout = () => {
    axios.get(
      `${API}/api/auth/logout`,
      { withCredentials: true },
      {
        retry: false,
        onSuccess: (res) => {
          console.log(res.data);
          setUserInfo({});
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            setAxiosError(err.response.data.error);
            navigate("/login");
          } else {
            console.log("unexpected error: ", err);
          }
        },
      }
    );
    navigate("/");
  };

  const withdrawal = () => {
    axios.post(
      `${API}/api/auth/withdrawal`,
      null,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          ContentType: "application/json",
        },
        withCredentials: true,
      },
      null,
      {
        retry: false,
        onSuccess: (res) => {
          setUserInfo({});
          navigate("/");
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            setAxiosError(err.response.data.error);
            navigate("/login");
          } else {
            console.log("unexpected error: ", err);
          }
        },
      }
    );
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
        <div>{axiosError}</div>
        <div className="flex flex-col justify-center">
          <img className="mx-auto" src={profileImage}></img>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            property="id"
            optionalText="개발용"
            placeholder="database primary key"
            value={id}
            setValue={setId}
            disabled={true}
          />
          <Input
            property="username"
            optionalText="개발용"
            placeholder="username by OAuth"
            value={username}
            setValue={setUsername}
            disabled={true}
          />
          <Input
            property="email"
            optionalText="이메일을 수정한다면 인증 절차 필요"
            placeholder="example@example.com"
            value={email}
            setValue={setEmail}
            disabled={disabled}
          />
          <Input
            property="nickname"
            placeholder="예쁜 닉네임"
            value={nickname}
            setValue={setNickname}
            disabled={disabled}
          />
          <Input
            property="profileImage"
            optionalText="경로에서 사진 뿌리기로 변경 필요"
            placeholder="프로필 이미지 경로"
            value={profileImage}
            setValue={setProfileImage}
            disabled={disabled}
          />
          <Input
            property="artist"
            placeholder="최애 아이돌id"
            value={artistId ?? ""}
            setValue={setArtistId}
            disabled={disabled}
          />
          <Artist artistId={artistId}></Artist>
          <Input
            property="deleteAt"
            optionalText="개발용"
            placeholder="삭제되지 않음"
            value={deleteAt ?? ""}
            setValue={setDeleteAt}
            disabled={true}
          />
          <Input
            property="createAt"
            optionalText="개발용"
            value={createAt}
            setValue={setCreateAt}
            disabled={true}
          />
          <Input
            property="updateAt"
            optionalText="개발용"
            placeholder="업데이트되지 않음"
            value={updateAt ?? ""}
            setValue={setUpdateAt}
            disabled={true}
          />
          <input
            type="submit"
            value={disabled ? "개인정보 수정하기" : "수정 완료"}
            className="submit mt-5"
          />
        </form>
        <div className="right">
          <Link to={"/MyIdol"}>최애 아이돌 변경하기</Link>
          <br></br>
          <button className="submit mt-5" onClick={logout}>
            로그아웃하기
          </button>
          <br></br>
          <button className="submit" onClick={withdrawal}>
            탈퇴하기
          </button>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default MyPage;

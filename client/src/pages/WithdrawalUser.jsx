import React, { useEffect, useState } from "react";
import Layout from "../utils/Layout";
import Input from "../components/MyPage/Input";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import axios from "axios";

const WithdrawalUser = () => {
  const API = import.meta.env.VITE_HOST_URL;
  console.log(API);

  const [cookies, removeCookie] = useCookies(["withdrawalUser"]);
  const userInfo = cookies.withdrawalUser;
  const [id, setId] = useState(userInfo.id);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [profileImage, setProfileImage] = useState(userInfo.profileImage);
  const [deleteAt, setDeleteAt] = useState(userInfo.deleteAt);
  const [createAt, setCreateAt] = useState(userInfo.createAt);
  const [updateAt, setUpdateAt] = useState(userInfo.updateAt);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      removeCookie("withdrawalUser", "", { maxAge: 0 });
    };
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${API}/api/user/softDeleteRollback/${id}`
      );
      if (result.data.affectedRows === 1) {
        navigate("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      } else {
        console.log("unexpected error: ", err);
      }
    }
  };
  return (
    <Layout>
      탈퇴한 사용자인데요
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
          disabled={true}
        />
        <Input
          property="nickname"
          placeholder="예쁜 닉네임"
          value={nickname}
          setValue={setNickname}
          disabled={true}
        />
        <Input
          property="profileImage"
          optionalText="경로에서 사진 뿌리기로 변경 필요"
          placeholder="프로필 이미지 경로"
          value={profileImage}
          setValue={setProfileImage}
          disabled={true}
        />
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
          value={disabled ? "계정 복구하기" : "복구 완료"}
          className="submit mt-5"
        />
      </form>
    </Layout>
  );
};

export default WithdrawalUser;

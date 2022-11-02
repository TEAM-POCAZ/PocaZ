import Input from "./Input";
const MyInfo = ({ myInfo, disabled }) => {
  return (
    <div>
      <Input
        name="id"
        optionalText="개발용"
        placeholder="database primary key"
        value={myInfo.id}
        disabled={disabled}
      />
      <Input
        name="username"
        optionalText="개발용"
        placeholder="username by OAuth"
        value={myInfo.username}
        disabled={disabled}
      />
      <Input
        name="email"
        optionalText="이메일을 수정한다면 인증 절차 필요"
        placeholder="example@example.com"
        value={myInfo.email}
        disabled={disabled}
      />
      <Input
        name="nickname"
        placeholder="예쁜 닉네임"
        value={myInfo.nickname}
        disabled={disabled}
      />
      <Input
        name="profileImage 경로"
        optionalText="경로에서 사진 뿌리기로 변경 필요"
        placeholder="프로필 이미지 경로"
        value={myInfo.profileImage}
        disabled={disabled}
      />
      <Input
        name="soft delete 여부"
        optionalText="개발용"
        placeholder="삭제되지 않음"
        value={myInfo.deleteAt ?? ""}
        disabled={disabled}
      />
      <Input
        name="생성 날짜"
        optionalText="개발용"
        value={myInfo.createAt}
        disabled={disabled}
      />
      <Input
        name="업데이트 날짜"
        optionalText="개발용"
        placeholder="업데이트되지 않음"
        value={myInfo.updateAt ?? ""}
        disabled={disabled}
      />
    </div>
  );
};

export default MyInfo;

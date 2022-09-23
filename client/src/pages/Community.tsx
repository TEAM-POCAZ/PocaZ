import React from 'react'
import { Link } from 'react-router-dom'

const Community = () => {
  return (
    <>
      <div className="text-3xl font-bold underline text-blue-500">Hello 커뮤니티입니다</div>
      <div className="block">
        <Link to="/">로그인 페이지 가기</Link>
      </div>
      <div className="block">
        <Link to="/loginsuccessed">로그인 성공 페이지 가기</Link>
      </div>
    </>
  )
}

export default Community

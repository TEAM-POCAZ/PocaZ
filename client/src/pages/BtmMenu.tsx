import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Main from 'pages/Main'
import Community from 'pages/Community'

const BtmMenu = () => {
  console.log('하단 고정 메뉴')
  return (
    <div className="btmMenu sticky bottom-0 left-0 h-12 bg-white z-50">
      <ul className="flex items-center justify-around h-full">
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/*">장터</Link>
        </li>
        <li>
          <Link to="/">포카톡</Link>
        </li>
        <li>
          <Link to="/Community">커뮤니티</Link>
        </li>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
      </ul>
    </div>
  )
}

export default BtmMenu

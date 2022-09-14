import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Main from 'pages/Main'
import Community from 'pages/Community'

const BtmMenu = () => {
  console.log('하단 고정 메뉴')
  return (
    <Router>
      <div className="btmMenu sticky bottom-0 left-0 h-12 bg-white z-50">
        <ul className="flex items-center justify-center h-full">
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

        <Routes>
          <Route path="/">메인</Route>
          <Route path="/*">장터</Route>
          <Route path="/community">커뮤니티</Route>
        </Routes>
      </div>
    </Router>
  )
}

export default BtmMenu

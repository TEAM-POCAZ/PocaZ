import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const BtmMenu = () => {
  return (
    <div className="btmMenu sticky bottom-0 left-0 h-14 bg-white border-t border-gray-400 box-border z-50">
      <ul className="flex items-center justify-around h-full">
        <li>
          <Link to="/">
            <i className="ri-home-3-line block text-center text-2xl leading-none"></i>
            <p className="text-xs">HOME</p>
          </Link>
        </li>
        <li>
          <Link to="/*">
            <i className="ri-store-line block text-center text-2xl leading-none"></i>
            <p className="text-xs">STORE</p>
          </Link>
        </li>
        <li>
          <Link to="/chat/list">
            <i className="ri-chat-heart-line block text-center text-2xl leading-none"></i>
            <p className="text-xs">CHAT</p>
          </Link>
        </li>
        <li>
          <Link to="/CommunityList">
            <i className="ri-emotion-happy-line block text-center text-2xl leading-none"></i>
            <p className="text-xs">FREEZONE</p>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <i className="ri-user-line block text-center text-2xl leading-none"></i>
            <p className="text-xs">MY PAGE</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BtmMenu

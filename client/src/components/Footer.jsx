import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="p-3.5 bg-black">
      <div className="footerLogo">
        <h6 className="text-white italic text-lg font-extrabold">
          <Link to="/">POCAZ.</Link>
        </h6>
      </div>
      <p className="text-zinc-500 text-xs tracking-tighter">
        서울특별시 영등포구 선유로9길 30 106동 청년취업사관학교 영등포캠퍼스
      </p>
      <p className="text-zinc-500 text-xs tracking-tighter">
        Copyright by POCAZ. All rights reserved.
      </p>
      <a className="pr-1 text-zinc-600 text-xs" href="#notion1" target="_blank">
        개인정보처리방침 |
      </a>
      <a className="text-zinc-600 text-xs" href="#notion2" target="_blank">
        이용약관
      </a>
    </footer>
  )
}

export default Footer

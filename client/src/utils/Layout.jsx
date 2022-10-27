import React, { Children } from 'react'
// import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BtmMenu from '../components/BtmMenu'
import ScrollTopBtn from '../components/scrollTopBtn'

const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <div className="bg mm:bg-inherit relative w-screen">
        <div className="txtBox mm:hidden lg:hidden fixed top-2/4 left-1/2 text-center">
          <h2 className="text-white italic text-6xl font-extrabold">POCAZ.</h2>
          <h3 className="mt-3 mb-3 lg:text-xl xl:text-2xl text-blue-900 text-3xl font-light tracking-tighter">
            세상 모든 최애의 포토카드를 찾아 보세요.
          </h3>
          <h4 className="text-6xl">😍 🥰 😘</h4>
        </div>
        <div className="mobileWrap lg:static lg:w-full tt:block mm:static mm:block mm:w-full absolute top-0 right-0 w-[480px] mr-10 bg-white">
          <Header />
          {children}
          <Footer />
          <ScrollTopBtn />
          <BtmMenu />
        </div>
      </div>
    </div>
  )
}

export default Layout

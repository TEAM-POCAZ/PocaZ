import React, { Children } from "react";
// import { useNavigate } from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
import BtmMenu from "../components/BtmMenu";
import ScrollTopBtn from "../components/scrollTopBtn";

const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <div className="bg mm:bg-inherit relative w-screen">
        <div className="txtBox mm:hidden lg:hidden fixed top-2/4 left-1/2 text-center">
          <div className="mb-5">
            <p className="flex justify-center text-sm font-bold text-white">
              <i className="ri-star-fill text-yellow-200"></i>IDOL PHOTO CARD
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-black relative inline-block ml-1.5">
                <span className="relative p-2 italic text-white">A to Z.</span>
              </span>
            </p>
          </div>
          <h2 className="my-6 text-white italic text-7xl font-black tracking-[-2px]">
            POCAZ.
          </h2>
          <button
            type="button"
            className="my-5 px-6 py-4 bg-zinc-800 hover:bg-zinc-900 text-white rounded-lg ease-in"
          >
            <p className="flex">
              내 최애 포카 찾으러 가기 <i className="ri-arrow-right-s-line"></i>
            </p>
          </button>
        </div>
        <div className="mobileWrap lg:static lg:w-full tt:block mm:static mm:block mm:w-full absolute top-0 right-0 w-[480px] mr-40 bg-white">
          <Header />
          {children}
          <Footer />
          <ScrollTopBtn />
          <BtmMenu />
        </div>
      </div>
    </div>
  );
};

export default Layout;

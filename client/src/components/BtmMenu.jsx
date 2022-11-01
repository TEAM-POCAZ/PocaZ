import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import classnames from "classnames";

const btnList = [
  { id: 0, title: "Home", icon: "ri-home-3-line", to: "/" },
  { id: 1, title: "STORE", icon: "ri-store-line", to: "/MarketList" },
  { id: 2, title: "CHAT", icon: "ri-chat-heart-line", to: "/chat/list" },
  {
    id: 3,
    title: "FREEZONE",
    icon: "ri-emotion-happy-line",
    to: "/CommunityList",
  },
  { id: 4, title: "MY PAGE", icon: "ri-user-line", to: "/MyPage" },
];

const BtmMenu = () => {
  return (
    <div className="box-border sticky bottom-0 left-0 z-50 bg-white border-t border-gray-400 btmMenu h-14">
      <ul className="flex items-center justify-around h-full">
        {btnList.map((btn) => {
          const classStr = classnames(
            "block text-center text-2xl leading-none",
            btn.icon
          );
          return (
            <li key={btn.id}>
              <Link to={btn.to} replace>
                <i className={classStr}></i>
                <p className="text-xs">{btn.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BtmMenu;

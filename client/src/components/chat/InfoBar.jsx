import React from "react";
import "remixicon/fonts/remixicon.css";

const InfoBar = ({ sellerNickname, navigate }) => {
    return (
        <div className="flex flex-col justify-between w-full h-24 bg-white text rounded-t-md">
            <div className="flex flex-row h-24">
                <i
                    onClick={() => navigate("/chat/list")}
                    className="items-center m-auto mx-2 text-2xl leading-none text-center ri-arrow-left-line"
                ></i>
                <div className="flex items-center ml-1 text-lg font-medium text-slate-900 py-2">
                    {sellerNickname}
                </div>
            </div>

            <div className="flex items-center w-full h-40 p-2 border-y-2">
                <img src="" alt="포카이미지" />
                <div>
                    <p>판매 제목</p>
                    <p>가격</p>
                </div>
            </div>
        </div>
    );
};

export default InfoBar;

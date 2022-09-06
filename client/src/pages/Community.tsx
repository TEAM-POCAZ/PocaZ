import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
    return (
        <>
            <div className="text-3xl font-bold underline text-blue-500">
                Hello 커뮤니티입니다
            </div>
            <Link to="Home">홈으로</Link>
        </>
    );
};

export default Community;

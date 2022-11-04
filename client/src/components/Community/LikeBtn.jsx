import React from "react";

const LikeBtn = ( { like, onClick, cnt } ) => {
  return (
    <div className="likeBtn flex items-center justify-center py-5">
      <button
        onClick={onClick}
        className={like ? "ri-heart-fill" : "ri-heart-line"}
      >
        좋아요 ({cnt + like ? 1 : 0})
      </button>
    </div>
  );
};

export default LikeBtn;

import React from 'react'

const LikeBtn = (Props: any) => {
  const { like, onClick } = Props
  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick} className={like ? 'likeOn' : 'likeOff'}>
        <i className="ri-heart-line"></i> 좋아요
      </button>
    </div>
  )
}

export default LikeBtn

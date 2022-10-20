import React from 'react'

const LikeBtn = (Props: any) => {
  const { like, onClick } = Props
  return (
    <div className="likeBtn flex items-center justify-center py-5">
      <button onClick={onClick} className={like ? 'ri-heart-fill' : 'ri-heart-line'}>
        좋아요
      </button>
    </div>
  )
}

export default LikeBtn

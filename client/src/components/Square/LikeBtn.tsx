import React from 'react'

const LikeBtn = (Props: any) => {
  const { like, onClick } = Props
  return (
    <>
      <button onClick={onClick} className={like ? 'likeOn' : 'likeOff'}>
        좋아욤
      </button>
    </>
  )
}

export default LikeBtn

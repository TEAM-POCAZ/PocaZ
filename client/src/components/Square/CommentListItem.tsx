import React from 'react'

interface Props {
  comment: any
}

const CommentListItem = ({ comment }: Props) => (
  <>
    <div className="writeWrap">
      <div className="commentThumb w-10 h-10 rounded-full bg-black mr-2.5"></div>
      <span className="writeName">{comment.nickname}</span>
    </div>
    <div className="commentBox">
      <p>{comment.content}</p>
    </div>
  </>
)
export default CommentListItem

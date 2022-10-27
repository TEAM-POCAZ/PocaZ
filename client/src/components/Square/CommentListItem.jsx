import React from 'react'

const CommentListItem = ({ comment, appendReply }) => (
  <div className="mb-2.5 pb-2.5 border-b">
    <div className="writeWrap flex items-center">
      <div className="commentThumb w-10 h-10 rounded-full bg-black mr-2.5"></div>
      <span className="writeName">{comment.nickname}</span>
    </div>
    <div className="commentBox py-2.5">
      <p>{comment.content}</p>
    </div>
    <div
      onClick={() => {
        // console.log(comment.id)
        appendReply(comment.id)
      }}
    >
      답글달기~~~
    </div>
  </div>
)
export default CommentListItem

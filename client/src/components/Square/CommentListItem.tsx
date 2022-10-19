import React from 'react'

interface Props {
  comment: any
  appendReply: any
}

const CommentListItem = ({ comment, appendReply }: any) => (
  <div className="mb-2.5 p-2.5 border-b">
    <div className="writeWrap flex items-center">
      <div className="commentThumb w-10 h-10 rounded-full bg-black mr-2.5"></div>
      <span className="writeName">{comment.nickname}</span>
    </div>
    <div className="commentBox py-2.5">
      <p>{comment.content}</p>
    </div>

    {!comment.pid ? (
      <div
        onClick={() => {
          // console.log(comment.id)
          appendReply(comment.id)
        }}
      >
        답글달기~~~
      </div>
    ) : null}
  </div>
)
export default CommentListItem

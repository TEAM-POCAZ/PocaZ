import React from 'react'
import CommentListItem from './CommentListItem'

const ReplyList = ({ comment }) => (
  <div>
    {comment.reply.map((comm) => (
      <CommentListItem key={comm.id} comment={comm} />
    ))}
  </div>
)

export default ReplyList

import React from 'react'
import CommentListItem from './CommentListItem'

interface Props {
  comment: any
}

const ReplyList = ({ comment }: Props) => (
  <div>
    {comment.reply.map((comm: any) => (
      <CommentListItem key={comm.id} comment={comm} />
    ))}
  </div>
)

export default ReplyList

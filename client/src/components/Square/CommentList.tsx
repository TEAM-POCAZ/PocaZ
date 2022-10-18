import React from 'react'
import CommentListItem from './CommentListItem'
import ReplyList from './ReplyList'

interface Props {
  comments: any
}
const CommentList = ({ comments }: Props) => (
  <>
    {comments &&
      comments.map((comment: any): any => (
        <>
          <CommentListItem key={comment.id} comment={comment} />
          <div className="preply bg-blue-300">
            <ReplyList comment={comment} />
          </div>
        </>
      ))}
  </>
)

export default CommentList

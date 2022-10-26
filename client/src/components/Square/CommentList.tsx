import React, { useState } from 'react'
import CommentListItem from './CommentListItem'
import ReplyList from './ReplyList'

interface Props {
  key: any
  comments: any
  appendReply: any
}
const CommentList = ({ comments, category, id }: any) => {
  const [reReply, setReReply] = useState([false, null])
  const [repComment, setRepComment] = useState('')

  const commentChange = (event: any) => {
    setRepComment(event.target.value)
  }

  const appendReply = (pid: any) => {
    // console.log(e.target)
    // console.log(reReply)
    setReReply([!reReply[0], pid])
  }

  const commentSubmit = async (event: any) => {
    if (repComment)
      try {
        // await (
        await fetch(`http://localhost:8080/api/post/reply/${category}/${id}/2`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify([
            {
              pid: reReply[1],
              content: repComment,
            },
          ]),
        })
        setRepComment('')
        window.location.reload()
      } catch (err) {
        console.error(err)
      }
  }

  return (
    <>
      {comments &&
        comments.map((comment: any): any => (
          <>
            <CommentListItem key={comment.id} comment={comment} appendReply={appendReply} />
            {reReply[0] && reReply[1] === comment.id ? (
              <>
                <input type="text" value={repComment} onChange={commentChange} />
                <button onClick={commentSubmit}>답글 작성</button>
              </>
            ) : null}
            <div className="preply bg-blue-300">
              <ReplyList comment={comment} />
            </div>
          </>
        ))}
    </>
  )
}

export default CommentList

// import React from 'react';
import CommentListItem from './CommentListItem';

const ReplyList = ({ comment, userId, refetch }) => (
  <div className='bg-blue-50'>
    {comment.reply.map((comm) => (
      <CommentListItem
        key={comm.id}
        comment={comm}
        userId={userId}
        refetch={refetch}
      />
    ))}
  </div>
);

export default ReplyList;

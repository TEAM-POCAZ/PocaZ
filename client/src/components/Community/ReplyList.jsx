import React from "react";
import CommentListItem from "./CommentListItem";

const ReplyList = ({ comment }) => (
  <div className="bg-blue-50">
    {comment.reply.map((comm) => (
      <CommentListItem key={comm.id} comment={comm} />
    ))}
  </div>
);

export default ReplyList;

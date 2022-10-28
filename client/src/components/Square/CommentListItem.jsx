import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CommentListItem = ({ comment, toggleReply }) => {
  const [hidden, setHidden] = useState(true);
  const { category, id } = useParams();
  const modifyRef = useRef();

  const modifyToggle = (content) => {
    setHidden(!hidden);
    modifyRef.current.value = content;
  };

  const clickModify = async (cid) => {
    await fetch(
      `http://localhost:8080/api/post/reply/${category}/${id}/1/${cid}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content: modifyRef.current.value,
        }),
      }
    );
    window.location.reload();
  };

  const clickDelete = (event) => {
    fetch(
      `http://localhost:8080/api/post/reply/${category}/${id}/1/${comment.id}`,
      {
        method: "DELETE",
      }
    );
    window.location.reload();
  };

  return (
    <>
      <div className="mb-2.5 pb-2.5 border-b">
        <div className="writeWrap flex items-center">
          <div className="commentThumb w-10 h-10 rounded-full bg-black mr-2.5"></div>
          <span className="writeName">{comment.nickname}</span>
        </div>
        <div className="commentBox py-2.5">
          <p>{comment.content}</p>
        </div>
        {comment.pid ? null : (
          <div onClick={() => toggleReply(comment.id)}>답글달기~~~</div>
        )}
        <button onClick={() => modifyToggle(comment.content)}>수정</button>
        <button onClick={clickDelete}>삭제</button>
      </div>
      {
        <div hidden={hidden}>
          <textarea height={40} ref={modifyRef} />
          <button
            title="댓글 수정하기"
            onClick={() => clickModify(comment.id)}
          />
        </div>
      }
    </>
  );
};
export default CommentListItem;

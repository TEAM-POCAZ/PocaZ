import React from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const CommentListItem = ({ list }) => {
  const navigate = useNavigate()
  return (
    <>
      <ul>
        {list &&
          list.map((lists) => {
            const days = dayjs(lists.createAt).format('YYYY-MM-DD')
            return (
              <li
                key={lists.id}
                className="flex py-2.5 border-b cursor-pointer"
                onClick={() => navigate(`/Community/1/${lists.id}`)}
              >
                <div className="boardSubject w-[calc(100% - 100px)]">
                  <p className="mr-1 mb-2.5 truncate">{lists.title}</p>
                  <div>
                    <div className="writeWrap flex items-center">
                      <div className="writeProfile w-10 h-10 rounded-full bg-black mr-2.5"></div>
                      <span className="writeName">{lists.nickname}</span>
                    </div>
                    <time className="text-xs">{days}</time>&nbsp;
                    <span className="comment text-xs">댓글 {lists.replyCnt}</span>&nbsp;
                    <span className="hit text-xs">조회 {lists.viewCount}</span>
                  </div>
                </div>
                <div className="boardPhoto w-24 h-24 overflow-hidden">
                  {lists.filePath ? (
                    <img
                      src={lists.filePath}
                      className="w-full min-h-full object-fill border border-gray-100"
                    />
                  ) : null}
                </div>
              </li>
            )
          })}
      </ul>
    </>
  )
}
export default CommentListItem

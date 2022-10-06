import React from 'react'
import { Link } from 'react-router-dom'
import Layout from 'utils/Layout'

const CommunityList = () => {
  return (
    <>
      <Layout>
        <div className="communityListBoxWrap">
          <div className="communityTab relative mx-2.5">
            <ul className="flex justify-evenly">
              <li>
                <Link to="/CommunityList">자유</Link>
              </li>
              <li>
                <Link to="/CommunityBoast">자랑</Link>
              </li>
            </ul>
            <button
              type="button"
              className="absolute top-2/4 right-0 translate-y-[-50%] px-2.5 bg-black text-white rounded"
            >
              <Link to="/CommunityWrite">작성</Link>
            </button>
          </div>
          <div className="freeBoardSort mt-2.5 border-t border-b">
            <ul className="flex justify-around py-3">
              <li>인기</li>
              <li>최신</li>
            </ul>
          </div>
          <div className="h-screen">
            <ul>
              <li>
                <div className="boardSubject">
                  <p>제목이 들어올 곳</p>
                  <div>
                    <div className="writeWrap">
                      <div className="writeProfile">{/* <img src={} /> */}</div>
                      <span className="writeName">작성자명</span>
                    </div>
                    <time>날짜</time>
                    <span className="comment">댓글 0</span>
                    <span className="hit">조회수</span>
                  </div>
                </div>
                <div className="boardPhoto">{/* <img src={} /> */}</div>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityList

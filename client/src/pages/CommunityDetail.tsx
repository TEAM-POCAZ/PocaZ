import React from 'react'
import { Link } from 'react-router-dom'
import Layout from 'utils/Layout'

const CommunityDetail = () => {
  return (
    <>
      <Layout>
        <div className="communityDetailBoxWrap">
          <div className="communitDetailTop flex justify-between mx-2.5">
            <button type="button">
              <i className="ri-arrow-left-line"></i>
            </button>
            <h2 className="text-base translate-x-2.5">자유</h2>
            <button type="button">
              <i className="ri-more-line"></i>
            </button>
          </div>
          <div className="communityDetailContents">
            <h3>제목</h3>
            <div className="writeWrap">
              <div className="writeThumb">{/* <img src={} /> */}</div>
              <span className="writeName">작성자명</span>
            </div>
            <time>날짜</time>
            <span className="comment">댓글 0</span>
            <span className="hit">조회수가 왜 없어!!</span>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityDetail

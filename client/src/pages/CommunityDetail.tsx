import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Layout from 'utils/Layout'
import axios from 'axios'

const CommunityDetail = () => {
  const { category, id } = useParams()
  const [DetailContent, setDetailContent] = useState<any[] | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const Detail = async () => {
      try {
        setDetailContent(null)
        const response = await axios.get(`https://pocaz.ystoy.shop/api/post/${category}/${id}`)
        setDetailContent(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    Detail()
  }, [])

  return (
    <>
      <Layout>
        <div className="communityDetailBoxWrap">
          <div className="communitDetailTop flex justify-between mx-2.5">
            <button type="button" onClick={() => navigate(-1)}>
              <i className="ri-arrow-left-line"></i>
            </button>
            <h2 className="text-base translate-x-2.5">자유</h2>
            <button type="button">
              <i className="ri-more-line"></i>
            </button>
          </div>
          <div className="communityDetailContents">
            {DetailContent &&
              DetailContent.map((DetailContents: any, index) => (
                <div key={DetailContents.id}>
                  <h3>{DetailContents.title}</h3>
                  <div className="writeWrap">
                    <div className="writeThumb">{/* <img src={} /> */}</div>
                    <span className="writeName">{DetailContents.nickname}</span>
                  </div>
                  <time>{DetailContents.createAt}</time>
                  <span className="comment">댓글 {DetailContents.replyCnt}</span>
                  <span className="hit">조회수 {DetailContents.viewCount}</span>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityDetail

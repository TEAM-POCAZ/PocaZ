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
        //console.log(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    Detail()
  }, [])

  const deleteAction = async () => {
    try {
      const del = await axios.delete(`https://pocaz.ystoy.shop/api/post/${category}/${id}/1`)
      alert('게시글 삭제 완료!')
      navigate('/CommunityList')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Layout>
        <div className="communityDetailBoxWrap">
          <div className="communitDetailTop flex justify-between px-2.5 border-b">
            <button type="button" onClick={() => navigate(-1)}>
              <i className="ri-arrow-left-line"></i>
            </button>
            <h2 className="text-base translate-x-2.5">자유</h2>
            <button type="button">
              <i className="ri-more-line"></i>
            </button>
            <div>수정</div>
            <button onClick={deleteAction}>삭제</button>
          </div>
          <div className="communityDetailContents mt-2.5">
            {DetailContent &&
              DetailContent.map((DetailContents: any, index) => (
                <div key={DetailContents.id} className="mb-3.5">
                  <div className="mb-2.5 pb-2.5 px-2.5 border-b">
                    <h3 className="pb-1 text-lg font-bold">{DetailContents.title}</h3>
                    <div className="writeWrap flex items-center pb-2.5">
                      <div className="writeThumb w-10 h-10 rounded-full bg-black mr-2.5"></div>
                      <span className="writeName">{DetailContents.nickname}</span>
                    </div>
                    <time>{DetailContents.createAt}</time>&nbsp;
                    <span className="hit">조회수 {DetailContents.viewCount}</span>
                  </div>
                  <div className="px-2.5 pb-2.5">
                    <div className="attachedFile"></div>
                    <p className="break-all">{DetailContents.text}</p>
                  </div>
                  <button className="flex items-center justify-center w-full bg-blue-800 text-white likeBtn">
                    👍🏻 좋아요가 들어올 영역
                  </button>
                </div>
              ))}
            <div className="replyWrap"></div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityDetail

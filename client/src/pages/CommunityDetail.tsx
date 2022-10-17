import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Layout from 'utils/Layout'
import axios from 'axios'

import CommentList from '../components/Square/CommentList'

const CommunityDetail = () => {
  const { category, id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [DetailContent, setDetailContent] = useState<any[] | null>(null)
  const [comments, setComments] = useState<any[] | null>(null)
  const [reply, setReply] = useState<any[] | null>(null)
  const [replyCnt, setReplyCnt] = useState(0)
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
  const onReplyChange = (e: any) => {
    // console.log(reply)
    setReply(e.target.value)
  }
  const onReplySubmit = async () => {
    try {
      const { data } = await axios.post(
        `https://pocaz.ystoy.shop/api/post/reply/${category}/${id}/1`,
        [
          {
            pid: null,
            content: reply,
          },
        ],
      )
      // console.log('성공')
      // console.log(data)
      alert('등록 완료!')
      window.location.reload()
    } catch (err: any) {
      console.error(err)
    }
  }

  const modifyAction = () => {
    // try {
    //   navigate('/Community', { state: { category, id } })
    // } catch (e) {
    //   console.error(e)
    // }
    useEffect(() => {
      const modify = async () => {
        const { data } = await axios.get('`https://pocaz.ystoy.shop/api/post/${category}/${id}')
        return data
      }
      modify().then((result) => {
        setTitle(result.title)
        setContent(result.content)
      })
    }, [])
  }

  const deleteAction = async () => {
    try {
      const del = await axios.delete(`https://pocaz.ystoy.shop/api/post/${category}/${id}/1`)
      alert('게시글 삭제 완료!')
      navigate('/CommunityList')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setComments(null)
        const response = await axios.get(
          `https://pocaz.ystoy.shop/api/post/reply/${category}/${id}`,
        )
        const [originComments, replyComments]: [originComments: any, replyComments: any] =
          response.data
        setComments(
          originComments.map((preply: any) => {
            preply.reply = replyComments.filter((rep: any) => rep.pid == preply.id)
            return preply
          }),
        )
        // console.log(originComments)
        setReplyCnt(originComments.length + replyComments.length)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])
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
            <button onClick={modifyAction}>수정</button>
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
                    <span>댓글 수:{replyCnt}</span>
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
            <div className="replyWrap px-2.5">
              <CommentList comments={comments} />
              <div className="commentWriteBtn">
                <textarea className="border" onChange={onReplyChange} />
                <button onClick={onReplySubmit}>댓글 등록</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityDetail

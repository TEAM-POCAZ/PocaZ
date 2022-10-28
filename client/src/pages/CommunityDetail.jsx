import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Layout from '../utils/Layout'
import axios from 'axios'
import LikeBtn from '../components/Square/LikeBtn'
import CommentList from '../components/Square/CommentList'
import dayjs from 'dayjs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const CommunityDetail = () => {
  const { category, id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [DetailContent, setDetailContent] = useState(null)
  const [comments, setComments] = useState(null)
  const [reply, setReply] = useState(null)
  const [replyCnt, setReplyCnt] = useState(0)
  const navigate = useNavigate()
  const [like, setLike] = useState(false)
  const [img, setImg] = useState('')
  useEffect(() => {
    const Detail = async () => {
      try {
        await axios.patch(`http://localhost:8080/api/post/view/${category}/${id}`)

        setDetailContent(null)
        const response = await axios.get(`http://localhost:8080/api/post/${category}/${id}`)
        setDetailContent(response.data[0])
        const { data } = await axios.get(
          `http://localhost:8080/api/post/img/${category}/${id}`,
        )
        //const [{ path: imgPath }] = data
        //setImg(imgPath)
        //console.log(response.data)
        //console.log(imgPath)
      } catch (e) {
        console.error(e)
      }
    }
    Detail()
  }, [])

  useEffect(() => {
    ;(async () => {
      const {
        data: [toggleLike],
      } = await axios.get(`http://localhost:8080/api/post/likes/${id}/1`)
      toggleLike ? setLike(true) : setLike(false)
    })()
  }, [like])

  const onReplyChange = (e) => {
    // console.log(reply)
    setReply(e.target.value)
  }
  const onReplySubmit = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/post/reply/${category}/${id}/1`,
        [
          {
            pid: null,
            content: reply,
          },
        ],
      )
      // console.log('성공')
      // console.log(data)
      toast.success('댓글이 등록되었습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      })
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const modifyAction = () => {
    if (DetailContent && DetailContent.userId === 1) {
      navigate('/Community', { state: { category, id } })
    } else {
      toast.success('수정 권한이 없습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
  }

  const deleteAction = async () => {
    try {
      const del = await axios.delete(`http://localhost:8080/api/post/${category}/${id}/1`)
      toast.success('삭제가 완료되었습니다.', {
        autoClose: 500,
        position: toast.POSITION.BOTTOM_CENTER,
      })
      navigate('/CommunityList')
    } catch (e) {
      console.error(e)
    }
  }

  const onToggleLike = () => {
    if (like) {
      axios.delete(`http://localhost:8080/api/post/likes/${id}/1`)
      setLike(false)
    } else {
      axios.post(`http://localhost:8080/api/post/likes/${id}/1`)
      setLike(true)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setComments(null)
        const response = await axios.get(
          `http://localhost:8080/api/post/reply/${category}/${id}`,
        )
        const [originComments, replyComments] =
          response.data
        setComments(
          originComments.map((preply) => {
            preply.reply = replyComments.filter((rep) => rep.pid == preply.id)
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
          <div className="communityDetailContents my-2.5">
            {DetailContent &&
              (() => {
                const days = dayjs(DetailContent.createAt).format('YYYY-MM-DD')

                return (
                  <div key={DetailContent.userId} className="mb-3.5">
                    <div className="mb-2.5 pb-2.5 px-2.5 border-b">
                      <h3 className="pb-1 text-lg font-bold">{DetailContent.title}</h3>
                      <div className="writeWrap flex items-center pb-2.5">
                        <div className="writeThumb w-10 h-10 rounded-full bg-black mr-2.5"></div>
                        <span className="writeName">{DetailContent.nickname}</span>
                      </div>
                      <time>{days}</time>&nbsp;
                      <span>댓글 {replyCnt}</span>&nbsp;
                      <span className="hit">조회 {DetailContent.viewCount}</span>
                    </div>
                    <div className="px-2.5 min-h-[300px]">
                      <div className="attachedFile">
                        <img src={img} />
                      </div>
                      <p className="break-all">{DetailContent.text}</p>
                    </div>
                    <LikeBtn like={like} onClick={onToggleLike} />
                  </div>
                )
              })()}
            <div className="replyWrap m-2.5 border-t ">
              <CommentList comments={comments} category={category} id={id} />
              <div className="commentWriteBtn flex mt-4">
                <textarea className="border w-full p-2.5" onChange={onReplyChange} />
                <button
                  onClick={onReplySubmit}
                  className="min-w-[40px] ml-2.5 text-xs bg-blue-800 text-white"
                >
                  댓글
                  <br />
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityDetail
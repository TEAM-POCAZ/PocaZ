import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from 'utils/Layout'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CommunityWrite = () => {
  const navigate = useNavigate()
  const [cate, setCate] = useState(1)
  // const postWrap = useRef<HTMLInputElement | null>(null)
  // const postWrap2 = useRef<HTMLTextAreaElement | null>(null)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [img, setImg] = useState<number[]>([])
  const postInfo = useLocation()

  const getModifyPost = async () => {
    if (postInfo.state) {
      const {
        state: { category, id },
      }: any = postInfo
      const {
        data: [post],
      }: any = await axios.get(`http://localhost:8080/api/post/${category}/${id}`)
      setTitle(post.title)
      setContent(post.text)
      setCate(parseInt(category))
    }
  }

  useEffect(() => {
    getModifyPost()
  }, [])

  const onImgSubmit = async (e: any) => {
    e.preventDefault()

    if (e.target.files) {
      const uploadFile = e.target.files[0]
      const formData = new FormData()
      formData.append('img', uploadFile)

      const {
        data: [fileId],
      } = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/file',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8',
        },
      })
      console.log(fileId)
      setImg([...img, fileId])
    }
  }
  const submitBtn = async () => {
    if (postInfo.state) {
      const {
        state: { category, id },
      }: any = postInfo
      try {
        // console.log(title, content)
        // await axios.put(`http://localhost:8080/api/post/${category}/${id}/1`),
        //   [
        //     {
        //       title,
        //       content,
        //     },
        //   ]

        await fetch(`http://localhost:8080/api/post/${category}/${id}/1`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify([
            {
              title,
              content,
            },
          ]),
        })
        toast.success('게시물이 수정되었습니다.', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_CENTER,
        })
        navigate(`${category}/${id}`)
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const { data } = await axios.post('http://localhost:8080/api/post', [
          {
            category: cate,
            user: 1,
            title,
            content,
          },
        ])
        // console.log('성공')
        // console.log(data)
        if (img.length > 0) {
          await fetch(`http://localhost:8080/api/post/img/${cate}/${data}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              filesKeys: img,
            }),
          })
        }
        console.log('띠용')
        toast.success('게시물이 작성되었습니다.', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_CENTER,
        })
        navigate(`${cate}/${data}`)
      } catch (err: any) {
        console.error(err)
      }
    }
  }
  const onChange1 = (e: any) => {
    setCate(e.target.value)
  }

  const onChange2 = (e: any) => {
    setTitle(e.target.value)
    // setCate(e.target.value)
  }
  const onChange3 = (e: any) => {
    setContent(e.target.value)
    // setCate(e.target.value)
  }

  //랜더링 될 때마다 카테 번호 확인
  // useEffect(() => {
  //   console.log(content)
  // }, [content])
  return (
    <>
      <Layout>
        <div className="communityWriteBoxWrap">
          <div className="communityWriteTop flex justify-between mx-2.5">
            <button type="button" onClick={() => navigate(-1)}>
              <i className="ri-arrow-left-line"></i>
            </button>
            <h2 className="text-base translate-x-2.5">등록 위치 선택</h2>
            <div>
              <select onChange={onChange1}>
                {/* 추후 수정 */}
                <option value={1}>자유</option>
                <option value={2}>자랑</option>
              </select>
            </div>
            <button
              onClick={submitBtn}
              type="button"
              className="px-2.5 bg-black text-white rounded"
            >
              등록
            </button>
          </div>
          <div className="communityWriteContents mt-3.5">
            {/* 제목 */}
            <input
              type="text"
              className="w-full py-3 px-2.5 border-t border-b"
              placeholder="제목을 입력해 주세요"
              value={title}
              id="title"
              onChange={onChange2}
            />
            <div className="m-2.5 h-screen">
              {/* 내용 */}
              <textarea
                className="w-full h-full py-2.5"
                id="content"
                onChange={onChange3}
                value={content}
              />
            </div>
            <div className="attachedFileBtn py-3 border-t">
              <label htmlFor="file">
                <div className="uploadBtn flex items-center justify-center cursor-pointer">
                  <i className="ri-camera-fill text-3xl"></i>
                </div>
              </label>
              <input
                type="file"
                name="avatar"
                id="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={onImgSubmit}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityWrite

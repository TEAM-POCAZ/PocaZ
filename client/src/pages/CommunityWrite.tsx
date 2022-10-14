import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from 'utils/Layout'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

const CommunityWrite = () => {
  // const [content, setContent] = useState({
  //   category: 1,
  //   user: 1,
  //   title: '',
  //   content: '',
  // })
  const navigate = useNavigate()
  const [cate, setCate] = useState(1)
  const postWrap = useRef<HTMLInputElement | null>(null)
  const postWrap2 = useRef<HTMLTextAreaElement | null>(null)

  const submitBtn = async () => {
    try {
      const { data } = await axios.post('https://pocaz.ystoy.shop/api/post', [
        {
          category: cate,
          user: 1,
          title: postWrap.current,
          content: postWrap2.current,
        },
      ])
      // console.log('성공')
      // console.log(data)
      alert('등록 완료!')
      navigate(`${cate}/${data}`)
    } catch (err: any) {
      console.error(err)
    }
    // console.log(postWrap.current)
    // console.log(postWrap2.current)
  }
  // const getValue = (e: any) => {
  //   setContent({
  //     ...content,
  //     [e.target.id]: e.target.value,
  //   })
  // }

  const onChange1 = (e: any) => {
    setCate(e.target.value)
  }
  // const onChange1 = (e: any) => {
  //   cateWrap.current = e.target.value
  //   // setCate(e.target.value)
  // }

  const onChange2 = (e: any) => {
    postWrap.current = e.target.value
    // setCate(e.target.value)
  }
  const onChange3 = (e: any) => {
    postWrap2.current = e.target.value
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
              ref={postWrap}
              id="title"
              onChange={onChange2}
            />
            <div className="m-2.5 h-screen">
              {/* 내용 */}
              <textarea
                className="w-full h-full py-2.5"
                id="content"
                ref={postWrap2}
                onChange={onChange3}
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
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityWrite

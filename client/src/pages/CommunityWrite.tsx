import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from 'utils/Layout'
import 'remixicon/fonts/remixicon.css'

const CommunityWrite = () => {
  return (
    <>
      <Layout>
        <div className="communityDetailBoxWrap">
          <div className="communityDetailTop flex justify-between mx-2.5">
            <button type="button">
              <i className="ri-arrow-left-line"></i>
            </button>
            <h2 className="text-base translate-x-2.5">등록 위치 선택</h2>
            <div>
              <select>
                <option>자유</option>
                <option>자랑</option>
              </select>
            </div>
            <button type="button" className="px-2.5 bg-black text-white rounded">
              등록
            </button>
          </div>
          <div className="communityWriteContents mt-3.5">
            <input
              type="text"
              className="w-full py-3 px-2.5 border-t border-b"
              placeholder="제목을 입력해 주세요"
            />
            <div className="m-2.5 h-screen">
              <textarea className="w-full h-full py-2.5"></textarea>
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

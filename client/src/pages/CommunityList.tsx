import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from 'utils/Layout'

const CommunityList = () => {
  const [list, setList] = useState<any[] | null>(null)
  useEffect(() => {
    const list = async () => {
      try {
        setList(null)
        const response = await axios.get('https://pocaz.ystoy.shop/api/post/1')
        setList(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    list()
  }, [])

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
              <Link to="/Community">작성</Link>
            </button>
          </div>
          <div className="freeBoardSort mt-2.5 border-t border-b">
            <ul className="flex justify-around py-3">
              <li>인기</li>
              <li>최신</li>
            </ul>
          </div>
          <div className="">
            <ul>
              {list &&
                list.map((lists: any) => (
                  <li key={lists.id}>
                    <div className="boardSubject">
                      <p>{lists.title}</p>
                      <div>
                        <div className="writeWrap">
                          <div className="writeProfile">{/* <img src={} /> */}</div>
                          <span className="writeName">{lists.nickname}</span>
                        </div>
                        <time>{lists.createAt}</time>
                        <span className="comment">댓글 {lists.replyCnt}</span>
                        <span className="hit">{lists.viewCount}</span>
                      </div>
                    </div>
                    <div className="boardPhoto">{/* <img src={} /> */}</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityList

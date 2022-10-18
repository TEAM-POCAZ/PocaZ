import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from 'utils/Layout'
import CommunityTop from './CommunityTop'
import SearchBox from '../components/Square/SearchBox'

const CommunityList = () => {
  const [list, setList] = useState<any[] | null>(null)
  const { category } = useParams()
  const [sort, setSort] = useState('recent')
  const navigate = useNavigate()

  useEffect(() => {
    const list = async () => {
      try {
        setList(null)
        const response = await axios.get(`https://pocaz.ystoy.shop/api/post/1/?sortBy=${sort}`)
        setList(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    list()
  }, [sort])

  const recentSort = () => {
    setSort('recent')
  }

  const popularSort = () => {
    setSort('popular')
  }

  return (
    <>
      <Layout>
        <div className="communityListBoxWrap">
          <SearchBox />
          <CommunityTop />
          <div className="freeBoardSort border-b">
            <ul className="flex justify-around text-center cursor-pointer">
              <li onClick={popularSort} className="flex-auto py-3">
                인기
              </li>
              <li onClick={recentSort} className="flex-auto py-3">
                최신
              </li>
            </ul>
          </div>
          <div className="listWrap m-2.5">
            <ul>
              {list &&
                list.map((lists: any, index) => (
                  <li
                    key={lists.id}
                    className="flex py-2.5 border-b cursor-pointer"
                    onClick={() => navigate(`/Community/1/${lists.id}`)}
                  >
                    <div className="boardSubject w-[calc(100% - 100px)]">
                      <p className="mr-1 mb-2.5 truncate">{lists.title}</p>
                      <div>
                        <div className="writeWrap flex items-center">
                          <div className="writeProfile w-10 h-10 rounded-full bg-black mr-2.5"></div>
                          <span className="writeName">{lists.nickname}</span>
                        </div>
                        <time className="text-xs">{lists.createAt}</time>&nbsp;
                        <span className="comment text-xs">댓글 {lists.replyCnt}</span>&nbsp;
                        <span className="hit text-xs">조회수 {lists.viewCount}</span>
                      </div>
                    </div>
                    <div className="boardPhoto w-24 h-24 overflow-hidden">
                      {lists.filePath ? (
                        <img
                          src={lists.filePath}
                          className="w-full min-h-full object-fill border border-gray-100"
                        />
                      ) : null}
                    </div>
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

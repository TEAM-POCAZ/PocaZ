import React, { useState, useEffect } from 'react'
import Layout from '../utils/Layout'
import { useNavigate } from 'react-router-dom'
import CommunityTop from './CommunityTop'
import axios from 'axios'
import SearchBox from '../components/Square/SearchBox'
import dayjs from 'dayjs'

const CommunityBoast = () => {
  const [list, setList] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const boastList = async () => {
      try {
        setList(null)
        const response = await axios.get('http://localhost:8080/api/post/2')
        setList(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    boastList()
  }, [])
  return (
    <>
      <Layout>
        <SearchBox />
        <CommunityTop />
        <div className="boastListWrap">
          <ul>
            {list &&
              list.map((lists) => {
                const days = dayjs(lists.createAt).format('YYYY-MM-DD')
                return (
                  <li
                    key={lists.id}
                    onClick={() => navigate(`/Community/2/${lists.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="boastThumb">
                      <img src={lists.filePath} />
                    </div>
                    <div className="boardSubject">
                      <p>{lists.title}</p>
                      <div>
                        <div className="writeWrap">
                          <div className="writeProfile">{/* <img src={} /> */}</div>
                          <span className="writeName">{lists.nickname}</span>
                        </div>
                        <time className="text-xs">{days}</time>&nbsp;
                        <span className="comment text-xs">댓글 {lists.replyCnt}</span>&nbsp;
                        <span className="hit text-xs">조회 {lists.viewCount}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      </Layout>
    </>
  )
}

export default CommunityBoast

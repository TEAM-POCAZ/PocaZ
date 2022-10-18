import React, { useState, useEffect } from 'react'
import Layout from 'utils/Layout'
import { Link, useNavigate } from 'react-router-dom'
import CommunityTop from './CommunityTop'
import axios from 'axios'
import SearchBox from '../components/Square/SearchBox'

const CommunityBoast = () => {
  const [list, setList] = useState<any[] | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const boastList = async () => {
      try {
        setList(null)
        const response = await axios.get('https://pocaz.ystoy.shop/api/post/2')
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
              list.map((lists: any) => (
                <li key={lists.id} onClick={() => navigate(`/Community/2/${lists.id}`)}>
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
                      <time>{lists.createAt}</time>
                      <span className="comment">댓글 {lists.replyCnt}</span>
                      <span className="hit">{lists.viewCount}</span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Layout>
    </>
  )
}

export default CommunityBoast

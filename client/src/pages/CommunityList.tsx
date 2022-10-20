import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from 'utils/Layout'
import CommunityTop from './CommunityTop'
import SearchBox from '../components/Square/SearchBox'
import dayjs from 'dayjs'
import CommunityListItem from '../components/Square/CommunityListItem'

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
            <CommunityListItem list={list} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CommunityList

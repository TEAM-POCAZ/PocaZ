import React, { useEffect, useState } from 'react'
import Layout from 'utils/Layout'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import CommunityListItem from '../components/Square/CommunityListItem'

const CommunitySearchResult = () => {
  const [list, setList] = useState<any[] | null>(null)
  const navigate = useNavigate()
  const keyInfo = useLocation()

  // useEffect(() => {
  //   if (keyInfo.state) {
  //     const {
  //       state: { keyword },
  //     }: any = keyInfo
  //     axios
  //       .get(`http://localhost:8000/api/post/search/${keyword.split(' ').join('.')}`)
  //       .then((res) => {
  //         const { data }: any = res
  //         setList(data)
  //       }.catch(e) {
  //         console.error(e)
  //       }
  //   }
  // },[])

  return (
    <>
      <Layout>
        <div className="relative flex m-2.5">
          <button type="button" onClick={() => navigate(-1)} className="px-2.5">
            <i className="ri-arrow-left-line"></i>
          </button>
          <input type="text" className="w-full h-11 px-2.5 border rounded text-sm" />
          <button type="button" className="absolute top-0 right-0 h-full px-2.5">
            <i className="ri-search-line"></i>
          </button>
        </div>

        <CommunityListItem list={list} />
      </Layout>
    </>
  )
}

export default CommunitySearchResult

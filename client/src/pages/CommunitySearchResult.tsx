import React from 'react'
import Layout from 'utils/Layout'
import { useNavigate } from 'react-router-dom'

const CommunitySearchResult = () => {
  const navigate = useNavigate()
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
        <ul>
          <li>검색결과가 나오겠쥬</li>
        </ul>
      </Layout>
    </>
  )
}

export default CommunitySearchResult

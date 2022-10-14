import React from 'react'
import { Link } from 'react-router-dom'

const CommunityTop = () => {
  return (
    <>
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
    </>
  )
}

export default CommunityTop

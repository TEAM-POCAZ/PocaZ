import React from 'react'
import { Link } from 'react-router-dom'

const CommunityTop = () => {
  return (
    <>
      <div className="communityTab relative px-2.5 pb-2.5 border-b">
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
          className="absolute top-0 right-2.5 w-12 py-px bg-black text-white rounded"
        >
          <Link to="/Community">작성</Link>
        </button>
      </div>
    </>
  )
}

export default CommunityTop
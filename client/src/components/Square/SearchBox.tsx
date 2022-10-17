import React from 'react'

const SearchBox = () => {
  return (
    <div className="m-2.5">
      <input type="text" className="px-2.5 border text-sm" />
      <button type="button" className="px-2.5 bg-blue-100">
        검색
      </button>
    </div>
  )
}

export default SearchBox

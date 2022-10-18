import React from 'react'

const SearchBox = () => {
  return (
    <div className="relative m-2.5">
      <input type="text" className="w-full h-11 px-2.5 border rounded text-sm" />
      <button type="button" className="absolute top-0 right-0 h-full px-2.5">
        <i className="ri-search-line"></i>
      </button>
    </div>
  )
}

export default SearchBox

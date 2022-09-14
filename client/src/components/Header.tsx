import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  console.log('헤더')
  return (
    <>
      <div className="logo p-3.5">
        <h1 className="italic text-3xl font-extrabold">
          <Link to="/">POCAZ.</Link>
        </h1>
      </div>
    </>
  )
}

export default Header

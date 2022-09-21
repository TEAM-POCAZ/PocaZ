import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const scrollTopBtn = () => {
  const [scrollY, setScrollY] = useState(0)
  const [BtnStatus, setBtnStatus] = useState(false)
  const handleFlow = () => {
    setScrollY(window.pageYOffset)
    if (scrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true)
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false)
    }
  }

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setScrollY(0)
    setBtnStatus(false)
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFlow)
    }
    watch()
    return () => {
      window.removeEventListener('scroll', handleFlow)
    }
  })

  return (
    <>
      <div className="scrollTopBtnWrap sticky bottom-1/4 h-0 cursor-pointer z-50">
        <h3 className={BtnStatus ? 'topBtn active' : 'topBtn'} onClick={handleTop}>
          <i className="ri-arrow-up-s-line flex items-center justify-center h-full text-2xl text-white"></i>
        </h3>
      </div>
    </>
  )
}

export default scrollTopBtn

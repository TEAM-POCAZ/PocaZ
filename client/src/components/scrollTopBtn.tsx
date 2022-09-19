import React, { useEffect, useState } from 'react'

const scrollTopBtn = () => {
  const [scrollY, setScrollY] = useState(0)
  const handleFlow = () => {
    setScrollY(window.pageYOffset)
  }

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setScrollY(0)
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
      <div onClick={handleTop}>
        <h3 className="text-white">스크롤탑</h3>
      </div>
    </>
  )
}

export default scrollTopBtn

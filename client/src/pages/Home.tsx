import React from 'react'
import { useNavigate } from 'react-router-dom'
import Main from './Main'

type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const Home = () => {
  const navigate = useNavigate()

  // const onClickNextPage = (event: btnClickEvent): void => {
  //   event.preventDefault()
  //   navigate('/store')
  // }

  return (
    <div className="bg-black">
      <div className="bg mm:bg-inherit relative w-screen h-screen">
        <div className="txtBox mm:hidden fixed top-2/4 left-1/2 text-center">
          <h2 className="text-white italic text-6xl font-extrabold">POCAZ.</h2>
          <h3 className="mt-3 mb-3 text-blue-900 text-2xl font-light">세상 모든 최애의 포토카드를 찾아 보세요.</h3>
          <h4 className='text-6xl'>😍 🥰 😘</h4>
        </div>
        <Main />
      </div>
    </div>
  )
}

export default Home

import React from 'react'
import { useNavigate } from 'react-router-dom'

type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const Home = () => {
  const navigate = useNavigate()

  const onClickNextPage = (event: btnClickEvent): void => {
    event.preventDefault()
    navigate('/store')
  }

  return (
    <div className="text-3xl font-bold underline text-green-500">
      Hello
      <button
        className="flex justify-center mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-auto"
        onClick={onClickNextPage}
      >
        button
      </button>
      <div>별이님 컴퓨터가문제입니다.</div>
    </div>
  )
}

export default Home

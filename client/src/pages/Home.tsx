import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import GoogleButton from 'components/GoogleButton'
import AppleButton from 'components/AppleButton'
type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const Home = () => {
  const navigate = useNavigate()

  const onClickNextPage = (event: btnClickEvent): void => {
    event.preventDefault()
    navigate('/store')
  }

  return (
    <>
      <Helmet>
        <title>Hello World22</title>
      </Helmet>
      <h1 className="my-custom-style">모르겠고 여기에 로그인 페이지 구현할꺼임22</h1>
      <GoogleButton></GoogleButton>
      <AppleButton></AppleButton>
    </>
  )
}

export default Home

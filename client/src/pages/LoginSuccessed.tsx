import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Google from '../images/google.png'
import { useQuery } from 'react-query'
type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const LoginSuccessed = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  const onClickNextPage = (event: btnClickEvent): void => {
    event.preventDefault()
    navigate('/community')
  }
  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
      })
  }, [])
  return (
    <>
      <Helmet>
        <title>로그인 성공</title>
      </Helmet>
      <button onClick={onClickNextPage}>커뮤니티가기</button>
      <h3>사용자 데이터: {JSON.stringify(userData)}</h3>
    </>
  )
}

export default LoginSuccessed

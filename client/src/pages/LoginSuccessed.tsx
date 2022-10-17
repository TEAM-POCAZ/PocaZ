import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from 'utils/Layout'
type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const LoginSuccessed = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  let API = process.env.REACT_APP_HOST_URL as string
  if (process.env.NODE_ENV !== 'production') {
    API = 'http://localhost:8000'
  }

  const onClickNextPage = (event: btnClickEvent): void => {
    event.preventDefault()
    navigate('/community')
  }
  useEffect(() => {
    fetch(`${API}/api/auth/me`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
      })
  }, [])
  return (
    <>
      <Layout>
        <button onClick={onClickNextPage}>커뮤니티가기</button>
        <h3>사용자 데이터: {JSON.stringify(userData)}</h3>
      </Layout>
    </>
  )
}

export default LoginSuccessed

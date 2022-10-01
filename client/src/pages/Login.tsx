import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Google from '../images/google.png'
import Apple from '../images/apple.png'
import Twitter from '../images/twitter.png'
type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const Login = () => {
  const navigate = useNavigate()

  const onClickNextPage = (event: btnClickEvent): void => {
    event.preventDefault()
    navigate('/community')
  }

  const logout = () => {
    fetch('/api/auth/logout')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
    navigate('/')
  }

  const google = () => {
    window.open('/api/auth/google', '_self')
  }
  const twitter = () => {
    window.open('/api/auth/twitter', '_self')
  }
  const apple = () => {
    window.open('/api/auth/apple', '_self')
  }

  return (
    <>
      <Helmet>
        <title>현재 홈화면을 로그인화면으로 대체했음</title>
      </Helmet>
      <button onClick={onClickNextPage}>커뮤니티가기</button>
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              <img src={Google} alt="" className="icon"></img>
              Google
            </div>
            <div className="loginButton twitter" onClick={twitter}>
              <img src={Twitter} alt="" className="icon"></img>
              twitter
            </div>
            <div className="loginButton apple" onClick={apple}>
              <img src={Apple} alt="" className="icon"></img>
              apple
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="submit">Login</button>
            <button className="submit mt-5" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

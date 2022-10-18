import React from 'react'
import { useNavigate } from 'react-router-dom'
import Google from '../assets/img/google.png'
import Apple from '../assets/img/apple.png'
import Twitter from '../assets/img/twitter.png'
import Layout from 'utils/Layout'
type btnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

const Login = () => {
  const navigate = useNavigate()

  const API = process.env.REACT_APP_HOST_URL as string
  // if (process.env.NODE_ENV !== 'production') {
  //   API = 'http://localhost:8000'
  // }

  const logout = () => {
    fetch(`${API}/api/auth/logout`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
    navigate('/')
  }

  const withdrawal = () => {
    fetch(`${API}/api/auth/withdrawal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        ContentType: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
  }

  const google = () => {
    window.open(`${API}/api/auth/google`, '_self')
  }
  const twitter = () => {
    window.open(`${API}/api/auth/twitter`, '_self')
  }
  const apple = () => {
    window.open(`${API}/api/auth/apple`, '_self')
  }

  return (
    <>
      <Layout>
        <div className="login">
          <h1 className="loginTitle">로그인하기</h1>
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
            <div className="right">
              <button className="submit" onClick={withdrawal}>
                탈퇴하기
              </button>
              <br></br>
              <button className="submit mt-5" onClick={logout}>
                로그아웃하기2
              </button>
              <br></br>
              localhost에서는 구글만 테스트가능<br></br>
              https://pocaz.ystoy.shop/에서는 전부 테스트 가능
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login

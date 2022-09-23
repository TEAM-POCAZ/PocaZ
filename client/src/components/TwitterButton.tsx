import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Helmet } from 'react-helmet-async'

//자바스크립트 라이브러리 썼음. 나중에 REST방식 + passport으로 바꿔야함.

function AppleButton() {
  const [user, setUser] = useState({} as any)

  return (
    <>
      <Helmet></Helmet>
      <a href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=Zl1a2IiUQOXySJC4XSnS3Abl4&redirect_uri=https://slowtest.ml/api/signin-twitter&scope=users.read&state=state&code_challenge=challenge&code_challenge_method=plain">
        twitter signin
      </a>
    </>
  )
}

export default AppleButton

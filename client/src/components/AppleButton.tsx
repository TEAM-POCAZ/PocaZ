import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Helmet } from 'react-helmet-async'

//자바스크립트 라이브러리 썼음. 나중에 REST방식 + passport으로 바꿔야함.

function AppleButton() {
  const [user, setUser] = useState({} as any)
  function handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const userObject: any = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('buttonDiv2')!.hidden = true
  }

  function handleSignOut() {
    setUser({})
    document.getElementById('buttonDiv2')!.hidden = false
  }

  useEffect(() => {
    //애플로 로그인 성공 시.
    document.addEventListener('AppleIDSignInOnSuccess', (data: any) => {
      //handle successful response
      console.log('AppleIDSignInOnSuccess')
      //todo success logic
      console.log(data.detail.authorization)
      console.log(data.detail.authorization.id_token)
      const userObject = jwt_decode(data.detail.authorization.id_token)
      setUser(userObject)
    })
    //애플로 로그인 실패 시.
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
      //handle error.
      console.log('AppleIDSignInOnFailure')
      //todo fail logic
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>애플 버튼의 승리</title>
        <meta name="appleid-signin-client-id" content="service.ml.slowtest" />
        <meta name="appleid-signin-scope" content="name email" />
        <meta name="appleid-signin-redirect-uri" content="https://slowtest.ml/api/signin-apple" />
        <meta name="appleid-signin-state" content="Initial user authentication request" />
        <meta name="appleid-signin-nonce" content="hankhank" />
        <meta name="appleid-signin-use-popup" content="true"></meta>
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></script>
      </Helmet>
      <div id="buttonDiv2"></div>
      {Object.keys(user).length != 0 && (
        <button className="block" onClick={() => handleSignOut()}>
          Apple Sign Out
        </button>
      )}
      <div
        className="block"
        id="appleid-signin"
        data-color="black"
        data-border="true"
        data-type="sign in"
      ></div>
      {user && (
        <div>
          <div>{JSON.stringify(user)}</div>
        </div>
      )}
    </>
  )
}

export default AppleButton

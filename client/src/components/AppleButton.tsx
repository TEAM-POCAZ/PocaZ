import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Helmet } from 'react-helmet-async'

//자바스크립트 라이브러리 썼음. 나중에 REST방식 + passport으로 바꿔야함.

type User = { picture: string; name: string } | Record<string, never>
declare let google: any

function AppleButton() {
  const [user, setUser] = useState({} as User)
  function handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const userObject: User = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('buttonDiv2')!.hidden = true
  }

  function handleSignOut() {
    setUser({})
    document.getElementById('buttonDiv2')!.hidden = false
  }
  return (
    <>
      <Helmet>
        <title>애플 버튼의 승리</title>
        <meta name="appleid-signin-client-id" content="com.pocaz" />
        <meta name="appleid-signin-scope" content="name email" />
        <meta name="appleid-signin-redirect-uri" content="/api/signin-apple" />
        <meta name="appleid-signin-state" content="Initial user authentication request" />
        <meta name="appleid-signin-nonce" content="test123" />
        <meta name="appleid-signin-use-popup" content="true"></meta>
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></script>
      </Helmet>
      <div id="buttonDiv2"></div>
      {Object.keys(user).length != 0 && <button onClick={() => handleSignOut()}>Sign Out</button>}
      <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></div>
      {user && (
        <div>
          <div>{JSON.stringify(user)}</div>
        </div>
      )}
    </>
  )
}

export default AppleButton

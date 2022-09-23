import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Helmet } from 'react-helmet-async'

//자바스크립트 라이브러리 썼음. 나중에 REST방식 + passport으로 바꿔야함.

type User = { picture: string; name: string } | Record<string, never>
declare let google: any

function GoogleButton() {
  const [user, setUser] = useState({} as User)
  function handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const userObject: User = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('buttonDiv')!.hidden = true
  }

  function handleSignOut() {
    setUser({})
    document.getElementById('buttonDiv')!.hidden = false
  }

  useEffect(() => {
    window.addEventListener('load', () => {
      google.accounts.id.initialize({
        client_id: '552100542945-vang57mc6baqmku7l31gpqjol1ijai0i.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      })
      google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' }, // customization attributes
      )
      google.accounts.id.prompt() // also display the One Tap dialog
    })
  }, [])
  return (
    <>
      <Helmet>
        <title>Hello World</title>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Helmet>
      <div id="buttonDiv"></div>
      {Object.keys(user).length != 0 && <button onClick={() => handleSignOut()}>Sign Out</button>}

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          <div>{JSON.stringify(user)}</div>
        </div>
      )}
    </>
  )
}

export default GoogleButton

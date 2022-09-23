import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Community from 'pages/Community'
import { HelmetProvider } from 'react-helmet-async'
import Login from 'pages/Login'
import LoginSuccessed from 'pages/LoginSuccessed'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/community" element={<Community />} />
          <Route path="/loginsuccessed" element={<LoginSuccessed></LoginSuccessed>} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import Community from 'pages/Community'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/store" element={<Community />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App

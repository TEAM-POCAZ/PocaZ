import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import Community from 'pages/Community'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/store" element={<Community />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

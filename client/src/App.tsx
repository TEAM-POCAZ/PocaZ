import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Main from 'pages/Main'
import Community from 'pages/Community'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Community" element={<Community />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

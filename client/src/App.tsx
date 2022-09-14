import React, { Children } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Main from 'pages/Main'
import Community from 'pages/Community'
import Layout from 'pages/Layout'

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

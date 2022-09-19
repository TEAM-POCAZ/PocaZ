import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import Main from 'pages/Main'
import Community from 'pages/Community'
import ChatList from 'pages/ChatList'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/chat/list" element={<ChatList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

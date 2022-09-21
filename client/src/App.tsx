import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import Main from 'pages/Main'
import Community from 'pages/Community'
import ChatMain from 'pages/ChatMain'
import Chat from 'components/chat/Chat'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/chat/list" element={<ChatMain />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

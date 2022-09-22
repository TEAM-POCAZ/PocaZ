import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import Main from 'pages/Main'
import CommunityList from 'pages/CommunityList'
import CommunityDetail from 'pages/CommunityDetail'
import CommunityWrite from 'pages/CommunityWrite'
import ChatMain from 'pages/ChatMain'
import Chat from 'components/chat/Chat'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="CommunityList" element={<CommunityList />} />
          <Route path="CommunityDetail" element={<CommunityDetail />} />
          <Route path="CommunityWrite" element={<CommunityWrite />} />
          <Route path="/chat/list" element={<ChatMain />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

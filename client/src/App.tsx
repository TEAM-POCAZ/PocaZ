import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Main from 'pages/Main'
import CommunityList from 'pages/CommunityList'
import CommunityDetail from 'pages/CommunityDetail'
import CommunityWrite from 'pages/CommunityWrite'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="CommunityList" element={<CommunityList />} />
          <Route path="CommunityDetail" element={<CommunityDetail />} />
          <Route path="CommunityWrite" element={<CommunityWrite />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

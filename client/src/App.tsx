import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Main from 'pages/Main'
import CommunityList from 'pages/CommunityList'
import CommunityDetail from 'pages/CommunityDetail'
import CommunityWrite from 'pages/CommunityWrite'
import CommunityBoast from 'pages/CommunityBoast'
import ChatMain from 'pages/ChatMain'
import Chat from 'components/chat/Chat'

function App({socket}: any) {
  const client = new QueryClient()
  return (
    <>
      <QueryClientProvider client={client}>
        {/* devtools */}
        <ReactQueryDevtools initialIsOpen={true} />
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="CommunityList" element={<CommunityList />} />
            <Route path="CommunityDetail" element={<CommunityDetail />} />
            <Route path="CommunityWrite" element={<CommunityWrite />} />
            <Route path="CommunityBoast" element={<CommunityBoast />} />
            <Route path="/chat/list" element={<ChatMain />} />
            <Route path="/chat" element={<Chat socket={socket} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App

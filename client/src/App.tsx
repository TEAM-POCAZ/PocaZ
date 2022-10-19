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
import CommunitySearchResult from 'pages/CommunitySearchResult'
import ChatMain from 'pages/ChatMain'
import Chat from 'components/chat/Chat'
import Login from 'pages/Login'
import LoginSuccessed from 'pages/LoginSuccessed'
import { toast, ToastContainer } from 'react-toastify'

function App({ socket }: any) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        notifyOnChangeProps: 'tracked',
      },
    },
  })
  return (
    <>
      <QueryClientProvider client={client}>
        {/* devtools */}
        <ReactQueryDevtools initialIsOpen={true} />
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="CommunityList" element={<CommunityList />} />
            <Route path="Community/:category/:id" element={<CommunityDetail />} />
            <Route path="Community/" element={<CommunityWrite />} />
            <Route path="CommunityBoast" element={<CommunityBoast />} />
            <Route path="CommunitySearchResult" element={<CommunitySearchResult />} />
            <Route path="/chat/list" element={<ChatMain />} />
            <Route path="/chat" element={<Chat socket={socket} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginsuccessed" element={<LoginSuccessed></LoginSuccessed>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App

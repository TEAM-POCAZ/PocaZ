import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Socket from './network/socket'

const baseURL: any = process.env.REACT_APP_HOST_URL

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const socketTest = new Socket(baseURL as string)

root.render(<App socket={socketTest} />)

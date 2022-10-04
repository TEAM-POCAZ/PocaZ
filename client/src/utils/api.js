import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'https://pocaz.ystoy.shop/api',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})

export const apis = {
  // get
  getChatList: (id) => api.get(`/chatroom/${id}`), // ChatMain.tsx
  getChat: (roomNumber) => api.get(`/chat/${roomNumber}`), // Chat.tsx
  // post
  postChat: (data) => api.post('/chat', data), //update 시킬 함수 추가
}

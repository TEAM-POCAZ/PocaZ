import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: 'https://slowtest.ml/api',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
});
export const source = axios.CancelToken.source();
export const apis = {
  // get
  getChatList: (roomid) =>
    api.get(`/chatroom/${roomid}`, { cancelToken: source.token }), // ChatMain.tsx

  getChat: (roomNumber) => api.get(`/chat/${roomNumber}`), // Chat.tsx
  getSellItem: (marketItemId) => api.get(`/chat/item/${marketItemId}`),
  getCheckChatRoom: (marketItemId, loginUserId) => {
    api.get(
      `/chat/CheckChatRoom?marketItemId=${marketItemId}&loginUserId=${loginUserId}`
    );
  },
  getMarketDetail: (id) => api.get(`/market/${id}`), // MarketDetail.tsx
  getMarketImgs: (id) => api.get(`/market/img/${id}`), // use in Detail and write
  // post
  postChat: (data) => api.post('/chat', data), //update 시킬 함수 추가

  // market
  MarketSearch: (data) => {
    const { keyword, pageParam, size } = data;

    api.get(`http://localhost:8080/api/market?&keyword=${keyword}
&lastPostId=${pageParam}&SIZE=${size}`);
  },
};

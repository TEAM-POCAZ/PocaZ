import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    // baseURL: 'https://slowtest.ml/api',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
    },
});
export const source = axios.CancelToken.source();
export const apis = {
    // get
    getChatList: (id) =>
        api.get(`/chatroom/${id}`, { cancelToken: source.token }), // ChatMain.tsx
    getChat: (roomNumber) => api.get(`/chat/${roomNumber}`), // Chat.tsx
    getMarketDetail: (id) => api.get(`/market/${id}`), // MarketDetail.tsx

    // post
    postChat: (data) => api.post("/chat", data), //update 시킬 함수 추가
};

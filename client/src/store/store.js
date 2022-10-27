import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set) => ({
    isLogin: false,
    toggleIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),

    count: 1, //state

    increase: () => {
      // count 1만큼 증가
      // set method로 상태 변경 가능
      set((state) => ({ count: state.count + 1 }));
    },

    setCnt: (input) => {
      // 입력받은 input만큼 count 설정
      set({ count: input });
    },

    clearCnt: () => {
      // count 초기화
      set((state) => ({ count: 0 }));
    },

    userInfo: { nickName: 1 }, //state

    setUserInfo: (input) => {
      set({ userInfo: input });
    },

    newMsg: {}, //state

    setNewMsg: (msg) => {
      set({ newMsg: msg });
    },
  }))
);

// redux devtools 사용하기
// const useStore = create(devtools(myStore));

export default useStore;

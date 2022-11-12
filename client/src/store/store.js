import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// TODO store 분리
export const useStore = create(
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

    setUserInfo: (input) => {},
  }))
);

const useLoginStore = create(
  devtools(
    persist(
      (set, get) => ({
        userInfo: null, //state
        setUserInfo: (input) => set({ userInfo: input }),
      }),
      {
        name: 'login-storage', // name of item in the storage (must be unique)
        getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
      }
    )
  )
);

// redux devtools 사용하기
// const useStore = create(devtools(myStore));

export { useLoginStore };

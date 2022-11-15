import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';

let timer;

const useScrollTopBtn = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const handleFlow = (e) => {
    // console.log(e.deltaY)
    timer && clearTimeout(timer);
    setBtnStatus(true);
    timer = setTimeout(() => setBtnStatus(false), 500);
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('mousewheel', handleFlow);
    };
    watch();
    return () => {
      window.removeEventListener('mousewheel', handleFlow);
    };
  }, []);

  return (
    <>
      <div className='scrollTopBtnWrap sticky bottom-1/4 h-0 cursor-pointer z-50'>
        <h3
          className={btnStatus ? 'topBtn active' : 'topBtn invisible'}
          onClick={handleTop}
        >
          <i className='ri-arrow-up-s-line flex items-center justify-center h-full text-2xl text-white'></i>
        </h3>
      </div>
    </>
  );
};

export default useScrollTopBtn;

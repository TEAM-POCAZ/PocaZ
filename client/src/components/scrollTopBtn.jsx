import { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';

let timer;

const useScrollTopBtn = () => {
  const [btnStatus, setBtnStatus] = useState(false);
  const handleFlow = () => {
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
      window.addEventListener('scroll', handleFlow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFlow);
    };
  }, []);

  return (
    <>
      <div className='scrollTopBtnWrap sticky bottom-1/4 h-0 cursor-pointer z-50'>
        <h3 className={btnStatus ? 'topBtn active' : 'topBtn invisible'}>
          <button
            className='flex items-center justify-center w-full h-full text-2xl'
            onClick={handleTop}
          >
            <i className='ri-arrow-up-s-line text-white'></i>
          </button>
        </h3>
      </div>
    </>
  );
};

export default useScrollTopBtn;

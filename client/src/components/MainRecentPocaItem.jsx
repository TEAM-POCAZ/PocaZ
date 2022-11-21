import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { useQuery } from 'react-query';
import { baseURL } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const MainPocaRecentItem = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('poca', () =>
    axios.get(`${baseURL}/market/`).then((a) => a.data.sellList)
  );

  return (
    <>
      <Swiper slidesPerView={2.4} spaceBetween={14} className=''>
        {isLoading
          ? 'loading'
          : isError
          ? 'error'
          : data
          ? data.map((pocas) => (
              <SwiperSlide key={pocas.id}>
                <button
                  onClick={() => navigate(`/Market/${pocas.id}`)}
                  className='cursor-pointer w-full'
                >
                  <div className='pocaThumb relative h-72 lg:h-96 mm:h-60 rounded-xl overflow-hidden'>
                    <img
                      src={`${baseURL}/${pocas.filePath}`}
                      crossOrigin={'anonymous'}
                      className='w-full h-full object-cover'
                      alt='장터 업로드 이미지'
                    />
                  </div>
                  <div className='pocaListWrap mt-1 text-xs text-left'>
                    <p className='groupName font-extrabold'>
                      {pocas.groupName}
                    </p>
                    <p className='memberName text-sm'>{pocas.stageName}</p>
                    {/* <p className='pocaDetail text-base'>{pocas.pocaName}</p> */}
                    <p className='pocaDesc mb-1 text-gray-500'>
                      {pocas.pocaName}
                    </p>
                    <p className='pocaPrice font-medium text-base'>
                      <span>{pocas.price.toLocaleString()}</span>
                      <span className='won'>원</span>
                    </p>
                  </div>
                </button>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </>
  );
};

export default MainPocaRecentItem;

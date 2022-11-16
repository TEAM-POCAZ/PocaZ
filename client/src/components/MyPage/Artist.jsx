import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
const API = import.meta.env.VITE_HOST_URL;

const Artist = ({ artistId }) => {
  const [axiosError, setAxiosError] = useState(null);

  const { isLoading, data, isError, error } = useQuery(
    ['artist', artistId],
    () => {
      return axios.get(`${API}/api/artist/${artistId}`);
    },
    {
      retry: false,
      enabled: !!artistId,
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          setAxiosError(axiosError);
        } else {
          console.log('unexpected error: ', err.response.data.error);
        }
      },
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div>{axiosError}</div>
      <div className='flex items-center justify-between mb-10'>
        <h3 className='font-bold text-lg'>내가 선택한 최애 아이돌 🥰</h3>
        <p className='text-rose-300 font-semibold'>
          {data?.data?.stageName} 🖤
        </p>
      </div>
      {/* <div>실명: {data?.data?.realName}</div> */}
    </>
  );
};

export default Artist;

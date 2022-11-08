import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
const API = import.meta.env.VITE_HOST_URL;

const Artist = ({ artistId }) => {
  const [axiosError, setAxiosError] = useState(null);

  const { isLoading, data, isError, error } = useQuery(
    ["artist", artistId],
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
          console.log("unexpected error: ", err.response.data.error);
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
      <div>선택된 아티스트</div>
      <div>예명: {data?.data?.stageName}</div>
      <div>실명: {data?.data?.realName}</div>
    </>
  );
};

export default Artist;

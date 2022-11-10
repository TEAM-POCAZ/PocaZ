import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
const API = import.meta.env.VITE_HOST_URL;

const Artists = ({ setArtistId }) => {
  const [axiosError, setAxiosError] = useState(null);

  const { isLoading, data, isError, error } = useQuery(
    ["artists"],
    () => {
      return axios.get(`${API}/api/artist`);
    },
    {
      retry: false,
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
      <div>아티스트 목록</div>
      {data?.data.map((artist) => {
        return (
          <li
            key={artist.id}
            id={artist.id}
            onClick={(e) => {
              setArtistId(e.currentTarget.id);
            }}
            className="py-4 list-none"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full" src={artist.id} alt="" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {artist.stageName}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {"본명 " + artist.realName}
                </p>
              </div>
              <div>
                <a
                  href="#"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  View
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Artists;

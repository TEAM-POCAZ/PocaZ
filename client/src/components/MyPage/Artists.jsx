import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_HOST_URL;

const Artists = ({ setArtistId }) => {
  const navigate = useNavigate();
  const [axiosError, setAxiosError] = useState(null);
  const { isLoading, data, isError, error } = useQuery(
    ['artists'],
    () => {
      return axios.get(`${API}/api/artist`);
    },
    {
      retry: false,
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
      <div>아티스트 목록</div>
      {/* {data?.data.map((artist) => {
        return (
          <li
            key={artist.id}
            id={artist.id}
            onClick={(e) => {
              setArtistId(e.currentTarget.id);
            }}
            className='py-4 list-none'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex-shrink-0'>
                <img className='h-8 w-8 rounded-full' src={artist.id} alt='' />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-gray-900'>
                  {artist.stageName}
                </p>
                <p className='truncate text-sm text-gray-500'>
                  {'본명 ' + artist.realName}
                </p>
              </div>
              <div>
                <a
                  href='#'
                  className='inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50'
                >
                  View
                </a>
              </div>
            </div>
          </li>
        );
      })} */}
      <div className='mx-3.5'>
        <ul className='flex flex-row flex-wrap justify-between'>
          {data?.data.map((artist) => (
            <li
              className='flex-[0_1_48%] mb-3.5 cursor-pointer'
              key={artist.id}
              onClick={() => {
                setArtistId(artist.id);
              }}
            >
              <div className='pocaThumb relative h-72 lg:h-96 mm:h-60 rounded-xl overflow-hidden'>
                <img
                  src={imgList[artist.id - 1]}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='pocaListBox mt-2.5 p-3.5 rounded-xl bg-white text-xs box-border'>
                <p className='groupName font-extrabold text-sm text-[#034ac5]'>
                  {artist.groupName}✨
                </p>
                <p className='memberName text-sm'>{artist.stageName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Artists;

const imgList = [
  'https://media.discordapp.net/attachments/1039076920492560445/1039083845749833758/opal_.jpeg?width=392&height=625',
  'https://media.discordapp.net/attachments/1039076920492560445/1039083845368164473/onyx_.jpeg?width=392&height=624',
  'https://media.discordapp.net/attachments/1039076920492560445/1039083845183602708/3a7400014db9a07e.jpeg?width=410&height=625',
  'https://media.discordapp.net/attachments/1039076920492560445/1039096240689922078/unknown.png?width=404&height=625',
  'https://media.discordapp.net/attachments/1039076920492560445/1039095965136728074/unknown.png?width=396&height=625',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039444731748417536/78fc132866859579.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039446046343974962/MAVERICK_ID_CARD.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039114044776398849/5d48b14015d6f01c.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039109178003828766/DMC.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039116123939020840/MAVERICK_ID_CARD.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039449683053006870/b8cd2436421d8f75.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039436843088891914/a232d8ad2cdea6ef.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039426187157590026/EWalceTU8AACh4A.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039441877801385994/cb9f89e447a2d135.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039429072033419294/42.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039450384395145276/03bd3bac9b38bf26.jpeg',
  'https://media.discordapp.net/attachments/1039076920492560445/1039205605967143015/B_.jpg?width=389&height=583',
  'https://media.discordapp.net/attachments/1039076920492560445/1039205604767576165/B_4.jpg?width=389&height=583',
  'https://media.discordapp.net/attachments/1039076920492560445/1039205605728063599/B_.jpg?width=389&height=583',
  'https://media.discordapp.net/attachments/1039076920492560445/1039205603500888074/B_2.jpg?width=389&height=583',
  'https://media.discordapp.net/attachments/1039076920492560445/1039205604071313469/B_2.jpg?width=389&height=583',
  'https://media.discordapp.net/attachments/1039076920492560445/1039443766328688670/Karina-SSGT2022-AppleMusic.jpg?width=364&height=605',
  'https://media.discordapp.net/attachments/1039076920492560445/1039477328671154266/Giselle-savage_p.o.s_ver-ar_clip_cardjpg.jpg?width=404&height=606',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1039450056702570559/Winter-savage__Photocard_.jpg',
  'https://media.discordapp.net/attachments/1039076920492560445/1039471425985191946/Zizel-Girls_Mumo.jpg?width=385&height=606',
  'https://media.discordapp.net/attachments/1039076920492560445/1042698675471798352/unknown.png',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1042698341751988244/DpnK3xIV4AA_REP.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1040164437090369586/313f4dc2cb1e1525.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1040166033220173864/5db3310ba5d868db.jpeg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041153732391473193/nctpt1.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041154864429928499/nctpt2.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041155082475032677/nctpt2.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041156059542335608/nctarri.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041154337377878086/nctpt2.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041149672183582800/nctdream.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041153990622183484/nctpt1.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041152769177952326/nctRESONANCE.jpg',
  'https://cdn.discordapp.com/attachments/1039076920492560445/1041153369143791697/nctpt1.jpg',
];

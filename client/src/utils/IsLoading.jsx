import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';

export const IsLoading = ({ needLogin = null }) => (
  <div className='flex flex-col justify-center items-center h-[75vh] '>
    <PacmanLoader color='#034ac5' size='15px' />
    {needLogin ? (
      <>
        <p className='m-5'>{needLogin}</p>
        <Link
          className='border bg-main p-2 rounded-3xl text-white'
          to={'/login'}
        >
          Login
        </Link>
      </>
    ) : null}
  </div>
);

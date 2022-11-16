import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from '../utils/Layout';
import CommunityTop from './CommunityTop';
import SearchBox from '../components/Community/SearchBox';
import CommunityListItem from '../components/Community/CommunityListItem';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useLoginStore } from '../store/store';
import { baseURL } from '../utils/api';
import { IsLoading } from '../utils/IsLoading';

const NUMBER_OF_POSTS_ON_PAGE = 20;

const CommunityList = () => {
  const { userInfo } = useLoginStore();
  const { ref, inView } = useInView();
  const [sort, setSort] = useState('recent');

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['projects', sort],
    async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
      const res = await axios.get(
        `${baseURL}/post/1?sortBy=${sort}&lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  const recentSort = () => {
    setSort('recent');
  };

  const popularSort = () => {
    setSort('popular');
  };

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  return (
    <>
      <Layout>
        <div className='communityListBoxWrap min-h-[89vh]'>
          <SearchBox />
          <CommunityTop category={1} isLogin={userInfo?.id} />
          <div className='freeBoardSort border-b'>
            <ul className='flex justify-around text-center cursor-pointer'>
              <li className='flex-auto py-3'>
                <button onClick={popularSort}>인기</button>
              </li>
              <li className='flex-auto py-3'>
                <button onClick={recentSort}>최신</button>
              </li>
            </ul>
          </div>
          {status === 'loading' ? (
            <IsLoading />
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div className='listWrap m-2.5'>
                <CommunityListItem list={data} />
              </div>
              <div className='flex items-center justify-center'>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : '더 이상 불러올 게시글이 없습니다.'}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage
                  ? 'Background Updating...'
                  : null}
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default CommunityList;

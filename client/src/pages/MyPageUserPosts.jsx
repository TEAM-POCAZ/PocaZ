import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../utils/Layout';
import { Link, useLocation } from 'react-router-dom';

import CommunityTop from './CommunityTop';
import SearchBox from '../components/Community/SearchBox';
import MarketSearchBox from '../components/Market/MarketSearchBox';
import MarketCategory from '../components/Market/MarketCategory';
import MarketListItem from '../components/Market/MarketListItem';
import CommunityListItem from '../components/Community/CommunityListItem';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useLoginStore } from '../store/store';
import { baseURL } from '../utils/api';

const NUMBER_OF_POSTS_ON_PAGE = 20;

const MyPageUserPosts = () => {
  const { userInfo } = useLoginStore();
  const { ref, inView } = useInView();
  const { ref2, inView2 } = useInView();
  const [sort, setSort] = useState('recent');
  const [group, setGroup] = useState(0);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    // isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    // hasPreviousPage,
  } = useInfiniteQuery(
    ['userPosts', sort],
    async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
      const res = await axios.get(
        `${baseURL}/post/1?userId=${userInfo.id}&sortBy=${sort}&lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  const {
    status: status2,
    data: data2,
    error: error2,
    isFetching: isFetching2,
    isFetchingNextPage: isFetchingNextPage2,
    // isFetchingPreviousPage,
    fetchNextPage: fetchNextPage2,
    // fetchPreviousPage,
    hasNextPage: hasNextPage2,
  } = useInfiniteQuery(
    ['userposts', group],
    async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
      const res = await axios.get(
        `${baseURL}/market?userId=${
          userInfo.id
        }&lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}${
          group ? '&group=' + group : ''
        }`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );
  useEffect(() => {
    inView && fetchNextPage2();
  }, [inView]);

  const recentSort = () => {
    setSort('recent');
  };

  const popularSort = () => {
    setSort('popular');
  };

  useEffect(() => {
    inView2 && fetchNextPage();
  }, [inView2]);

  return (
    <>
      <Layout>
        <div className='communityListBoxWrap'>
          <div className='font-bold text-lg'>커뮤니티 게시글</div>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div className='listWrap m-2.5'>
                <CommunityListItem list={data} />
              </div>
              <div>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : ''}
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
        <div>
          <div className='font-bold text-lg'>장터 게시글</div>
          {status2 === 'loading' ? (
            <p>Loading...</p>
          ) : status2 === 'error' ? (
            <span>Error: {error2.message}</span>
          ) : (
            <>
              <MarketListItem list={data2} />

              <div>
                <button
                  ref={ref2}
                  onClick={() => fetchNextPage2()}
                  disabled={!hasNextPage2 || isFetchingNextPage2}
                >
                  {isFetchingNextPage2
                    ? 'Loading more...'
                    : hasNextPage2
                    ? 'Load Newer'
                    : ''}
                </button>
              </div>
              <div>
                {isFetching2 && !isFetchingNextPage2
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

export default MyPageUserPosts;

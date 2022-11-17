import React, { useEffect } from 'react';
import Layout from '../utils/Layout';
import { useNavigate } from 'react-router-dom';
import CommunityTop from './CommunityTop';
import axios from 'axios';
import SearchBox from '../components/Community/SearchBox';
import dayjs from 'dayjs';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useLoginStore } from '../store/store';
import { baseURL } from '../utils/api';

const NUMBER_OF_POSTS_ON_PAGE = 10;

const CommunityBoast = () => {
  const { userInfo } = useLoginStore();
  const { ref, inView } = useInView();
  const navigate = useNavigate();
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
    ['projects'],
    async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
      const res = await axios.get(
        `${baseURL}/post/2?sortBy=recent&lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}`
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  return (
    <>
      <Layout>
        <SearchBox />
        <CommunityTop category={2} isLogin={userInfo?.id} />
        <div className='boastListWrap m-2.5 cursor-pointer'>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              {data?.pages?.map((page) => (
                <React.Fragment key={page.nextId}>
                  {page.postList.map((lists) => {
                    const days = dayjs(lists.createAt).format('YYYY-MM-DD');
                    return (
                      <button
                        key={lists.id}
                        onClick={() => navigate(`/Community/2/${lists.id}`)}
                        className='cursor-pointer'
                      >
                        <div className='boastThumb rounded-lg overflow-hidden'>
                          <img
                            src={`${baseURL}/${lists.filePath}`}
                            alt={lists.filePath}
                            crossOrigin='anonymous'
                          />
                        </div>
                        <div className='boardSubject mt-1 text-left'>
                          <p className='font-medium'>{lists.title}</p>
                          <div>
                            <div className='writeWrap'>
                              <div className='writeProfile'>
                                {/* <img src={} /> */}
                              </div>
                              <span className='writeName'>
                                {lists.nickname}
                              </span>
                            </div>
                            <time className='text-xs'>{days}</time>&nbsp;
                            <span className='comment text-xs'>
                              댓글 {lists.replyCnt}
                            </span>
                            &nbsp;
                            <span className='hit text-xs'>
                              조회 {lists.viewCount}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className='flex justify-center items-center w-full'
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load Newer'
              : '더 이상 불러올 게시글이 없습니다.'}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
        </div>
      </Layout>
    </>
  );
};

export default CommunityBoast;

import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../utils/Layout";
import CommunityTop from "./CommunityTop";
import SearchBox from "../components/Community/SearchBox";
import CommunityListItem from "../components/Community/CommunityListItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";


const NUMBER_OF_POSTS_ON_PAGE = 20;

const CommunityList = () => {
  const {ref, inView} = useInView();
  const [sort, setSort] = useState("recent");

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
    ['projects', sort],
    async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
      const res = await axios.get(
        `http://localhost:8080/api/post/1?sortBy=${sort}&lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}`
        )
        return res.data
      },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    },
  )

  const recentSort = () => {
    setSort("recent");
  };

  const popularSort = () => {
    setSort("popular");
  };
  
  useEffect(() => {
    inView && fetchNextPage()
  }, [inView])

  return (
    <>
      <Layout>
        <div className="communityListBoxWrap">
          <SearchBox />
          <CommunityTop category={1} />
          <div className="freeBoardSort border-b">
            <ul className="flex justify-around text-center cursor-pointer">
              <li onClick={popularSort} className="flex-auto py-3">
                인기
              </li>
              <li onClick={recentSort} className="flex-auto py-3">
                최신
              </li>
            </ul>
          </div>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) :
          (
          <>
            <div className="listWrap m-2.5">
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
                  : 'Nothing more to load'}
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

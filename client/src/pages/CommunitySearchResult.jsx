import React, { useEffect, useState } from "react";
import Layout from "../utils/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CommunityListItem from "../components/Community/CommunityListItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const NUMBER_OF_POSTS_ON_PAGE = 20;

const CommunitySearchResult = () => {
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const keyInfo = useLocation();

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
    ["projects"],
    async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
      // console.log(keyInfo)
      if (keyInfo.state) {
        const {
          state: { keyword },
        } = keyInfo;
        const res = await axios.get(
          `http://localhost:8080/api/post/search/?keyword=${keyword
            .split(" ")
            .join(".")}&lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}`
        );
        return res.data;
      }
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
        <div className="relative flex m-2.5">
          <button type="button" onClick={() => navigate(-1)} className="px-2.5">
            <i className="ri-arrow-left-line"></i>
          </button>
          <input
            type="text"
            className="w-full h-11 px-2.5 border rounded text-sm"
          />
          <button
            type="button"
            className="absolute top-0 right-0 h-full px-2.5"
          >
            <i className="ri-search-line"></i>
          </button>
        </div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div className="mx-2.5">
              {data?.pages?.length > 0 ? (
                <CommunityListItem list={data} />
              ) : (
                <div>검색 안되지롱</div>
              )}
              <div>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load Newer"
                    : "Nothing more to load"}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage
                  ? "Background Updating..."
                  : null}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default CommunitySearchResult;

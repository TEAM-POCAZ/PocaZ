import React, { useState, useEffect } from "react";
import Layout from "../utils/Layout";
import MarketSearchBox from "../components/Market/MarketSearchBox";
import MarketCategory from "../components/Market/MarketCategory";
import MarketListItem from "../components/Market/MarketListItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const NUMBER_OF_POSTS_ON_PAGE = 10;

const MarketList = () => {
    const location = useLocation();
    const { ref, inView } = useInView();
    const [group, setGroup] = useState(0);

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ["projects", group],
        async ({ pageParam = Number.MAX_SAFE_INTEGER }) => {
            const res = await axios.get(
                `http://localhost:8080/api/market?lastPostId=${pageParam}&SIZE=${NUMBER_OF_POSTS_ON_PAGE}${
                    group ? "&group=" + group : null
                }`
            );
            return res.data;
        },
        {
            getPreviousPageParam: (firstPage) =>
                firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        }
    );
    useEffect(() => {
        inView && fetchNextPage();
    }, [inView]);

    return (
        <>
            <Layout>
                <div className="flex items-center">
                    <MarketSearchBox />
                    <button
                        type="button"
                        className="min-w-[50px] w-[50px] h-[50px] m-2.5 bg-black rounded-full text-white text-sm"
                    >
                        <Link
                            to="/MarketWrite"
                            className="flex items-center justify-center h-full"
                        >
                            <i className="ri-pencil-line text-base"></i>
                        </Link>
                    </button>
                </div>
                <MarketCategory setGroup={setGroup} />

                {status === "loading" ? (
                    <p>Loading...</p>
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <MarketListItem list={data} />

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
                    </>
                )}
            </Layout>
        </>
    );
};

export default MarketList;

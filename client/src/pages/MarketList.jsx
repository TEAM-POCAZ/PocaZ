import React from "react";
import Layout from "../utils/Layout";
import SearchBox from "../components/Square/SearchBox";
import MarketCategory from "../components/Market/MarketCategory";
import MarketListItem from "../components/Market/MarketListItem";

const MarketList = () => {
  return (
    <>
      <Layout>
        <SearchBox />
        {/* 커뮤니티 검색창 임시 넣어 놓음요 */}
        <MarketCategory />
        <MarketListItem />
      </Layout>
    </>
  );
};

export default MarketList;

import React from "react";
import Layout from "../utils/Layout";
import MarketSearchBox from "../components/Market/MarketSearchBox";
import MarketCategory from "../components/Market/MarketCategory";
import MarketListItem from "../components/Market/MarketListItem";

const MarketList = () => {
  return (
    <>
      <Layout>
        <MarketSearchBox />
        <MarketCategory />
        <MarketListItem />
      </Layout>
    </>
  );
};

export default MarketList;

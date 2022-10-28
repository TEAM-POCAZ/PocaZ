import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const MarketListItem = () => {
  const result = useQuery("pocas", () =>
    axios.get("http://localhost:8080/api/market").then((a) => {
      return a.data;
    })
  );
  return (
    <>
      <div className="mx-3.5">
        <ul className="flex flex-row flex-wrap justify-between">
          {result.data &&
            result.data.map((poca) => (
              <li className="flex-[0_1_48%] mb-3.5" key={poca.id}>
                <div className="pocaThumb relative h-72 lg:h-96 mm:h-60 rounded-xl overflow-hidden">
                  <img
                    src={poca.pocaImg}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pocaListWrap mt-1 text-xs">
                  <p className="groupName font-extrabold">{poca.groupName}</p>
                  <p className="memberName text-sm">{poca.stageName}</p>
                  <p className="pocaDetail text-base">{poca.pocaName}</p>
                  <p className="pocaDesc mb-1 text-gray-500">
                    {poca.description}
                  </p>
                  <p className="pocaPrice font-medium text-base">
                    <span>{poca.price}</span>
                    <span className="won">원</span>
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default MarketListItem;

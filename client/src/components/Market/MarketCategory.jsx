import React from "react";

const IdolCateList = [
  { id: 0, title: "전체" },
  { id: 1, title: "더보이즈" },
  { id: 2, title: "엔시티" },
  { id: 3, title: "뉴진스" },
  { id: 4, title: "에스파" },
  { id: 5, title: "아이브" },
  { id: 6, title: "르세라핌" },
];
const MarketCategory = () => {
  return (
    <>
      <div className="bg-white h-7 mb-1">
        <ul className="flex items-center justify-around h-full">
          {IdolCateList.map((cate) => {
            return (
              <li key={cate.id}>
                <p className="text-xs cursor-pointer text-slate-600 hover:text-blue-700">
                  {cate.title}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default MarketCategory;

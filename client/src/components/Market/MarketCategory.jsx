import React from "react";

const IdolCateList = [
  { id: 0, title: "전체" },
  { id: 1, title: "에스파" },
  { id: 2, title: "소녀시대" },
  { id: 3, title: "뉴진스" },
];
const MarketCategory = ({setGroup}) => {
  return (
    <>
      <div className="bg-white h-7 mb-1">
        <ul className="flex items-center justify-around h-full">
          {IdolCateList.map((cate) => {
            return (
              <li key={cate.id} onClick={()=>setGroup(cate.id)}>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MarketSearchBox = (props) => {
  // const searchSubmit = () => {}
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSearch = () => {
    try {
      if (!keyword) {
        toast.error("안나와요");
        return;
      }
      navigate("/CommunitySearchResult", { state: { keyword } });
    } catch (err) {
      alert(err);
      return;
    }
  };
  return (
    <div className="flex items-center">
      <div className="relative w-full m-2.5">
        <input
          type="text"
          onChange={onKeywordChange}
          className="w-full h-11 px-2.5 border rounded text-sm"
          placeholder="멤버명, 종류 ex) 더보이즈 큐"
        />
        <button
          type="button"
          onClick={onSearch}
          className="absolute top-0 right-0 h-full px-2.5"
        >
          <i className="ri-search-line"></i>
        </button>
      </div>
      <button
        type="button"
        className="min-w-[50px] w-[50px] h-[50px] h-12 m-2.5 bg-black rounded-full text-white text-sm"
      >
        <Link
          to="/MarketWrite"
          className="flex items-center justify-center h-full"
        >
          <i className="ri-pencil-line text-base"></i>
        </Link>
      </button>
    </div>
  );
};

export default MarketSearchBox;

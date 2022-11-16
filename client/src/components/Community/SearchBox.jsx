import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchBox = (props) => {
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
    <div className="relative m-2.5">
      <input
        type="text"
        onChange={onKeywordChange}
        className="w-full h-11 px-2.5 border rounded text-sm"
      />
      <button
        type="button"
        onClick={onSearch}
        className="absolute top-0 right-0 h-full px-2.5"
      >
        <i className="ri-search-line"></i>
      </button>
    </div>
  );
};

export default SearchBox;

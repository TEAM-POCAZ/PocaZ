import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MarketSearchBox = (props) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const onKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // const searchSubmit = (e) => {

  // };
  const onSearch = (e) => {
    e.preventDefault();
    // console.log("hello");
    try {
      if (!searchKeyword) {
        toast.error('내용을 입력해주세요.');
        return;
      }
      navigate('/Market/search', { state: { searchKeyword } });
    } catch (err) {
      toast.error('다시 시도해주세요.');
      return;
    }
  };
  return (
    <form onSubmit={onSearch} className='relative w-full m-2.5'>
      <input
        type='text'
        onChange={onKeywordChange}
        className='w-full h-11 px-2.5 border rounded text-sm'
        placeholder='멤버명, 그룹 ex) 더보이즈 큐'
      />
      <button
        type='button'
        onClick={onSearch}
        className='absolute top-0 right-0 h-full px-2.5'
      >
        <i className='ri-search-line'></i>
      </button>
    </form>
  );
};

export default MarketSearchBox;

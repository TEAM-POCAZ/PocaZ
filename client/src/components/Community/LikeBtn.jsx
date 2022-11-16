const LikeBtn = ({ like, onClick, cnt }) => {
  return (
    <div className='likeBtn flex items-center justify-center py-5'>
      <button
        onClick={onClick}
        className={`border-2 p-2 pl-5 pr-5 rounded-xl ${
          like ? 'ri-heart-fill border-blue-700' : 'ri-heart-line'
        }`}
      >
        좋아요 ({cnt + (like ? 1 : 0)})
      </button>
    </div>
  );
};

export default LikeBtn;

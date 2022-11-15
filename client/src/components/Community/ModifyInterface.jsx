const ModifyInterface = ({ setToggle, modifyAction, deleteAction }) => {
  return (
    <>
      <button
        className='fixed flex items-end justify-center bg-black bg-opacity-20 border w-[480px] h-[95%] top-0 z-100'
        onClick={() => setToggle(false)}
      >
        <div className='flex flex-col items-center justify-center w-[inherit]'>
          <button
            className='bg-white w-[inherit] p-5 border-b-blue-700 border-2 text-xl'
            onClick={modifyAction}
          >
            수정
            <br />
            <span className='text-sm'>
              이미 작성한 {'글'}의 내용을 수정해 보세요. 📝
            </span>
          </button>
          <button
            className='bg-white w-[inherit] p-5 border-t-blue-700 border-2 text-xl'
            onClick={deleteAction}
          >
            삭제
            <br />
            <span className='text-sm'>현재 보고 있는 {'글'}을 삭제해요.❤️‍🔥</span>
          </button>
        </div>
      </button>
    </>
  );
};

export default ModifyInterface;

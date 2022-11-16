// eslint-disable-next-line no-unused-vars
import { ReactElement } from 'react';
/**
 * 토글 버튼 클릭시 화면에 출력되는 수정, 삭제 등 기타 옵션 창
 * @param {Object} Props
 * @param {Function} Props.setToggle: 실행 시 토글 상태를 변화하는 함수
 * @param {Function} Props.modifyAction: 수정 함수
 * @param {Function} Props.deleteAction: 삭제 함수
 * @param {boolean} Props.isWrite: 글 작성 화면/ 상세 화면 구분 옵션
 * @returns {ReactElement} 옵션 선택 창
 */
const ModifyInterface = ({
  setToggle,
  modifyAction,
  deleteAction,
  isWrite,
}) => {
  return (
    <>
      <button
        className='fixed flex items-end justify-center bg-black bg-opacity-20 border w-[480px] h-[95%] top-0 z-100'
        onClick={() => setToggle(false)}
      >
        <div className='flex flex-col items-center justify-center w-[inherit]'>
          <button
            className='bg-white hover:bg-slate-300 w-[inherit] p-5 border-b-blue-700 border-2'
            onClick={() => modifyAction(1)}
          >
            {isWrite ? (
              <span className='text-sm'>
                <span className='text-xl'>자유</span>
                <br />
                자유로운 주제로 글을 작성해 보세요. 📝
              </span>
            ) : (
              <span className='text-sm'>
                <span className='text-xl'>수정</span>
                <br />
                이미 작성한 {'글'}의 내용을 수정해 보세요. 📝
              </span>
            )}
          </button>
          <button
            className='bg-white hover:bg-slate-300 w-[inherit] p-5 border-t-blue-700 border-2 text-xl'
            onClick={isWrite ? () => modifyAction(2) : deleteAction}
          >
            {isWrite ? (
              <span className='text-sm'>
                <span className='text-xl'>자랑</span>
                <br />
                자신의 포카를 자랑해 보세요. ❤️‍🔥
              </span>
            ) : (
              <span className='text-sm'>
                <span className='text-xl'>삭제</span>
                <br />
                현재 보고 있는 {'글'}을 삭제해요.❤️‍🔥
              </span>
            )}
          </button>
        </div>
      </button>
    </>
  );
};

export default ModifyInterface;

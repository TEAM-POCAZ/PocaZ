import React, { useRef } from "react";

const InputMsg = ({ handleMessage }) => {
  const inputRef = useRef(null);
  return (
    <div className="flex justify-end w-full h-30">
      <form action="" className="flex ml-5 rounded-full">
        <input
          type="text"
          placeholder="메세지를 입력하세요"
          ref={inputRef}
          className="mr-3 text-base placeholder:text-sm placeholder:truncate placeholder:text-slate-400"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(
              "inputRef.current?.value :>> ",
              inputRef.current?.value
            );
            handleMessage(inputRef.current?.value);

            if (inputRef.current?.value) {
              inputRef.current.value = "";
            }
          }}
        >
          <i
            className={
              " ri-send-plane-2-fill pl-10 pr-7" +
              `${inputRef.current?.value} ? "text-grey-100": "text-red-300`
            }
          ></i>
        </button>
      </form>
    </div>
  );
};

export default InputMsg;

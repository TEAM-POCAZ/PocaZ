import React, { useRef } from "react";

const InputMsg = ({ handleMessage }) => {
    const inputRef = useRef(null);
    return (
        <div className="flex justify-end w-full">
            <form action="" className="flex w-full rounded-full">
                <input
                    type="text"
                    placeholder="메세지를 입력하세요"
                    ref={inputRef}
                    className="w-full h-[50px] text-base placeholder:pl-3 placeholder:text-sm placeholder:truncate placeholder:text-slate-400"
                />
                <button
                    className="flex items-center content-center px-5"
                    onClick={(e) => {
                        e.preventDefault();
                        handleMessage(inputRef.current?.value);

                        if (inputRef.current?.value) {
                            inputRef.current.value = "";
                        }
                    }}
                >
                    <i
                        className={
                            " ri-send-plane-2-fill text-xl" +
                            `${inputRef.current?.value} ? "text-grey-100": "text-red-300`
                        }
                    ></i>
                </button>
            </form>
        </div>
    );
};

export default InputMsg;

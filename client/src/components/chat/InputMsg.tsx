import React, { useRef } from 'react'

interface Props {
  handleMessage: (val: string | undefined) => void
}
const InputMsg = ({ handleMessage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <form action="" className="flex">
        <input type="text" placeholder="메세지를 입력하라" ref={inputRef} className="mr-3 mt-3" />
        <button
          onClick={(e) => {
            e.preventDefault()
            handleMessage(inputRef.current?.value)

            if (inputRef.current?.value) {
              inputRef.current.value = ''
            }
          }}
        >
          전송
        </button>
      </form>
    </div>
  )
}

export default InputMsg

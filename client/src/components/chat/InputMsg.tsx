import React from 'react'

/**
 * //FIXME
 * 함수는 인터페이스를 어떻게 만들어야할까?
 * @param param0
 * @returns
 */
const InputMsg = ({ setMessage, message, sendMessage }: any) => {
  return (
    <div>
      <form action="" className="flex">
        <input
          type="text"
          placeholder="메세지를 입력하라"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) => event.key === 'Enter ? sendMessage(event) : null'}
          className="mr-3 mt-3"
        />
        <button onClick={(e) => sendMessage(e)}>전송</button>
      </form>
    </div>
  )
}

export default InputMsg

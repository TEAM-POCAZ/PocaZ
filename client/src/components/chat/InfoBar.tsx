import React from 'react'

const InfoBar = ({ room }: any) => {
  return (
    <div className="flex flex-col items-center justify-between bg-blue-500 rounded-t-md h-16 w-full">
      <div className="flex items-center ml-1 text-white ">
        {room} :: 여기에 상대방 이름 넣을것임
      </div>
      <div className="flex items-center ml-1 text-white bg-red-300">여기엔 상품정보 넣을것임</div>
    </div>
  )
}

export default InfoBar
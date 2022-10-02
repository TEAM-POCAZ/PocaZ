import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Msg from './Msg'

import { IMessage } from './Chat'

const Messages = ({ messages, nickName }: any) => {
  //FIXME typescript 수정
  return (
    <ScrollToBottom className="flex-auto overflow-auto px-4 ">
      메세지창
      {messages.map((messageSrc: IMessage, i: number) => {
        return (
          <div key={i}>
            <Msg messageSrc={messageSrc} nickName={nickName} />
          </div>
        )
      })}
    </ScrollToBottom>
  )
}

export default Messages

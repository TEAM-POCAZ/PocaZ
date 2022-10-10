import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Msg from './Msg'

import { IChat } from './Chat'

interface Props {
  chats: IChat[]
}

const Messages = ({ chats }: Props) => {
  return (
    <ScrollToBottom className="flex-auto overflow-auto px-4 ">
      {chats.map((chat: IChat, i: number) => {
        return (
          <div key={i}>
            <Msg chat={chat} />
          </div>
        )
      })}
    </ScrollToBottom>
  )
}

export default Messages

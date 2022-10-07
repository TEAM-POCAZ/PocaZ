import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Msg from './Msg'

import { IMessage } from './Chat'

interface IMessages {
  messages: IMessage[]
}

const Messages = ({ messages }: IMessages) => {
  return (
    <ScrollToBottom className="flex-auto overflow-auto px-4 ">
      {messages.map((messageSrc: IMessage, i: number) => {
        return (
          <div key={i}>
            <Msg messageSrc={messageSrc} />
          </div>
        )
      })}
    </ScrollToBottom>
  )
}

export default Messages

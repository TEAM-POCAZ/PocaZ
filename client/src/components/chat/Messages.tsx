import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Msg from './Msg'

const Messages = ({ messages, name }: any) => {
  return (
    <ScrollToBottom className="flex-auto overflow-auto px-4 ">
      메세지창
      {messages.map((message: any, i: any) => {
        return (
          <div key={i}>
            <Msg message={message} name={name} />
          </div>
        )
      })}
    </ScrollToBottom>
  )
}

export default Messages

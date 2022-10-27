import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Msg from "./Msg";

const Messages = ({ chats }) => {
  return (
    <ScrollToBottom className="flex-auto px-4 overflow-auto bg-gray-200 ">
      {chats.map((chat, i) => {
        return (
          <div key={i}>
            <Msg chat={chat} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;

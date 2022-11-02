import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Msg from "./Msg";

const Messages = ({ chats, oppNickname }) => {
    return (
        <ScrollToBottom className="flex-auto px-4 overflow-auto bg-gray-100 ">
            {chats.map((chat, i) => {
                return (
                    <div key={i}>
                        <Msg chat={chat} oppNickname={oppNickname} />
                    </div>
                );
            })}
        </ScrollToBottom>
    );
};

export default Messages;

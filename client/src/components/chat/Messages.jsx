import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Msg from "./Msg";

<<<<<<< HEAD
const Messages = ({ chats }) => {

=======
const Messages = ({ chats, oppNickname }) => {
>>>>>>> 011985a3b2c562605df338604ac459d03a8b414d
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

import React, { useRef, useState } from "react";
import { useEffect } from "react";

import Msg from "./Msg";

const Messages = ({ chats, sellerNickname }) => {
    const [isSmooth, setIsSmooth] = useState("auto");
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: isSmooth });
        return () => setIsSmooth("smooth");
    }, [chats]);

    return (
        <div className="flex-auto px-4 overflow-auto scrollbar-hide h-full bg-gray-100">
            {chats?.map((chat) => {
                return (
                    <React.Fragment key={chat.id}>
                        <div>
                            <Msg chat={chat} sellerNickname={sellerNickname} />
                        </div>
                        <div ref={scrollRef} />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Messages;

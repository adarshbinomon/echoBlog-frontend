import React, { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "./MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages: React.FC = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, ind) => {
          return (
            <div key={ind} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          );
        })}

      {loading &&
        [...Array(3)].map((_, idx) => (
          <MessageSkeleton
            key={idx}
            message={{
              senderId: "",
              createdAt: "",
              message: "",
              shouldShake: false,
              _id: undefined,
            }}
          />
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
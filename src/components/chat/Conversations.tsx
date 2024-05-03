import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { Conversation as Iconversation } from "../../utils/interfaces/inteface";

const Conversations: React.FC = () => {
  const { loading, conversations } = useGetConversations();
  

  if (loading || !Array.isArray(conversations) || conversations.length === 0) {
    return <div>Loading or no conversations available...</div>;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation: Iconversation, idx: number) => {
        const key = conversation._id ? conversation._id : `fallback_key_${idx}`;

        return (
          <Conversation
            key={key}
            conversation={conversation}
            lastIndex={idx === conversations.length - 1}
          />
        );
      })}
    </div>
  );
};

export default Conversations;

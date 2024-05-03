import React from "react";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { useSelector } from "react-redux";
import { Conversation, UserData } from "../../utils/interfaces/inteface";

interface Props {
  message: {
    senderId: string;
    createdAt: string;
    message: string;
    shouldShake: boolean;
  };
}

const Message: React.FC<Props> = ({ message }) => {
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const {selectedConversation} = useConversation();

  let fromMe = message.senderId === userData?._id;
  if (!message.senderId) {
    fromMe = true;
  }

  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? userData?.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

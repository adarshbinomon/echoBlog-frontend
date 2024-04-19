import React, { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useSelector } from "react-redux";
import {
  Conversation as IConversation,
  UserData,
} from "../../utils/interfaces/inteface";

interface Props {
  conversation: IConversation;
  lastIndex?: boolean;
}

const Conversation: React.FC<Props> = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const user: UserData | undefined = conversation.participants.find(
    (participant: { _id: string }) => participant._id !== userData._id
  );
  useEffect(() => {
    console.log("selectedConversation", selectedConversation);
    if (selectedConversation) {
      localStorage.setItem("selectedConversation", selectedConversation._id);
    }
  }, [selectedConversation]);
  return (
    <>
      <div
        className={`flex gap-2 items-center  hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePicture} alt="profile picture" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{user?.name}</p>
            <span className="text-xl">😍</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;

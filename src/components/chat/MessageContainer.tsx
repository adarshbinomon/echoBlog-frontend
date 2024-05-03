import { Video } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Link } from "react-router-dom";
import { generateRandomRoomId } from "../../helper/roomIdCreator";

const MessageContainer = () => {
  const roomId = generateRandomRoomId()
  const { selectedConversation } = useConversation();
  return (
    <div className="md:min-w-[450px] flex flex-col w-4/5">
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
            <span className="label-text">To: {selectedConversation?.name}</span>
            <div className="">
              <Link to={`/videocall/${roomId}`}>
                <Video />
              </Link>
            </div>
          </div>

          <div className="px-4 flex-1">
            <div className="h-[500px] overflow-y-scroll">
              <Messages />
            </div>
            <MessageInput />
          </div>
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-800 font-semibold flex flex-col items-center gap-2">
        <p>Welcome</p>
        <p>Select a chat to start messaging</p>
        {/* <TiMessages className="text-3xl md:text-6xl text-center" /> */}
      </div>
    </div>
  );
};

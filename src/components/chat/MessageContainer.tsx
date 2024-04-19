import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px]  flex flex-col w-4/5">
      <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold"></span>
        </div>
        <div className="px-4 flex-1  ">
          <div className="h-[500px] overflow-y-scroll">
            <Messages />
          </div>
          <MessageInput />
        </div>
      </>
    </div>
  );
};
export default MessageContainer;

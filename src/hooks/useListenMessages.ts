import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/notification.mp3";
import { useSelector } from "react-redux";
import { Message, UserData } from "../utils/interfaces/inteface";
import axios from "axios";
import toast from "react-hot-toast";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {
    messages,
    setMessages,
    selectedConversation,
    setUnreadMessages,
    unreadMessages,
  } = useConversation();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      console.log("New message received:", newMessage);
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      toast("New message recieved", {
        icon: "📩",
      });
      setUnreadMessages(newMessage);
      console.log('unreadMessages',unreadMessages);

      (async () => {
        try {
          const URL = `${chatServiceBaseUrl}/get-messages/${selectedConversation?._id}`;

          const res = await axios.post(
            URL,
            { senderId: userData._id },
            { withCredentials: true }
          );

          setMessages(res.data.conversation.messages);
        } catch (error) {
          console.log(error);
        }
      })();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setMessages, messages, selectedConversation?._id, userData._id]);
};

export default useListenMessages;

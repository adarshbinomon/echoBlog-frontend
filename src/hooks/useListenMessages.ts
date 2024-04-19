import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/notification.mp3";
import { useSelector } from "react-redux";
import { Message, UserData } from "../utils/interfaces/inteface";
import axios from "axios";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;

// interface Message {
//   shouldShake: boolean;
// }

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  useEffect(() => {
    console.log("Entt");

    const handleNewMessage = (newMessage: Message) => {
      console.log(newMessage, "newMessage");

      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      (async () => {
        console.log("getMessages");

        try {
          console.log(selectedConversation,"selectedConversation");
          
          const URL = `${chatServiceBaseUrl}/65fd28f38388a9ce4d8e5aee`;
console.log(URL,"URL");

          const res = await axios.post(
            URL,
            { senderId: userData._id },
            { withCredentials: true }
          );
          console.log("jiii");

          setMessages(res.data.conversation.messages );
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
  }, [socket, setMessages]);
};

export default useListenMessages;

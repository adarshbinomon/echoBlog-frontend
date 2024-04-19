import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { UserData } from "../utils/interfaces/inteface";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;

interface Message {}

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const URL = `${chatServiceBaseUrl}/65fd28f38388a9ce4d8e5aee`;
        const res = await axios.post(
          URL,
          { senderId: userData._id },
          { withCredentials: true }
        );
        
        setMessages(res.data.conversation.messages);
        
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;

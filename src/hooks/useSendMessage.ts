import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios"; // Import AxiosError for type safety
import { useSelector } from "react-redux";
import { UserData, Message as Imessage } from "../utils/interfaces/inteface";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;



const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const sendMessage = async (message: Imessage) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${chatServiceBaseUrl}/send/${selectedConversation?._id}`,
        { message, senderId: userData._id },
        { withCredentials: true }
      );
      console.log('res',res);
      
      const data: Imessage = res.data.sentMessage; 
      
      setMessages([...messages, data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

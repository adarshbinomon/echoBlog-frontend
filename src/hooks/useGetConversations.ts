import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { Conversation, UserData } from "../utils/interfaces/inteface";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;



interface GetConversationsResponse {
  conversations: Conversation;
  users: Conversation[];
  error?: string;
}

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res: AxiosResponse<GetConversationsResponse> = await axios.get(
          `${chatServiceBaseUrl}/get-conversations/${userData._id}`,
          { withCredentials: true }
        );
        const data = res.data.conversations.conversations;

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

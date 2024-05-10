import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { Conversation, UserData } from "../utils/interfaces/inteface";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;

interface GetConversationsResponse {
  conversations: Conversation;
  users: UserData[];
  error?: string;
}

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<[Conversation]>();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const following = userData.following;

        const res: AxiosResponse<GetConversationsResponse> = await axios.post(
          `${chatServiceBaseUrl}/get-conversations`,
          { following },
          { withCredentials: true }
        );
        console.log(res);
        const data = res.data;
        setConversations(data);
        console.log("conversations", res.data);

        if (data.error) {
          throw new Error(data.error);
        }
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
  }, [userData.following,]);

  return { loading, conversations };
};

export default useGetConversations;

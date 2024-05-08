import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const chatServiceBaseUrl = import.meta.env.VITE_CHAT_SERVICE_BASEURL;
const appID = import.meta.env.VITE_ZEGO_CLOUD_APP_ID;
const serverSecret = import.meta.env.VITE_ZEGO_CLOUD_SERVER;


// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

const VideoCall = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const { selectedConversation } = useConversation();

  useEffect(() => {
    axios
      .post(
        `${chatServiceBaseUrl}/videocall/${selectedConversation?._id}`,
        { senderId: userData._id, roomId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message)
      })
      .catch((err: AxiosError) => {
        console.log("err", err);
      });
  }, []);

  const call = async (element: any) => {
    const appID = 455518352;
    const serverSecret = "ba9a1ea4cb0369745d27dd6868544471";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      userData.name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      sharedLinks: [
        {
          url: window.location.origin + window.location.pathname,
        },
      ],
      onLeaveRoom: () => {
        navigate("/chat");
      },
    });
  };
  return (
    <div className="app-container">
      {/* <Navbar/> */}
      <div
        className="flex justify-center items-center w-screen h-screen bg-gray-200"
        ref={call}
      />
      {/* <Footer/> */}
    </div>
  );
};

export default VideoCall;

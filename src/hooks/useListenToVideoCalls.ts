import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/notification.mp3";

const useListenToVideoCalls = () => {
  const { socket } = useSocketContext();
  const [callDetails, setCallDetails] = useState(null);

  useEffect(() => {
    console.log("videocall socket connected");

    const handleNewVideoCall = (callDetails: any) => {
      console.log("New call received:", callDetails);
      const sound = new Audio(notificationSound);
      sound.play();
      setCallDetails(callDetails); // Update call details state
    };

    socket?.on("videoCall", handleNewVideoCall);

    return () => {
      if (socket) {
        socket.off("videoCall", handleNewVideoCall);
      }
    };
  }, [socket]);

  return callDetails; // Return the call details state
};

export default useListenToVideoCalls;

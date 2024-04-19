import React, { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client"; 
import { useSelector } from "react-redux";
import { UserData } from "../utils/interfaces/inteface";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const userData = useSelector((state: UserData) => state.persisted.user.userData);

  useEffect(() => {
    let newSocket: Socket | undefined = undefined;

    if (userData) {      
      newSocket = io("http://localhost:8081", {
        query: {
          userId: userData._id,
        },
      });
console.log("I am Socket");

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [userData]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

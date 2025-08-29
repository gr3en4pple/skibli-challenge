"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

const initSocket = (): Socket => {
  if (!socketInstance || !socketInstance.connected) {
    socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT, {
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket", "polling"],
      reconnection: true,
    });
  }

  return socketInstance;
};

const useChatSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const _socket = initSocket();

    const onConnect = () => {
      setSocket(_socket);
    };
    const onDisconnect = (reason: string) => {
      console.log("disconnected:", reason);
    };
    const onConnectError = (err: any) => {
      console.log("connect error:", err);
    };

    _socket.on("connect", onConnect);
    _socket.on("disconnect", onDisconnect);
    _socket.on("connect_error", onConnectError);

    return () => {
      _socket.off("connect", onConnect);
      _socket.off("disconnect", onDisconnect);
      _socket.off("connect_error", onConnectError);
      if (socketInstance) {
        socketInstance?.disconnect();
        socketInstance = null;
        setSocket(null);
      }
    };
  }, []);
  return socket;
};

export default useChatSocket;

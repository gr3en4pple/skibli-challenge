import React from "react";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import getMe from "@/lib/api/auth/getMe";

const ChatRoom = async () => {
  const user = await getMe();
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <div className="flex-1 overflow-hidden">
        <ChatArea currentUser={user?.user} />
      </div>

      <div className="border-border bg-card border-t p-4">
        <ChatInput currentUser={user?.user} />
      </div>
    </div>
  );
};

export default ChatRoom;

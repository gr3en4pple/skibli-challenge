import React from "react";
import ChatLayout from "./components/ChatLayout";
import getMe from "@/lib/api/auth/getMe";

const Chat = async () => {
  const user = await getMe();

  return (
    <div>
      <ChatLayout user={JSON.parse(JSON.stringify(user.user))} />
    </div>
  );
};

export default Chat;

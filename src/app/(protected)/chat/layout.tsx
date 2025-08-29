import UserList from "@/views/chat/components/UserList";
import ChatArea from "@/views/chat/components/ChatArea";
import getMe from "@/lib/api/auth/getMe";
import { PropsWithChildren } from "react";

const ChatLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getMe();
  return (
    <div className="bg-background flex h-[calc(100vh-64px)]">
      <div className="border-border bg-card w-80 border-r">
        <UserList currentUser={user?.user} />
      </div>
      {children}
    </div>
  );
};

export default ChatLayout;

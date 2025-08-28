"use client";

import React, { useState } from "react";
import { IUser } from "@/types/index.type";
import UserList from "./UserList";
import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";

interface ChatLayoutProps {
  user: IUser;
}

const ChatLayout = ({ user }: ChatLayoutProps) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  return (
    <div className="bg-background flex h-[calc(100vh-64px)]">
      <div className="border-border bg-card w-80 border-r">
        <UserList
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          currentUser={user}
        />
      </div>
      {selectedUser && (
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <ChatArea selectedUser={selectedUser} />
          </div>

          <div className="border-border bg-card border-t p-4">
            <ChatInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLayout;

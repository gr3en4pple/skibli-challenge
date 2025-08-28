"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { IUser } from "@/types/index.type";

interface IChatBox {
  selectedUser: IUser | null;
}

const ChatArea: React.FC<IChatBox> = ({ selectedUser }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-border bg-card flex items-center gap-3 border-b p-4">
        <MessageCircle className="text-muted-foreground h-5 w-5" />
        <div>
          <h3 className="font-semibold">Chat with {selectedUser?.email}</h3>
          <p className="text-muted-foreground text-xs"></p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <MessageCircle className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="text-muted-foreground mb-2 text-lg font-medium">
            No messages yet
          </h3>
          <p className="text-muted-foreground text-sm">
            Start a conversation with your team members
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;

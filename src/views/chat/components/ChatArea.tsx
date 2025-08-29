"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { IUser } from "@/types/index.type";
import useRoomId from "../hooks/useRoomId";
import useGetChatHistory from "../hooks/useGetChatHistory";
import { cn } from "@/lib/utils";

interface IChatBox {
  currentUser: IUser;
}

const ChatArea: React.FC<IChatBox> = ({ currentUser }) => {
  const { currentUserUid, roomId, selectedUserUid } = useRoomId(
    currentUser?.uid,
  );

  const { data, isLoading } = useGetChatHistory(roomId);

  const chatHistory = data?.data || [];
  return (
    <div className="flex h-full flex-col">
      <div className="border-border bg-card flex items-center gap-3 border-b p-4">
        <MessageCircle className="text-muted-foreground h-5 w-5" />
        <div>
          <h3 className="font-semibold">Chat with {currentUserUid}</h3>
          <p className="text-muted-foreground text-xs"></p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {!isLoading &&
          (!chatHistory?.length ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <MessageCircle className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="text-muted-foreground mb-2 text-lg font-medium">
                No messages yet
              </h3>
              <p className="text-muted-foreground text-sm">
                Start a conversation with your team members
              </p>
            </div>
          ) : (
            <div>
              {chatHistory.map((chat) => {
                const isCurrentUser =
                  chat?.sender?.email === currentUser?.email;
                return (
                  <div
                    className={cn({
                      "flex justify-end text-right": isCurrentUser,
                    })}
                    key={JSON.stringify(chat?.createdAt)}
                  >
                    {chat?.message}
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatArea;

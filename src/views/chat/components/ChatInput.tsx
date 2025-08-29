"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import useChatSocket from "@/hooks/useChatSocket";
import { IUser } from "@/types/index.type";
import useRoomId from "../hooks/useRoomId";

interface IChatInput {
  currentUser: IUser;
}
const ChatInput: React.FC<IChatInput> = ({ currentUser }) => {
  const chatSocket = useChatSocket();
  const { currentUserUid, roomId, selectedUserUid } = useRoomId(
    currentUser?.uid,
  );
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    chatSocket?.emit("send_message", {
      message,
      senderId: currentUser.uid,
      toId: selectedUserUid,
    });
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-border focus:border-primary max-h-32 min-h-[44px] resize-none"
          rows={1}
        />
      </div>

      <Button
        onClick={onSubmit}
        disabled={!message.trim()}
        size="icon"
        className="h-11 w-11 flex-shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;

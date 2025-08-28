"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const onSubmit = () => {
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
          className="resize-none border-border focus:border-primary max-h-32 min-h-[44px]"
          rows={1}
        />
      </div>

      <Button
        onClick={onSubmit}
        disabled={!message.trim()}
        size="icon"
        className="flex-shrink-0 w-11 h-11"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;

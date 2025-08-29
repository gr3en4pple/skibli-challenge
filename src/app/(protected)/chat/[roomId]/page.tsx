import ChatRoom from "@/views/chat/ChatRoom";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const roomId = params?.roomId || "";
  if (typeof roomId === "string") {
    const roomIdSplitted = roomId.split("_");
    if (roomIdSplitted.length === 2) {
      const sortedRoomId = roomIdSplitted
        .sort((a, b) => (a < b ? -1 : 1))
        .join("_");
      if (sortedRoomId !== roomId) {
        return redirect(sortedRoomId);
      }
    }
  }
  return <ChatRoom />;
};

export default page;

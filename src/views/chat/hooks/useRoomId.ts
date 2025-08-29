"use client";
import { useParams } from "next/navigation";

const useRoomId = (currentUserUid: string) => {
  const params = useParams();

  const roomId = params?.roomId as string || "";
  const roomIdSplitted = typeof roomId === "string" ? roomId?.split("_") : [];

  const currentUserIndex = roomIdSplitted.indexOf(currentUserUid);
  const selectedUserUid = roomIdSplitted[currentUserIndex === 0 ? 1 : 0];

  return {
    selectedUserUid,
    currentUserUid,
    roomId,
  };
};

export default useRoomId;

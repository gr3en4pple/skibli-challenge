import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface IGetChatHistoryResponse {
  message?: string;
  data?: any[];
  error?: boolean;
  success?: boolean;
}

const useGetChatHistory = (roomId: string) => {
  return useQuery({
    queryKey: ["getChatHistory", roomId],
    queryFn: async (): Promise<IGetChatHistoryResponse> => {
      try {
        const { error, message, success, data } =
          await api.get<IGetChatHistoryResponse>(`/chats/history/${roomId}`);

        if (error) {
          return { error, message };
        }

        return { success, message, data };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useGetChatHistory;

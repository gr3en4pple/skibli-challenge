import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Status } from "@/types/task.type";

interface IUpdateTaskResponse {
  message?: string;
  id?: any;
  error?: boolean;
  success?: boolean;
}

interface IUpdateTaskData {
  id: string;
  status: Status;
}
const useUpdateTask = () => {
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data: IUpdateTaskData): Promise<IUpdateTaskResponse> => {
      try {
        const { error, message, success, id } =
          await api.put<IUpdateTaskResponse>(`/tasks/${data.id}/status`, {
            status: data.status,
          });

        if (error) {
          return { error, message };
        }

        return { success, message, id };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useUpdateTask;

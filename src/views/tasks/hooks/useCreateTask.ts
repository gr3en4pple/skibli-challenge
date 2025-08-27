import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface ICreateTaskResponse {
  message?: string;
  id?: any;
  error?: boolean;
  success?: boolean;
}

interface ICreateTaskData {
  title: string;
  description: string;
  assigneeId: string;
}
const useCreateTask = () => {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (data: ICreateTaskData): Promise<ICreateTaskResponse> => {
      try {
        const { error, message, success, id } =
          await api.post<ICreateTaskResponse>("/tasks", data);

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

export default useCreateTask;

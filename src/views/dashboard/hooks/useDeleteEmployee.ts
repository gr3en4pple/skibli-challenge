import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface IDeleteEmployeeResponse {
  message?: string;
  error?: boolean;
  success?: boolean;
}

const useDeleteEmployee = () => {
  return useMutation({
    mutationKey: ["deleteEmployee"],
    mutationFn: async (id: string): Promise<IDeleteEmployeeResponse> => {
      try {
        const { error, message, success } =
          await api.delete<IDeleteEmployeeResponse>(`/employee/${id}`);

        if (error) {
          return { error, message };
        }

        return { success, message };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useDeleteEmployee;

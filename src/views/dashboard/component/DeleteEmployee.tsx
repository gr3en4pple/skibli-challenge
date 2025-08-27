import React from "react";
import useDeleteEmployee from "../hooks/useDeleteEmployee";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Employee } from "@/types/employee.type";
import { toast } from "sonner";
const DeleteEmployee = ({ employee }: { employee: Employee }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteEmployee, isPending } = useDeleteEmployee();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        <div>Delete Employee</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you want to delete this employee?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            employee and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (isPending) return;
              try {
                const response = await deleteEmployee(employee.uid);
                if (response.success) {
                  toast.success("Delete employee successfully!");
                  queryClient.invalidateQueries({
                    queryKey: ["getEmployees"],
                  });
                }
              } catch (error) {
                console.log("error:", error);
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEmployee;

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateTaskFormType } from "@/types/task.type";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEmployees from "@/views/dashboard/hooks/useGetEmployees";
interface IAssigneeInput {
  form: CreateTaskFormType;
}

const AssigneeInput: React.FC<IAssigneeInput> = ({ form }) => {
  const { data } = useGetEmployees();
  const employees = data?.data || [];
  console.log("employees:", employees);
  return (
    <FormField
      control={form.control}
      name="assigneeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assignee</FormLabel>
          <Select  onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full h-16">
                <SelectValue placeholder="Select an Assignee" className="h-16" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee?.email} value={employee?.uid}>
                  <div>
                    <div className="mb-1">{employee?.name}</div>
                    <div className="text-xs text-gray-500">
                      {employee?.email}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AssigneeInput;

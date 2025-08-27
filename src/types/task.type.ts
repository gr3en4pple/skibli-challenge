import { UseFormReturn } from "react-hook-form";
import { Employee } from "./employee.type";

export interface CreateTaskFormType
  extends UseFormReturn<
    {
      title: string;
      description: string;
      assigneeId: string;
    },
    any,
    {
      title: string;
      description: string;
      assigneeId: string;
    }
  > {}

export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}
export type Status = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  assigneeId: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: Status;
  user: Employee;
}

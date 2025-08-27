"use client";

import type React from "react";

import { useMemo, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import TaskForm from "./TaskForm";
import useGetTasks from "../hooks/useGetTasks";
import { Status, Task } from "@/types/task.type";
import useUpdateTask from "../hooks/useUpdateTask";
import { useQueryClient } from "@tanstack/react-query";
import { IUser } from "@/types/index.type";

const columns: { key: Status; title: string; color: string }[] = [
  { key: "todo", title: "To Do", color: "bg-muted" },
  { key: "inprogress", title: "In Progress", color: "bg-accent/10" },
  { key: "done", title: "Done", color: "bg-primary/10" },
];

const KanbanBoard = ({ user }: { user: IUser }) => {
  const role = user.role;
  const { data, isLoading: isLoadingTasks } = useGetTasks();
  const queryClient = useQueryClient();

  const { mutateAsync: updateStatusTask, isPending: isUpdatatingStatus } =
    useUpdateTask();
  const tasks = useMemo<Record<Status, Task[]>>(() => {
    const result = (data?.data || []) as Task[];
    const todoTasks = result.filter((task) => task.status === "todo");
    const inprogressTasks = result.filter(
      (task) => task.status === "inprogress",
    );
    const doneTasks = result.filter((task) => task.status === "done");
    return {
      todo: todoTasks,
      inprogress: inprogressTasks,
      done: doneTasks,
    };
  }, [data]);

  const [draggedTask, setDraggedTask] = useState<{
    task: Task;
    sourceColumn: Status;
  } | null>(null);

  const handleDragStart = (task: Task, sourceColumn: Status) => {
    setDraggedTask({ task, sourceColumn });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetColumn: Status) => {
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;

    if (sourceColumn === targetColumn) {
      setDraggedTask(null);
      return;
    }

    await updateStatusTask({ id: task.id, status: targetColumn });
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["getTasks"],
      });
    }, 50);

    setDraggedTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">Board:</h2>
          <div className="flex items-center font-semibold text-base text-muted-foreground ">
            {Object.values(tasks).flat().length} tasks total
          </div>
        </div>

        {role === "owner" && <TaskForm />}
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {columns.map((column) => (
            <div key={column.key} className="flex-shrink-0 w-80">
              <KanbanColumn
                title={column.title}
                tasks={tasks[column.key]}
                columnType={column.key}
                color={column.color}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;

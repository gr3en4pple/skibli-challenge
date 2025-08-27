"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import TaskCard from "./TaskCard";
import { Task, Status } from "@/types/task.type";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  columnType: Status;
  color: string;
  onDragStart: (task: Task, sourceColumn: Status) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (targetColumn: Status) => void;
}

const KanbanColumn = ({
  title,
  tasks,
  columnType,
  color,
  onDragStart,
  onDragOver,
  onDrop,
}: KanbanColumnProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(columnType);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold">{title}</h3>
        <span className="text-muted-foreground bg-muted rounded-full px-2 py-1 text-sm">
          {tasks.length}
        </span>
      </div>

      <Card
        className={`min-h-[500px] p-4 ${color} border-border/50 border-2 border-dashed transition-colors`}
        onDragOver={onDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnType={columnType}
              onDragStart={onDragStart}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-muted-foreground flex h-32 items-center justify-center">
              <p className="text-sm">Drop tasks here</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
export default KanbanColumn;

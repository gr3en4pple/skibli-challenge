"use client";

import type React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";

import { firestoreTimestampToDate, getInitialsUserName } from "@/lib/utils";
import { Status, Task } from "@/types/task.type";

interface ITaskCard {
  task: Task;
  columnType: Status;
  onDragStart: (task: Task, sourceColumn: Status) => void;
}

const TaskCard = ({ task, columnType, onDragStart }: ITaskCard) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task, columnType);
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="bg-card border-border cursor-move transition-shadow hover:shadow-md"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-1 items-center gap-2">
            <GripVertical className="text-muted-foreground h-4 w-4" />
            <h4 className="text-card-foreground text-sm leading-tight font-medium">
              {task.title}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="line-clamp-4 text-xs font-semibold">{task.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            Task created:{" "}
            {firestoreTimestampToDate(task.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-1 text-xs font-semibold">
            <div>Assignee:</div>
            <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full">
              {getInitialsUserName(task.user.name || task.user.email)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

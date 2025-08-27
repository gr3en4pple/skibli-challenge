"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoaderCircle, PlusIcon } from "lucide-react";
import useCreateTask from "../../hooks/useCreateTask";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import AssigneeInput from "./AssigneeInput";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title length must be >= 5 characters")
    .max(100, "NaTitleme length must be <= 100 characters"),
  description: z
    .string()
    .min(5, "Description length must be >= 5 characters")
    .max(200, "Description length must be <= 200 characters"),
  assigneeId: z.string().min(1),
});

const TaskForm = ({}) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", assigneeId: "" },
  });

  const { mutateAsync: createTask, isPending } = useCreateTask();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createTask({
        title: values.title,
        description: values.description,
        assigneeId: values.assigneeId,
      });
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["getTasks"],
        });
        toast.success("Create tasks successfully!", {
          position: "top-right",
        });
        form.reset();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="destructive">
          <PlusIcon />
          Create New Task
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full">
        <SheetHeader className="h-full">
          <SheetTitle>Create task</SheetTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex h-full flex-col space-y-4"
            >
              <TitleInput form={form} />
              <DescriptionInput form={form} />
              <AssigneeInput form={form} />

              <div className="mt-auto mb-4 flex w-full flex-col space-y-2">
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="destructive"
                >
                  Create Task
                  {isPending && (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  )}
                </Button>
                <SheetClose asChild>
                  <Button disabled={isPending} variant="outline" type="button">
                    Close
                  </Button>
                </SheetClose>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TaskForm;

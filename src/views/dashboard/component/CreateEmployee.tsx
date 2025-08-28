import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import PhoneInput from "./PhoneInput";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import useCreateEmployee from "@/views/dashboard/hooks/useCreateEmployee";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  convertPhoneNumber,
  formatVisiblePhoneNumber,
} from "@/lib/utils/index";
import isDeepEqual from "deep-equal";
import useEditEmployee from "../hooks/useEditEmployee";
const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name length must be >= 5 characters")
    .max(30, "Name length must be <= 30 characters")
    .optional(),
  phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone number is invalid format")
    .optional(),
  email: z.email("Invalid email address"),
  role: z.string(),
});

const CreateEmployeeModal = ({
  initValue,
  onToggle,
  open,
}: {
  onToggle?: (open: boolean) => void;
  open?: boolean;
  initValue?: { name: string; email: string; phone: string; role: string };
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: createEmployee, isPending } = useCreateEmployee();
  const { mutateAsync: editEmployee, isPending: isPendingEditEmployee } =
    useEditEmployee();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValue || {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  const isEdit = Boolean(initValue);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = isEdit
        ? await editEmployee({
            id: (initValue as any)?.uid,
            phone: values.phone ? convertPhoneNumber(values.phone) : "",
            name: values.name,
            email: initValue?.email as string,
          })
        : await createEmployee({
            email: values.email,
            phone: values.phone ? convertPhoneNumber(values.phone) : "",
            name: values.name,
          });
      if (res.success) {
        onToggle?.(false);
        queryClient.invalidateQueries({
          queryKey: ["getEmployees"],
        });
        toast.success(`${isEdit ? "Edit" : "Create"} employee successfully!`, {
          position: "top-right",
        });
        form.reset();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        onToggle?.(open);
        form.reset();
      }}
    >
      <SheetTrigger asChild>
        <Button variant="destructive">
          <PlusIcon />
          Create Employee
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit" : "Create"} Employee</SheetTitle>
          <SheetDescription>
            {isEdit ? "Edit" : "Create"} an employee by filling out the form
            below.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col space-y-4 px-4"
          >
            <NameInput form={form} />
            <PhoneInput form={form} />
            <EmailInput disabled={Boolean(initValue)} form={form} />
            <div className="mt-auto mb-4 flex w-full flex-col space-y-2">
              <Button
                disabled={isPending || isPendingEditEmployee}
                type="submit"
                variant="destructive"
              >
                {isEdit ? "Edit" : "Create"}
                {(isPending || isPendingEditEmployee) && (
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
      </SheetContent>
    </Sheet>
  );
};

export default CreateEmployeeModal;

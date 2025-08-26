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
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import PhoneInput from "./PhoneInput";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name's length must be >= 2 characters")
    .max(100, "Name's length must be <= 100 characters"),
  phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone number is invalid format"),
  email: z.email("Invalid email address"),
  role: z.string(),
});

const CreateEmployeeModal = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    form.setValue("phone", value);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Sheet onOpenChange={() => form.reset()}>
      <SheetTrigger asChild>
        <Button variant="destructive">
          <PlusIcon />
          Create Employee
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create employee</SheetTitle>
          <SheetDescription>
            Create an employee by filling out the form below.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col space-y-4 px-4"
          >
            <NameInput form={form} />
            <PhoneInput form={form} />
            <EmailInput form={form} />
            <div className="mt-auto mb-4 flex w-full flex-col space-y-2">
              <Button type="submit" variant="destructive">Create</Button>
              <SheetClose asChild>
                <Button variant="outline" type="button">
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

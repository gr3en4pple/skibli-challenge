"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { convertPhoneNumber, formatVisiblePhoneNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send, Smartphone } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useSendSmsOTP from "../hooks/useSendSmsOTP";
import OtpInputDialog from "./OtpInputDialog";

const formSchema = z.object({
  phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone number is invalid format"),
});

const PhoneInput: React.FC = () => {
  const { mutateAsync, isPending } = useSendSmsOTP();
  const [showModalOtp, setModalOtp] = useState(false);
  const [phone, setPhone] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    form.setValue("phone", value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const phoneFormat = convertPhoneNumber(values.phone);
      const res = await mutateAsync({ phone: phoneFormat });
      if (res?.success) {
        setModalOtp(true);
        setPhone(phoneFormat);
        form.reset();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="bg-card border-border/50 rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="from-primary/20 to-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
            <Smartphone className="text-primary h-8 w-8" />
          </div>

          <p className="text-muted-foreground text-sm">
            Login via SMS OTP code
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        prefix={<div>+84</div>}
                        disabled={isPending}
                        value={formatVisiblePhoneNumber(field.value)}
                        className="border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-12 rounded-xl pr-16 text-base backdrop-blur-sm transition-all duration-200 focus:ring-2"
                        onChange={onChange}
                      />

                      <Button
                        variant="default"
                        type="submit"
                        disabled={isPending}
                        className="bg-primary hover:bg-primary/90 absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-lg transition-all duration-200 disabled:opacity-50"
                      >
                        {isPending ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {showModalOtp && (
        <OtpInputDialog
          phone={phone}
          onOpenChange={() => setModalOtp(false)}
          open
        />
      )}
    </div>
  );
};

export default PhoneInput;

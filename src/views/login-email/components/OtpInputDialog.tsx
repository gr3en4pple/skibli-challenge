"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogProps } from "@radix-ui/react-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerifyOTP from "@/hooks/useVerifyOTP";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface IOtpInputDialog extends DialogProps {
  formData: { email: string; password: string };
}

const OtpInputDialog: React.FC<IOtpInputDialog> = ({
  open,
  onOpenChange,
  formData,
}) => {
  const [otp, setOtp] = useState("");
  const [isError, setError] = useState(false);
  const { mutateAsync: verifyOtp, isPending } = useVerifyOTP();

  const submitOtp = async (otp: string) => {
    try {
      const verifyRes = await verifyOtp({
        email: formData.email,
        password: formData.password,
        otp,
      });

      if (verifyRes.success) {
        const successOtpToast = toast.success("OTP verified successfully!");
        window.location.href = "/tasks";
        toast.dismiss(successOtpToast);
        toast.success("Signed in successfully!");
      } else {
        toast.warning(
          verifyRes?.message || "Failed to login. Please try again",
        );
        setError(true);
      }

      setOtp("");
    } catch (error: any) {
      toast.warning(
        error?.message || "Authentication failed. Please try again.",
      );
      setError(true);
    }
  };

  const onChange = async (value: string) => {
    if (value === "" || new RegExp("^\\d+$").test(value)) {
      setError(false);

      setOtp(value);
      if (value.length === 6) {
        await submitOtp(value);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="max-w-[320px] gap-0 rounded-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold">
            Email OTP{" "}
          </DialogTitle>
          <DialogDescription className="">
            Submit your Email OTP to login
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-2">
          <InputOTP
            disabled={isPending}
            maxLength={6}
            value={otp}
            onChange={onChange}
          >
            <InputOTPGroup>
              {[...Array(6).keys()].map((index) => (
                <InputOTPSlot
                  key={index}
                  className={cn({ "border-red-500": isError })}
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="text-primary text-center text-sm">
            Enter your OTP code
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpInputDialog;

import verifyEmailLink from "@/lib/api/auth/verifyEmailLink";
import { redirect } from "next/navigation";
import React from "react";
import { VerifyEmailForm } from "@/views/verify-email";
import { CircleX } from "lucide-react";

const VerifyEmail = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const param = await searchParams;
  const token = param.token || "";
  if (!token) redirect("/");

  const user = await verifyEmailLink(token as string);

  if (user.error) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-md mx-auto">
          <div className="p-8 text-center border shadow-xl bg-card border-border/50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4 text-destructive">
              <CircleX size={120} />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Verification Failed
            </h2>
            <p className="text-sm text-muted-foreground">
              The email verification link is invalid or has expired.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:pt-20">
      <VerifyEmailForm token={token as string} />
    </div>
  );
};

export default VerifyEmail;

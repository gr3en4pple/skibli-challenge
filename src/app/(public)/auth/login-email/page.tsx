"use server";

import LoginWithEmail from "@/views/login-email/components/LoginWithEmail";
import { Phone } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <div className="px-4 pt-8 pb-8 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto space-y-10 max-w-7xl">
          <h1 className="text-4xl font-bold text-center lg:text-5xl">
            Sign In With Email & Password
          </h1>

          <div className="w-full max-w-md mx-auto ">
            <LoginWithEmail />
            <div className="flex flex-col items-center mt-4 space-y-1 text-sm">
              <p className="text-base font-semibold">Not have an email?</p>
              <Link
                href="/auth/login"
                className="flex items-center gap-1 text-sm underline transition-colors hover:text-blue-500"
              >
                <Phone size={16} />
                <span>Phone Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

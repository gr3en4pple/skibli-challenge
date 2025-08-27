'use server'
import getMe from "@/lib/api/auth/getMe";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { Sidebar } from "@/components/layout/sidebar";

const ProtectedLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getMe();

  if (!user) redirect("/auth/login");
  
  return (
    <div className="mt-16 flex min-h-[calc(100vh-64px)] bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto ml-[255px]">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;

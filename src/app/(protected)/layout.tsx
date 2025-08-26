'use server'
import getMe from "@/lib/api/auth/getMe";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { Sidebar } from "@/components/layout/sidebar";

const ProtectedLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getMe();

  if (!user) redirect("/auth/login");
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;

"use server";
import Navbar from "@/components/layout/navbar";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;

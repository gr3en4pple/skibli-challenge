"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import UserAvatar from "./components/UserAvatar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background border-border backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Image alt="main_logo" src="/skipli.svg" height={55} width={120} />

          <div className="items-center hidden space-x-4 md:flex">
            <UserAvatar />
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

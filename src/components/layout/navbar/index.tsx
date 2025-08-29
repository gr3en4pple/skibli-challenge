"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import UserAvatar from "./components/UserAvatar";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-background border-border fixed top-0 right-0 left-0 z-50 h-16 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Image alt="main_logo" src="/skipli.svg" height={55} width={120} />
          </Link>

          <div className="hidden items-center space-x-4 md:flex">
            <UserAvatar />
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

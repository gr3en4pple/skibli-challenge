"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Users, ClipboardList, MessageSquare } from "lucide-react";

interface INavigations {
  role: string;
}

let navigations = [
  {
    name: "Employee Management",
    href: "/dashboard",
    icon: Users,
  },
  {
    name: "Task Management",
    href: "/tasks",
    icon: ClipboardList,
  },
  {
    name: "Message",
    href: "/chat",
    icon: MessageSquare,
  },
];

const NavigationLinks: React.FC<INavigations> = ({ role }) => {
  const pathname = usePathname();

  navigations = navigations.filter((nav) =>
    role === "employee" ? nav.href !== "/dashboard" : true,
  );

  return navigations.map((item) => {
    const isActive = pathname.includes(item.href);
    const Icon = item.icon;
    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "border-skipli bg-skipli border-r-2 font-semibold text-white"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        )}
      >
        <Icon
          className={cn("mr-3 h-5 w-5 flex-shrink-0", {
            "text-gray-400 group-hover:text-gray-500": !isActive,
          })}
          aria-hidden="true"
        />
        {item.name}
      </Link>
    );
  });
};

export default NavigationLinks;

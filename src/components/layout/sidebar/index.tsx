"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Users, ClipboardList, MessageSquare } from "lucide-react";

const navigation = [
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <nav className="flex-1 space-y-3 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
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
              <item.icon
                className={cn("mr-3 h-5 w-5 flex-shrink-0", {
                  "text-gray-400 group-hover:text-gray-500": !isActive,
                })}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

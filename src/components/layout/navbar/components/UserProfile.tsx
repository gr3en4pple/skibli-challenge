"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import React, { useMemo, useState } from "react";
import { User, Phone, Mail, LogOut, Shield } from "lucide-react";
import { Role } from "@/config";
import { IUser } from "@/types/index.type";

const UserProfile = ({ user }: { user: IUser }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await api.post<any>("/logout");
      console.log("response:", response);
      if (response?.success) {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const displayName =
    user.username ||
    user.email?.split("@")[0] ||
    user.phone?.replace("+84", "0") ||
    Role.EMPLOYEE;

  const contactInfo = useMemo(() => {
    const results = [];
    if (user.phone) {
      results.push({ name: "Phone", value: user.phone, icon: Phone });
    }
    if (user.email) {
      results.push({ name: "Email", value: user.email, icon: Mail });
    }

    results.push({
      name: "UserID",
      value: `${user?.uid.slice(0, 4)}...${user?.uid.slice(-4)}`,
      icon: Shield,
    });

    return results;
  }, [user]);
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="truncate font-semibold">{displayName}</p>
          {user?.role && (
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {contactInfo.map((contact) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.name}
              className="flex items-center space-x-3 rounded-lg bg-gray-50 p-2 text-gray-500"
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <div className="">
                <p className="text-primary truncate text-sm font-semibold">
                  {contact.value}
                </p>
                <p className="text-xs">{contact.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        disabled={isLoggingOut}
        onClick={handleLogout}
        className="w-full py-4 font-semibold"
        variant="destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </Button>
    </div>
  );
};

export default UserProfile;

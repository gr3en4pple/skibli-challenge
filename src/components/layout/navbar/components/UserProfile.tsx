"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import React, { useMemo, useState } from "react";
import { User, Phone, Mail, LogOut, Shield } from "lucide-react";
import { Role } from "@/config";
import { IUser } from "@/types/index.type";
import { getInitialsUserName } from "../../../../lib/utils/index";

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
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          {user.role === "owner" ? (
            <User />
          ) : (
            getInitialsUserName(user?.username || user?.email || "")
          )}
        </div>
        <div>
          <p className="font-semibold truncate">{displayName}</p>
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
              className="flex items-center p-2 space-x-3 text-gray-500 rounded-lg bg-gray-50"
            >
              <Icon className="flex-shrink-0 w-4 h-4" />
              <div className="">
                <p className="text-sm font-semibold truncate text-primary">
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
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
};

export default UserProfile;

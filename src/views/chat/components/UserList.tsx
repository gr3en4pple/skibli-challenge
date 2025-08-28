import React, { useState } from "react";
import { IUser } from "@/types/index.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users } from "lucide-react";

const users: IUser[] = [
  {
    uid: "1",
    username: "Giang 1",
    email: "gr3en4pple23@gmail.com",
    phone: "+84901201032",
    role: "employee",
    createdAt: new Date(),
    password: "",
  },
  {
    uid: "2",
    username: "Giang 2",
    email: "gr3en4pple23+1@gmail.com",
    phone: "+84901201033",
    role: "employee",
    createdAt: new Date(),
    password: "",
  },
  {
    uid: "3",
    username: "Giang nè",
    email: "ntgiang2399@gmail.com",
    phone: "+84901201031",
    role: "owner",
    createdAt: new Date(),
    password: "",
  },
];

interface IUserList {
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  selectedUser: IUser | null;
  currentUser: IUser;
}

const UserList = ({
  currentUser,
  selectedUser,
  setSelectedUser,
}: IUserList) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-border border-b p-4">
        <div className="mb-3 flex items-center gap-2">
          <Users className="text-muted-foreground h-5 w-5" />
          <h2 className="text-lg font-semibold">Chat Members</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {users.map((user) => (
            <div
              key={user?.uid}
              className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                selectedUser?.uid === user?.uid
                  ? "bg-primary/10 border-primary/20 border"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={user.username} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(
                    user?.username || user?.email || user?.phone || "",
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">
                    {user.username}
                    {user.uid === currentUser?.uid && (
                      <span className="text-muted-foreground ml-1 text-xs">
                        You
                      </span>
                    )}
                  </p>
                  {user.role === "owner" && (
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                      Owner
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>

              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;

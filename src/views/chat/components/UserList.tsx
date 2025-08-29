import React from "react";
import { IUser } from "@/types/index.type";
import { Loader2, LoaderCircle, User, Users } from "lucide-react";
import useGetChatMembers from "../hooks/useGetChatMembers";

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
  const { data, isLoading } = useGetChatMembers();

  const members = data?.data || [];

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
        <div className="h-full p-2">
          {isLoading ? (
            <div className="text-skipli flex h-full items-center justify-center">
              <LoaderCircle className="h-12 w-12 animate-spin" />
            </div>
          ) : (
            members.map((user: IUser) => {
              const isCurrentUser = user.uid === currentUser?.uid;
              if (isCurrentUser) return null;
              const userDisplayName =
                user?.username || user?.email || user?.phone || "";
              const isOwner = user?.role === "owner";

              return (
                <div
                  key={user?.uid}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                    selectedUser?.uid === user?.uid
                      ? "bg-primary/10 border-primary/20 border"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    {isOwner ? <User /> : getInitials(userDisplayName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {userDisplayName}
                      </p>
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs capitalize">
                        {user?.role || "Employee"}
                      </span>
                    </div>

                    <p className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;

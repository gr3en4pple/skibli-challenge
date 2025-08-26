import getMe from "@/lib/api/auth/getMe";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserProfile from "./UserProfile";
const UserAvatar = async () => {
  const user = await getMe();

  if (!user || user?.error)
    return (
      <Link href="/auth/login">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
    );

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={user?.user?.photoURL} alt="user-avatar" />
            <AvatarFallback className="flex cursor-pointer items-center justify-center">
              <CircleUserRound />
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end">
          <UserProfile user={user?.user} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserAvatar;

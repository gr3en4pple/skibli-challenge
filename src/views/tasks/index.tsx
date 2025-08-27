import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import getMe from "@/lib/api/auth/getMe";

const Tasks = async () => {
  const user = await getMe();

  return (
    <div>
      <KanbanBoard user={JSON.parse(JSON.stringify(user.user))} />
    </div>
  );
};

export default Tasks;

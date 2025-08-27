import getMe from "@/lib/api/auth/getMe";
import Dashboard from "@/views/dashboard";
import { redirect } from "next/navigation";

const index = async () => {
  const user = await getMe();
  if (user?.user && user.user?.role === "employee") {
    redirect("/tasks");
  }

  return (
    <div className="p-6">
      <div className="">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Employee Management
        </h1>
        <div className="rounded-lg bg-white p-6 shadow">
          <Dashboard />{" "}
        </div>
      </div>
    </div>
  );
};

export default index;

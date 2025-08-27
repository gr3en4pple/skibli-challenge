import NavigationLinks from "./NavigationLinks";
import getMe from "@/lib/api/auth/getMe";

export async function Sidebar() {
  const user = await getMe();

  if (!user || user?.error) return null;

  return (
    <div className="flex fixed h-full w-64 flex-col border-r border-gray-200 bg-white">
      <nav className="flex-1 space-y-3 px-4 py-6">
        <NavigationLinks role={JSON.parse(JSON.stringify(user.user?.role))} />
      </nav>
    </div>
  );
}

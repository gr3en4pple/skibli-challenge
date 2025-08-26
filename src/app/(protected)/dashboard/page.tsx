import Dashboard from "@/views/dashboard";

const index = async () => {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
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

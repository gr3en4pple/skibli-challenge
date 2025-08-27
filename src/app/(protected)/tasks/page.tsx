import Tasks from "@/views/tasks";

const page = async () => {
  return (
    <div className="p-6">
      <div className="">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Task Management
        </h1>

        <Tasks />
      </div>
    </div>
  );
};

export default page;

import PhoneInput from "@/views/login/components/PhoneInput";
import Navbar from "@/components/layout/navbar";

const LoginPage = () => {
  return (
    <div>
      <div className="px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold lg:text-5xl">
              Sign In With Phone Number
            </h1>
          </div>

          <div className="flex justify-center">
            <PhoneInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

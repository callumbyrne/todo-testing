import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../typeings";
import Header from "../components/Header";

export const createSessionSchema = object({
  email: string().min(1, { message: "Email is required" }),
  password: string().min(1, { message: "Password is required" }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Login = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const onSubmit = async (values: CreateSessionInput) => {
    try {
      await axios.post("/api/sessions", values, {
        withCredentials: true,
      });
      const { data } = await axios.get("/api/me", {
        withCredentials: true,
      });
      setUser(data);
      navigate("/", { replace: true });
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="flex justify-center bg-[#5352ed] text-white h-full">
      <div className="w-full h-full flex flex-col md:max-w-4xl">
        <Header title="Login" user={null} />
        <div className="bg-[#323442] flex-grow flex items-center flex-col px-5 rounded-t-3xl">
          <div className="form-container max-w-lg w-full p-10 mt-10">
            <p>{loginError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-element flex flex-col mb-6">
                <label htmlFor="email" className="font-bold text-xl mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="hello@example.com"
                  autoComplete="username"
                  className="border rounded-md py-2 px-1 text-black"
                  {...register("email")}
                />
                <ErrorMessage errors={errors} name="email" as="p" />
              </div>

              <div className="form-element flex flex-col mb-6">
                <label htmlFor="password" className="font-bold text-xl mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  autoComplete="password"
                  className="border rounded-md py-2 px-1 text-black"
                  {...register("password")}
                />
                <ErrorMessage errors={errors} name="password" as="p" />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mb-6 py-2 px-10 bg-blue-500 text-white font-bold rounded-md"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

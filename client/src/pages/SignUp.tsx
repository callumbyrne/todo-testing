import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { User } from "../typeings";

const createUserSchema = object({
  name: string().min(1, { message: "Name is required" }),
  password: string().min(6, "Password too short - should be 6 chars minimum"),
  passwordConfirmation: string().min(1, {
    message: "Password confirmation is required",
  }),
  email: string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

interface SignUpProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SignUp = ({ setUser }: SignUpProps) => {
  const [signUpError, setSignUpError] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (values: CreateUserInput) => {
    try {
      await axios.post("/api/users", values, {
        withCredentials: true,
      });
      const loginValues = {
        email: values.email,
        password: values.password,
      };
      await axios.post("/api/sessions", loginValues, {
        withCredentials: true,
      });
      const { data } = await axios.get("/api/me", {
        withCredentials: true,
      });
      setUser(data);
      navigate("/", { replace: true });
    } catch (error: any) {
      if (String(error.response.status) === "409") {
        setSignUpError("Email already exists");
      } else if (String(error.response.status) === "400") {
        setSignUpError(error.response.data);
      } else {
        setSignUpError(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center bg-[#5352ed] text-white h-full">
      <div className="w-full h-full flex flex-col md:max-w-4xl">
        <Header title="Sign up" user={null} />
        <div className="bg-[#323442] flex-grow flex items-center flex-col px-5 rounded-t-3xl">
          <div className="form-container max-w-lg w-full py-10 px-20">
            <p>{signUpError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-element flex flex-col mb-6">
                <label htmlFor="name" className="font-bold text-xl mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  autoComplete="name"
                  className="border rounded-md py-2 px-1 text-black"
                  {...register("name")}
                />
                <ErrorMessage errors={errors} name="name" as="p" />
              </div>

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
                <ErrorMessage
                  errors={errors}
                  name="password"
                  as="p"
                  className="flex flex-wrap"
                />
              </div>

              <div className="form-element flex flex-col mb-6">
                <label
                  htmlFor="passwordConfirmation"
                  className="font-bold text-xl mb-1"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="passwordConfirmation"
                  placeholder="********"
                  autoComplete="password"
                  className="border rounded-md py-2 px-1 text-black"
                  {...register("passwordConfirmation")}
                />
                <ErrorMessage
                  errors={errors}
                  name="passwordConfirmation"
                  as="p"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mb-6 py-2 px-10 bg-blue-500 text-white font-bold rounded-md"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

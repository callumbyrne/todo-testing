import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import { User } from "../typeings";

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
            await axios.post("http://localhost:1337/api/sessions", values, {
                withCredentials: true,
            });
            getCurrentUser(setUser);
            navigate("/", { replace: true });
        } catch (error: any) {
            setLoginError(error.message);
        }
    };

    return (
        <div className='flex items-center flex-col'>
            <h2 className='max-w-5xl mt-10 mb-3 font-bold text-2xl'>Login</h2>
            <div className='form-container max-w-lg w-full border rounded-lg p-10'>
                <p>{loginError}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-element flex flex-col mb-6'>
                        <label
                            htmlFor='email'
                            className='font-bold text-xl mb-1'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='hello@example.com'
                            autoComplete='username'
                            className='border rounded-md py-2 px-1'
                            {...register("email")}
                        />
                        <ErrorMessage errors={errors} name='email' as='p' />
                    </div>

                    <div className='form-element flex flex-col mb-6'>
                        <label
                            htmlFor='password'
                            className='font-bold text-xl mb-1'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='********'
                            autoComplete='password'
                            className='border rounded-md py-2 px-1'
                            {...register("password")}
                        />
                        <ErrorMessage errors={errors} name='password' as='p' />
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='mb-6 py-2 px-10 bg-blue-500 text-white font-bold rounded-md'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

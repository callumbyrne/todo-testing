import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";

export const createSessionSchema = object({
    email: string().min(1, { message: "Email is required" }),
    password: string().min(1, { message: "Password is required" }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Login = () => {
    const [loginError, setLoginError] = useState(null);

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
        } catch (error: any) {
            setLoginError(error.message);
        }
    };

    return (
        <>
            <p>{loginError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-element'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='hello@example.com'
                        autoComplete='username'
                        {...register("email")}
                    />
                    <ErrorMessage errors={errors} name='email' as='p' />
                </div>

                <div className='form-element'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='********'
                        autoComplete='password'
                        {...register("password")}
                    />
                    <ErrorMessage errors={errors} name='password' as='p' />
                </div>

                <button type='submit'>Log In</button>
            </form>
        </>
    );
};

export default Login;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import getCurrentUser from "../utils/getCurrentUser";
import { User } from "../typeings";

const createTodoSchema = object({
    content: string().min(1, { message: "Cannot be empty" }),
});

type CreateTodoInput = TypeOf<typeof createTodoSchema>;

interface TodoFormProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const TodoForm = ({ setUser }: TodoFormProps) => {
    const [todoError, setTodoError] = useState(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateTodoInput>({
        resolver: zodResolver(createTodoSchema),
    });

    const onSubmit = async (values: CreateTodoInput) => {
        try {
            await axios.post("http://localhost:1337/api/todos", values, {
                withCredentials: true,
            });
            getCurrentUser(setUser);
        } catch (error: any) {
            setTodoError(error.message);
        }
    };
    return (
        <div className='flex max-w-5xl w-full mb-3'>
            <div className='form-container w-1/2'>
                <p>{todoError}</p>
                <form
                    className='flex justify-between'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-element flex items-center w-full mr-3'>
                        <input
                            type='text'
                            id='content'
                            placeholder='New todo'
                            className='border w-full h-full rounded-lg pl-3'
                            {...register("content")}
                        />
                        <ErrorMessage errors={errors} name='content' as='p' />
                    </div>

                    <div className='flex items-center'>
                        <button
                            type='submit'
                            className='py-2 px-5 bg-blue-500 text-white font-bold rounded-md'>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;

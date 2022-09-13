import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { ITodo } from "../typeings";

const createTodoSchema = object({
  content: string().min(1, { message: "Cannot be empty" }),
});

type CreateTodoInput = TypeOf<typeof createTodoSchema>;

interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoForm = ({ setTodos }: TodoFormProps) => {
  const [todoError, setTodoError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = async (values: CreateTodoInput) => {
    try {
      const { data } = await axios.post("/api/todos", values, {
        withCredentials: true,
      });
      setTodos((todos) => todos.concat(data));
      reset();
    } catch (error: any) {
      setTodoError(error.message);
    }
  };
  return (
    <div className="flex w-full pb-3 bg-[#323442] rounded-t-3xl">
      <div className="form-container mx-5 mt-5 w-full md:mx-10">
        <p>{todoError}</p>
        <form
          className="flex justify-between flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex">
            <div className="form-element flex items-center w-full mr-3">
              <input
                type="text"
                id="content"
                placeholder="New todo"
                className="border w-full h-full rounded-lg pl-3"
                {...register("content")}
              />
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                className="py-2 px-5 bg-blue-500 text-white font-bold rounded-md"
              >
                Add
              </button>
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="content"
            as="p"
            className="text-white "
          />
        </form>
      </div>
    </div>
  );
};

export default TodoForm;

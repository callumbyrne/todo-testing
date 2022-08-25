import { ITodo } from "../typeings";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";

interface TodoProps {
    todo: ITodo;
    allTodos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const Todo = ({ todo, allTodos, setTodos }: TodoProps) => {
    const [completed, setCompleted] = useState(todo.completed);

    const date = String(todo.createdAt).slice(0, 10);

    const completedHandler = async () => {
        let update = { completed: !completed };
        await axios.put(`http://localhost:1337/api/todos/${todo._id}`, update, {
            withCredentials: true,
        });
        setCompleted(!completed);
    };

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:1337/api/todos/${todo._id}`, {
            withCredentials: true,
        });
        setTodos(allTodos.filter((t) => t._id !== todo._id));
    };

    return (
        <div className='container border flex justify-between mb-4 px-5 py-3 rounded-lg'>
            <div className='Left flex items-center'>
                <div className='completed mr-3'>
                    {completed ? (
                        <CheckCircleIconSolid
                            className='h-6 w-6 text-blue-500 cursor-pointer'
                            onClick={completedHandler}
                        />
                    ) : (
                        <CheckCircleIcon
                            className='h-6 w-6 text-gray-400 cursor-pointer'
                            onClick={completedHandler}
                        />
                    )}
                </div>
                <div className='content'>{todo.content}</div>
            </div>

            <div className='Right flex'>
                <div className='flex items-center mr-10'>
                    <p>{date}</p>
                </div>
                <div className='delete'>
                    <button
                        className='py-1 px-3 bg-red-500 text-white font-bold rounded-md'
                        onClick={deleteHandler}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Todo;

import { ITodo } from "../typeings";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon as CheckCircleIconSolid,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";

interface TodoProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const Todo = ({ todo, setTodos }: TodoProps) => {
  const [completed, setCompleted] = useState(todo.completed);

  const date = new Date(todo.createdAt).toLocaleDateString();

  const completedHandler = async () => {
    let update = { completed: !completed };
    await axios.put(`/api/todos/${todo._id}`, update, {
      withCredentials: true,
    });
    setCompleted(!completed);
  };

  const deleteHandler = async () => {
    await axios.delete(`/api/todos/${todo._id}`, {
      withCredentials: true,
    });
    setTodos((todos) => todos.filter((t) => t._id !== todo._id));
  };

  return (
    <div className="flex justify-between mb-4 py-2 border-b text-white">
      <div className="Left flex items-center">
        <div className="completed mr-3">
          {completed ? (
            <CheckCircleIconSolid
              className="h-6 w-6 text-blue-500 cursor-pointer"
              onClick={completedHandler}
            />
          ) : (
            <CheckCircleIcon
              className="h-6 w-6 text-gray-400 cursor-pointer"
              onClick={completedHandler}
            />
          )}
        </div>
        <div className="content break-all">{todo.content}</div>
      </div>

      <div className="Right flex items-center">
        <div className="mx-6">
          <p>{date}</p>
        </div>
        <div className="delete">
          <button onClick={deleteHandler}>
            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

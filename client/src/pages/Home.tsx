import { ITodo, User } from "../typeings";
import { Link } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface HomeProps {
  user: User | null;
}

const Home = ({ user }: HomeProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get("/api/todos", { withCredentials: true });
      setTodos(data);
    };

    getTodos();
  }, []);

  const reversedTodos = todos.slice(0).reverse();

  if (!user) {
    return (
      <div className="flex justify-center">
        <div className="container mt-10 max-w-lg w-full border rounded-lg p-10 flex justify-center">
          <p className="text-lg">
            <Link to={"/login"} className="underline">
              Login
            </Link>{" "}
            or{" "}
            <Link to={"/signup"} className="underline">
              Sign Up
            </Link>{" "}
            to see your todos!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col bg-[#5352ed] h-full w-full">
      <Header user={user} />
      <TodoForm setTodos={setTodos} />
      <div className="todos-container w-full h-full p-5 bg-[#323442]">
        {reversedTodos.map((todo) => (
          <Todo todo={todo} key={todo._id} setTodos={setTodos} />
        ))}
      </div>
    </div>
  );
};

export default Home;

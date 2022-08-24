import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../typeings";
import { Link } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";

interface HomeProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Home = ({ user, setUser }: HomeProps) => {
    if (!user) {
        return (
            <div className='flex justify-center'>
                <div className='container mt-10 max-w-lg w-full border rounded-lg p-10 flex justify-center'>
                    <p className='text-lg'>
                        <Link to={"/login"} className='underline'>
                            Login
                        </Link>{" "}
                        or{" "}
                        <Link to={"/signup"} className='underline'>
                            Sign Up
                        </Link>{" "}
                        to see your todos!
                    </p>
                </div>
            </div>
        );
    }

    const todos = user.todos;

    return (
        <div className='flex items-center flex-col'>
            <h2 className='max-w-5xl mt-10 mb-3 font-bold text-2xl'>
                Welcome, {user.name}
            </h2>
            <TodoForm setUser={setUser} />
            <div className='todos-container max-w-5xl w-full border rounded-lg p-10'>
                {todos.map((todo) => (
                    <Todo todo={todo} key={todo._id} />
                ))}
            </div>
        </div>
    );
};

export default Home;

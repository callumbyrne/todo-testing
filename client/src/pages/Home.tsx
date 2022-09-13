import { ITodo, User } from "../typeings";
import { Link } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface HomeProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Home = ({ user, setUser }: HomeProps) => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const getTodos = async () => {
            const { data } = await axios.get("/api/todos", {
                withCredentials: true,
            });
            setTodos(data);
        };

        getTodos();
    }, []);

    const reversedTodos = todos.slice(0).reverse();

    const loginDemo = async () => {
        const values = { email: "demo@gmail.com", password: "password" };
        await axios.post("/api/sessions", values, {
            withCredentials: true,
        });
        const { data } = await axios.get("/api/me", {
            withCredentials: true,
        });
        setUser(data);
    };

    if (!user) {
        return (
            <div className='flex justify-center h-full bg-[#5352ed]'>
                <div className='w-full h-full flex flex-col md:max-w-4xl'>
                    <Header user={user} title='Todos' />
                    <div className='bg-[#323442] flex-grow flex items-center flex-col px-5 rounded-t-3xl'>
                        <div className='container mt-10 max-w-lg px-3 py-5 flex flex-col items-center text-lg md:text-xl'>
                            <p className='text-white font-semibold'>
                                <Link to={"/login"} className='underline'>
                                    Login
                                </Link>{" "}
                                or{" "}
                                <Link to={"/signup"} className='underline'>
                                    Sign Up
                                </Link>{" "}
                                to see your todos!
                            </p>
                            <p
                                onClick={loginDemo}
                                className=' text-white underline font-semibold mt-5 cursor-pointer'>
                                Demo!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex items-center flex-col bg-[#5352ed] w-full'>
            <div className='w-full min-h-screen flex flex-col lg:max-w-4xl'>
                <Header user={user} title='Todos' />
                <TodoForm setTodos={setTodos} />
                <div className='todos-container flex-grow px-5 py-5 bg-[#323442] md:px-10'>
                    {reversedTodos.map((todo) => (
                        <Todo todo={todo} key={todo._id} setTodos={setTodos} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

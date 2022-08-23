import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../typeings";
import { Link } from "react-router-dom";

const Home = ({ user }: { user: User | null }) => {
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
    return (
        <div className='flex items-center flex-col'>
            <h2 className='max-w-5xl mt-10 mb-3 font-bold text-2xl'>
                Welcome, {user.name}
            </h2>
            <div className='todos-container max-w-5xl w-full border rounded-lg p-10'>
                todos
            </div>
        </div>
    );
};

export default Home;

import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../typeings";

const Home = ({ user }: { user: User | null }) => {
    if (!user) {
        return <div>Login or Sign up to see your todos!</div>;
    }
    return (
        <div className='flex justify-center'>
            <div className='max-w-5xl w-full border'>Welcome! {user.name}</div>
        </div>
    );
};

export default Home;

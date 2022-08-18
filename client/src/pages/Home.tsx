import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    session: string;
    iat: number;
    exp: number;
}

const Home = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getCurrentUser = async () => {
            const { data } = await axios.get("http://localhost:1337/api/me", {
                withCredentials: true,
            });
            setUser(data);
        };

        getCurrentUser();
    }, []);

    console.log(user);

    if (!user) {
        return <div>Please login</div>;
    }
    return (
        <div>
            <div>Welcome! {user.name}</div>
        </div>
    );
};

export default Home;

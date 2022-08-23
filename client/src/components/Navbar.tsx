import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../typeings";
import getCurrentUser from "../utils/getCurrentUser";

const Navbar = ({
    user,
    setUser,
}: {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
    const handleLogout = async () => {
        await axios.delete("http://localhost:1337/api/sessions", {
            withCredentials: true,
        });
        return getCurrentUser(setUser);
    };

    return (
        <div className='flex justify-center border-y'>
            <nav className='max-w-5xl w-full py-5 flex justify-center relative'>
                <Link to={"/"}>
                    <div className='font-bold text-3xl tracking-wide'>
                        Todo App
                    </div>
                </Link>

                {user ? (
                    <div className='absolute right-0'>
                        <button
                            onClick={handleLogout}
                            className='py-2 px-10 text-red-500 font-bold border border-red-500 rounded-md'>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='absolute right-0'>
                        <Link to={"/login"}>
                            <button className='py-2 px-10 bg-blue-500 text-white font-bold rounded-md'>
                                Login
                            </button>
                        </Link>
                        <Link to={"/signup"}>
                            <button className='py-2 px-10 text-blue-500 border border-blue-500 font-bold rounded-md ml-5'>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;

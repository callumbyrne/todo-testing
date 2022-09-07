import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../typeings";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = ({
  user,
  setUser,
}: {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await axios.delete("/api/sessions", {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <div className="flex justify-center border-y">
      <nav className="max-w-5xl w-full py-5 flex justify-center items-center relative">
        <Link to={"/"}>
          <div className="font-bold text-3xl tracking-wide">Todo App</div>
        </Link>

        <button
          className="absolute right-0 md:hidden mr-5"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon className="text-black h-8 w-8" />
        </button>

        {user ? (
          <div className="absolute right-0 hidden md:inline-block">
            <button
              onClick={handleLogout}
              className="py-2 px-10 text-red-500 font-bold border border-red-500 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="absolute right-0 hidden md:inline-block">
            <Link to={"/login"}>
              <button className="py-2 px-10 bg-blue-500 text-white font-bold rounded-md">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="py-2 px-10 text-blue-500 border border-blue-500 font-bold rounded-md ml-5">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>

      {isOpen && (
        <Menu setIsOpen={setIsOpen} user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default Navbar;

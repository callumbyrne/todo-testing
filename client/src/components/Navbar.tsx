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
    <div className="flex justify-center bg-[#5352ed] w-full">
      <nav className="max-w-5xl w-full py-5">
        <button
          className="float-right lg:hidden mr-5"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon className="text-white h-8 w-8" />
        </button>

        {user ? (
          <div className="float-right mr-10 hidden lg:inline-block">
            <button
              onClick={handleLogout}
              className="py-2 px-10 text-white font-bold border border-white rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="float-right mr-10 hidden lg:inline-block">
            <Link to={"/login"}>
              <button className="py-2 px-10 bg-blue-500 text-white font-bold rounded-md">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="py-2 px-10 text-white border border-white font-bold rounded-md ml-5">
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

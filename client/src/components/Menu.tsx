import { Link } from "react-router-dom";
import { User } from "../typeings";
import {
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  handleLogout: () => Promise<void>;
}

const Menu = ({ setIsOpen, user, handleLogout }: Props) => {
  return (
    <nav className="fixed inset-0 z-20 flex w-full flex-col bg-[#5352ed]">
      <div className="w-full relative py-5">
        <button onClick={() => setIsOpen(false)} className="float-right mr-5">
          <XMarkIcon className="text-white h-8 w-8" />
        </button>
      </div>

      {user ? (
        <div className="mx-10">
          <button
            onClick={handleLogout}
            className="font-bold text-2xl flex items-center underline text-white"
          >
            Logout{" "}
            <ArrowRightOnRectangleIcon className="text-white h-6 w-6 ml-2" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col mx-10">
          <Link to={"/login"}>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-5 mb-5 font-bold text-2xl flex items-center underline text-white"
            >
              Login{" "}
              <ArrowLeftOnRectangleIcon className="text-white h-6 w-6 ml-2" />
            </button>
          </Link>
          <Link to={"/signup"}>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-5 font-bold text-2xl flex items-center underline text-white"
            >
              Sign Up <UserPlusIcon className="text-white h-6 w-6 ml-2" />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Menu;

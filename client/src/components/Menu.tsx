import { Link } from "react-router-dom";
import { User } from "../typeings";
import {
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  HomeIcon,
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

      <div className="flex flex-col mx-10 text-3xl text-white">
        <Link to={"/"}>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-5 mb-7 font-bold flex items-center"
          >
            Home <HomeIcon className=" h-7 w-7 ml-3" />
          </button>
        </Link>

        {user ? (
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="ml-5 font-bold flex items-center"
          >
            Logout <ArrowRightOnRectangleIcon className="h-7 w-7 ml-3" />
          </button>
        ) : (
          <>
            <Link to={"/login"}>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-5 mb-7 font-bold flex items-center"
              >
                Login <ArrowLeftOnRectangleIcon className="h-7 w-7 ml-3" />
              </button>
            </Link>
            <Link to={"/signup"}>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-5 font-bold flex items-center"
              >
                Sign Up <UserPlusIcon className="h-7 w-7 ml-3" />
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Menu;

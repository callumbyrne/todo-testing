import { User } from "../typeings";
import headerImage from "../../public/Saly-16.png";

const Header = ({ user, title }: { user: User | null; title: string }) => {
  return (
    <div className="bg-[#5352ed] w-full relative">
      <h1 className="font-bold text-5xl tracking-wide text-white w-full text-center my-16">
        {title}
      </h1>
      {user ? (
        <h2 className="my-10 ml-5 font-bold text-2xl text-white tracking-wide md:ml-10">
          Hey there, {user.name}!
        </h2>
      ) : (
        <h2 className="my-10 ml-5 font-bold text-2xl text-white tracking-wide md:ml-10">
          Hey there!
        </h2>
      )}
      <img
        src={headerImage}
        alt="img"
        className="w-60 absolute -right-3 bottom-0"
      />
    </div>
  );
};

export default Header;

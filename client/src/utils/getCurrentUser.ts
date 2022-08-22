import axios from "axios";
import { User } from "../typeings";

const getCurrentUser = async (
    setter: React.Dispatch<React.SetStateAction<User | null>>
) => {
    const { data } = await axios.get("http://localhost:1337/api/me", {
        withCredentials: true,
    });
    setter(data);
};

export default getCurrentUser;

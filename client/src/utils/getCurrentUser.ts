import axios from "axios";

const getCurrentUser = async () => {
    const { data } = await axios.get("http://localhost:1337/api/me", {
        withCredentials: true,
    });
    return data;
};

export default getCurrentUser;

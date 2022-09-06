import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "./typeings";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/me", {
        withCredentials: true,
      });
      setUser(data);
    };
    getUser();
  }, []);
  console.log(user);

  return (
    <div className="font-Noto">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

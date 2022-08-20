import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <div className='font-Noto'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
            </Routes>
        </div>
    );
}

export default App;

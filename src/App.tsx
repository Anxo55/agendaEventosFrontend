import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UsersProfile from "./pages/UsersProfile";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <div className="container mx-auto px-8 py-30">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/usersPRofile" element={<UsersProfile/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

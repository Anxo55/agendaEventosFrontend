import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UsersProfile from "./pages/UsersProfile";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import EventsList from "./pages/EventsList";
import { useState } from "react";
import EventDetail from "./pages/EventDetail";
import EventForm from "./pages/EventForm";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <BrowserRouter>
        {/* Sidebar */}
        <SideBar setSidebarOpen={setSidebarOpen} />

        {/* Contenedor Principal */}
        <div
          className={`flex flex-col min-h-screen transition-all duration-300 ${
            sidebarOpen ? "pl-64" : "pl-0"
          }`}
        >
          <NavBar />
          <div className="flex-grow container mx-auto px-8 py-30">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/usersProfile" element={<UsersProfile />} />
              <Route path="/eventsList" element={<EventsList/>}/>
              <Route path="/events/:id" element={<EventDetail/>}/>
              <Route path="/eventForm" element={<EventForm/>}/>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;

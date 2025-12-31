import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import pages
import Index from "./pages/Gust/Index";
import Navbar from "./components/Gust/Navbar";
import MyResort from "./pages/Host/MyResort";
import HostProfile from "./pages/Host/HostProfile";
import AddResort from "./pages/Host/AddResort";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ConfirmProperty from "./pages/Host/ConfirmProperty";
import Profile from "./pages/Gust/Profile";
import ResortDetails from "./pages/Gust/ResortDetails";
import NotFound from "./pages/Errors/NotFond";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
        <Router>
          <Routes>
            {/* ✅ All main pages use Navbar (header + footer shared) */}
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Index />} />{" "}
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="ResortDetails" element={<ResortDetails />} />
            <Route path="Host/MyResort" element={<MyResort />} />
            <Route path="Host/HostProfile" element={<HostProfile />} />
            <Route path="Host/AddResort" element={<AddResort />} />
            <Route path="/Host/ConfirmProperty" element={<ConfirmProperty />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      
    </>
  );
}

export default App;

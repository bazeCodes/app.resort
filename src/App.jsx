import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Import pages
import Index from "./pages/Gust/Index";
import RootLayout from "./Layout/RootLayout";
import MyResort from "./pages/Host/MyResort";
import HostProfile from "./pages/Host/HostProfile";
import AddResort from "./pages/Host/AddResort";

import Register from "./pages/Gust/Register";
import Login from "./pages/Gust/Login";
import HostRegister from "./pages/Host/HostRegister";
import Profile from "./pages/Gust/Profile";
import ResortDetails from "./pages/Gust/ResortDetails";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ All main pages use RootLayout (header + footer shared) */}
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Index />} />{" "}
            {/* 👈 instead of path="/" */}
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="ResortDetails" element={<ResortDetails />} />
          <Route path="Host/MyResort" element={<MyResort />} />
          <Route path="Host/HostProfile" element={<HostProfile />} />
          <Route path="Host/AddResort" element={<AddResort />} />
          {/* <Route path="Host/HostRegister" element={<HostRegister />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

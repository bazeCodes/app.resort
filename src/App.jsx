import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";

// ✅ Import pages
import Index from "./pages/Gust/Index";
import MyResort from "./pages/Host/MyResort";
import HostProfile from "./pages/Host/HostProfile";
import AddResort from "./pages/Host/AddResort";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ConfirmProperty from "./pages/Host/ConfirmProperty";
import Profile from "./pages/Gust/Profile";
import ResortDetails from "./pages/Gust/ResortDetails";
import NotFound from "./pages/Errors/NotFond";
import Teast from "./pages/Teast";
import Wishlist from "./components/Wishlist";

// Auth
import ProtectedRoute from "./components/ProtectedRoute";
import Properties from "./pages/Gust/Properties";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Index />} />{" "}
          </Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          <Route path="/properties" element={<Properties />} />
          <Route path="/ResortDetails/:id" element={<ResortDetails />} />
          <Route path="/host/MyResort" element={<MyResort />} />
          <Route path="/Host/HostProfile" element={<HostProfile />} />
          <Route path="/Host/AddResort" element={<AddResort />} />
          <Route path="/Host/ConfirmProperty" element={<ConfirmProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist/:propertyId" element={<Wishlist/>}/>
          <Route path="/teast" element={<Teast/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

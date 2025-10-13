import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Coustomer/Index";
import RootLayout from "./Layout/RootLayout";
import Host from "./pages/admin/Host";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Index />} /> {/* 👈 instead of path="/" */}
          <Route path="aboute" element={<div>Aboute</div>} />
        </Route>
        <Route path="/admin" element={<Host />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

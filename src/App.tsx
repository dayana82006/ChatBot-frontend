import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div className="h-screen">
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1 className="p-4">Bienvenido 🚀</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

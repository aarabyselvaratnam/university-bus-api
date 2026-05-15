import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import MorningBuses from './pages/MorningBuses';
import EveningBuses from './pages/EveningBuses';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  );

  // Handle Login
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);

    // Redirect to admin panel
    window.location.href = '/admin';
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Morning Buses */}
        <Route
          path="/morning"
          element={<MorningBuses />}
        />

        {/* Evening Buses */}
        <Route
          path="/evening"
          element={<EveningBuses />}
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            token ? (
              <AdminPanel
                token={token}
                onLogout={handleLogout}
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
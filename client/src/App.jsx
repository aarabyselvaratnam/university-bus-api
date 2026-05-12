import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MorningBuses from './pages/MorningBuses';
import EveningBuses from './pages/EveningBuses';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/morning" element={<MorningBuses />} />
        <Route path="/evening" element={<EveningBuses />} />
        <Route
          path="/admin"
          element={
            isAdminLoggedIn
              ? <AdminPanel onLogout={() => setIsAdminLoggedIn(false)} />
              : <Login onLogin={() => setIsAdminLoggedIn(true)} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
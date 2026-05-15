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
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/morning" element={<MorningBuses />} />
        <Route path="/evening" element={<EveningBuses />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            token
              ? <AdminPanel token={token} onLogout={() => setToken(null)} />
              : <Login onLogin={(t) => setToken(t)} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('❌ Incorrect password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>⚙️ Admin Login</h2>
        <p style={styles.subtitle}>Enter password to access the admin panel</p>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  title: {
    fontSize: '24px',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#dc3545',
    fontSize: '14px',
  },
};

export default Login;
import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const token = res.data.token;
      onLogin(token);
    } catch (err) {
      setError('❌ Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>🔐</span>
        </div>

        <h2 style={styles.title}>Admin Login</h2>

        <p style={styles.subtitle}>
          University Bus Tracker Control Panel
        </p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          onClick={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Logging in...' : '🔓 Login to Admin Panel'}
        </button>

        <p style={styles.hint}>
          New administrator?{' '}
          <span
            style={{
              color: '#d4af37',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => (window.location.href = '/register')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6f9',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    borderTop: '5px solid #d4af37',
  },

  iconContainer: {
    backgroundColor: '#f4f6f9',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: '32px',
  },

  title: {
    fontSize: '24px',
    color: '#1a2456',
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },

  inputGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  label: {
    fontSize: '13px',
    color: '#1a2456',
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '2px solid #e0e0e0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },

  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a2456',
    color: '#d4af37',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '5px',
  },

  error: {
    color: '#dc3545',
    fontSize: '14px',
    textAlign: 'center',
  },

  hint: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    lineHeight: '1.5',
  },
};

export default Login;
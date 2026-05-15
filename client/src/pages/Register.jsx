import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username,
          password,
        }
      );

      setSuccess(
        `✅ Admin "${res.data.user.username}" registered successfully! Redirecting to login...`
      );

      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          '❌ Registration failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>🛡️</span>
        </div>

        <h2 style={styles.title}>Register Admin</h2>

        <p style={styles.subtitle}>
          Create a new administrator account
        </p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>

          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>

          <div style={styles.passwordContainer}>
            <input
              type={
                showPassword ? 'text' : 'password'
              }
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={styles.passwordInput}
            />

            <span
              style={styles.eyeIcon}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Confirm Password
          </label>

          <div style={styles.passwordContainer}>
            <input
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) =>
                setConfirm(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                handleRegister()
              }
              style={styles.passwordInput}
            />

            <span
              style={styles.eyeIcon}
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>
        </div>

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        {success && (
          <p style={styles.success}>{success}</p>
        )}

        <button
          onClick={handleRegister}
          style={styles.button}
          disabled={loading}
        >
          {loading
            ? 'Registering...'
            : '🛡️ Register Admin'}
        </button>

        <p style={styles.loginLink}>
          Already have an account?{' '}
          <span
            style={styles.link}
            onClick={() => navigate('/admin')}
          >
            Login here
          </span>
        </p>

        <p style={styles.hint}>
          Registration is restricted to
          authorized university staff only.
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
    borderTop: '5px solid #1a2456',
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
  },

  passwordContainer: {
    position: 'relative',
    width: '100%',
  },

  passwordInput: {
    width: '100%',
    padding: '12px',
    paddingRight: '45px',
    borderRadius: '5px',
    border: '2px solid #e0e0e0',
    fontSize: '15px',
    outline: 'none',
  },

  eyeIcon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#666',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#d4af37',
    color: '#1a2456',
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

  success: {
    color: '#28a745',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  loginLink: {
    fontSize: '13px',
    color: '#666',
  },

  link: {
    color: '#1a2456',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

  hint: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    lineHeight: '1.5',
  },
};

export default Register;
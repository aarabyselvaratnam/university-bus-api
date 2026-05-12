import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel({ onLogout }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = () => {
    axios.get('http://localhost:5000/api/schedules')
      .then((res) => {
        setSchedules(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load schedules.');
        setLoading(false);
      });
  };

  const handleUpdate = (id, status, remarks) => {
    axios.put(`http://localhost:5000/api/schedules/${id}`, { status, remarks })
      .then(() => {
        setMessage('✅ Status updated successfully!');
        fetchSchedules();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(() => {
        setMessage('❌ Failed to update status.');
      });
  };

  if (loading) return <div style={styles.center}>Loading...</div>;
  if (error) return <div style={styles.center}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.title}>⚙️ Admin Panel — Update Bus Status</h2>
          <p style={styles.subtitle}>Update real-time status of buses</p>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          🔒 Logout
        </button>
      </div>
      {message && <div style={styles.message}>{message}</div>}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Bus Name</th>
            <th style={styles.th}>Departure</th>
            <th style={styles.th}>Direction</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Remarks</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <ScheduleRow
              key={schedule._id}
              schedule={schedule}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScheduleRow({ schedule, onUpdate }) {
  const [status, setStatus] = useState(schedule.status);
  const [remarks, setRemarks] = useState(schedule.remarks || '');

  const getStatusColor = (s) => {
    if (s === 'on-time') return '#28a745';
    if (s === 'delayed') return '#ffc107';
    if (s === 'cancelled') return '#dc3545';
    return '#333';
  };

  return (
    <tr style={styles.tableRow}>
      <td style={styles.td}>{schedule.bus?.busName}</td>
      <td style={styles.td}>{schedule.departureTime}</td>
      <td style={styles.td}>
        {schedule.bus?.route?.direction === 'toUniversity' ? '→ University' : '→ Town'}
      </td>
      <td style={styles.td}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ ...styles.select, borderColor: getStatusColor(status) }}
        >
          <option value="on-time">on-time</option>
          <option value="delayed">delayed</option>
          <option value="cancelled">cancelled</option>
        </select>
      </td>
      <td style={styles.td}>
        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add remarks..."
          style={styles.input}
        />
      </td>
      <td style={styles.td}>
        <button
          style={styles.button}
          onClick={() => onUpdate(schedule._id, status, remarks)}
        >
          Save
        </button>
      </td>
    </tr>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '26px',
    color: '#1a1a2e',
    marginBottom: '5px',
  },
  subtitle: {
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '10px 20px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    backgroundColor: '#1a1a2e',
  },
  th: {
    padding: '15px',
    color: '#ffffff',
    textAlign: 'left',
    fontSize: '14px',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '12px 15px',
    fontSize: '14px',
    color: '#333',
  },
  select: {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '2px solid',
    fontSize: '13px',
    cursor: 'pointer',
  },
  input: {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '13px',
    width: '180px',
  },
  button: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '7px 15px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  center: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
};

export default AdminPanel;
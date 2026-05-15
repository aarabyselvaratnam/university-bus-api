import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel({ token, onLogout }) {
  const [schedules, setSchedules] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [activeTab, setActiveTab] = useState('schedules');

  const [newBus, setNewBus] = useState({
    busName: '', origin: '', destination: '', type: 'private', route: ''
  });

  const [newSchedule, setNewSchedule] = useState({
    bus: '', departureTime: '', status: 'on-time', remarks: ''
  });

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [schedRes, busRes, routeRes] = await Promise.all([
        axios.get('http://localhost:5000/api/schedules'),
        axios.get('http://localhost:5000/api/buses'),
        axios.get('http://localhost:5000/api/routes'),
      ]);
      setSchedules(schedRes.data.data);
      setBuses(busRes.data.data);
      setRoutes(routeRes.data.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCreateBus = async () => {
    try {
      await axios.post('http://localhost:5000/api/buses', newBus, authHeaders);
      showMessage('✅ Bus created successfully!');
      setNewBus({ busName: '', origin: '', destination: '', type: 'private', route: '' });
      fetchAll();
    } catch {
      showMessage('❌ Failed to create bus.', 'error');
    }
  };

  const handleDeleteBus = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/buses/${id}`, authHeaders);
      showMessage('✅ Bus deleted successfully!');
      fetchAll();
    } catch {
      showMessage('❌ Failed to delete bus.', 'error');
    }
  };

  const handleUpdateSchedule = async (id, status, remarks) => {
    try {
      await axios.put(`http://localhost:5000/api/schedules/${id}`, { status, remarks }, authHeaders);
      showMessage('✅ Schedule updated successfully!');
      fetchAll();
    } catch {
      showMessage('❌ Failed to update schedule.', 'error');
    }
  };

  const handleCreateSchedule = async () => {
    try {
      const stopTimes = [
        { stop: 'University of Vavuniya', time: newSchedule.departureTime }
      ];
      await axios.post('http://localhost:5000/api/schedules', {
        ...newSchedule,
        stopTimes,
        daysOperating: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      }, authHeaders);
      showMessage('✅ Schedule created successfully!');
      setNewSchedule({ bus: '', departureTime: '', status: 'on-time', remarks: '' });
      fetchAll();
    } catch {
      showMessage('❌ Failed to create schedule.', 'error');
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`, authHeaders);
      showMessage('✅ Schedule deleted successfully!');
      fetchAll();
    } catch {
      showMessage('❌ Failed to delete schedule.', 'error');
    }
  };

  if (loading) return <div style={styles.center}>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.title}>⚙️ Admin Control Panel</h2>
          <p style={styles.subtitle}>University Bus Tracker — Transport Management</p>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>🔒 Logout</button>
      </div>

      {/* Message */}
      {message && (
        <div style={messageType === 'success' ? styles.successMessage : styles.errorMessage}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === 'schedules' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('schedules')}
        >
          🕐 Schedules ({schedules.length})
        </button>
        <button
          style={activeTab === 'buses' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('buses')}
        >
          🚌 Buses ({buses.length})
        </button>
      </div>

      {/* Buses Tab */}
      {activeTab === 'buses' && (
        <div>
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>➕ Add New Bus</h3>
            <div style={styles.formGrid}>
              <input
                style={styles.formInput}
                placeholder="Bus Name (e.g. Vavuniya - Mannar 6:15)"
                value={newBus.busName}
                onChange={(e) => setNewBus({ ...newBus, busName: e.target.value })}
              />
              <input
                style={styles.formInput}
                placeholder="Origin"
                value={newBus.origin}
                onChange={(e) => setNewBus({ ...newBus, origin: e.target.value })}
              />
              <input
                style={styles.formInput}
                placeholder="Destination"
                value={newBus.destination}
                onChange={(e) => setNewBus({ ...newBus, destination: e.target.value })}
              />
              <select
                style={styles.formInput}
                value={newBus.type}
                onChange={(e) => setNewBus({ ...newBus, type: e.target.value })}
              >
                <option value="private">Private</option>
                <option value="government">Government</option>
              </select>
              <select
                style={styles.formInput}
                value={newBus.route}
                onChange={(e) => setNewBus({ ...newBus, route: e.target.value })}
              >
                <option value="">Select Route</option>
                {routes.map((r) => (
                  <option key={r._id} value={r._id}>{r.routeName}</option>
                ))}
              </select>
              <button style={styles.addButton} onClick={handleCreateBus}>
                ➕ Add Bus
              </button>
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Bus Name</th>
                <th style={styles.th}>Origin</th>
                <th style={styles.th}>Destination</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id} style={styles.tableRow}>
                  <td style={styles.td}>{bus.busName}</td>
                  <td style={styles.td}>{bus.origin}</td>
                  <td style={styles.td}>{bus.destination}</td>
                  <td style={styles.td}>
                    <span style={bus.type === 'government' ? styles.govBadge : styles.privateBadge}>
                      {bus.type}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDeleteBus(bus._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Schedules Tab */}
      {activeTab === 'schedules' && (
        <div>
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>➕ Add New Schedule</h3>
            <div style={styles.formGrid}>
              <select
                style={styles.formInput}
                value={newSchedule.bus}
                onChange={(e) => setNewSchedule({ ...newSchedule, bus: e.target.value })}
              >
                <option value="">Select Bus</option>
                {buses.map((b) => (
                  <option key={b._id} value={b._id}>{b.busName}</option>
                ))}
              </select>
              <input
                style={styles.formInput}
                placeholder="Departure Time (e.g. 07:30)"
                value={newSchedule.departureTime}
                onChange={(e) => setNewSchedule({ ...newSchedule, departureTime: e.target.value })}
              />
              <select
                style={styles.formInput}
                value={newSchedule.status}
                onChange={(e) => setNewSchedule({ ...newSchedule, status: e.target.value })}
              >
                <option value="on-time">on-time</option>
                <option value="delayed">delayed</option>
                <option value="cancelled">cancelled</option>
              </select>
              <input
                style={styles.formInput}
                placeholder="Remarks (optional)"
                value={newSchedule.remarks}
                onChange={(e) => setNewSchedule({ ...newSchedule, remarks: e.target.value })}
              />
              <button style={styles.addButton} onClick={handleCreateSchedule}>
                ➕ Add Schedule
              </button>
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Bus Name</th>
                <th style={styles.th}>Departure</th>
                <th style={styles.th}>Direction</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Remarks</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <ScheduleRow
                  key={schedule._id}
                  schedule={schedule}
                  onUpdate={handleUpdateSchedule}
                  onDelete={handleDeleteSchedule}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ScheduleRow({ schedule, onUpdate, onDelete }) {
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
      <td style={styles.td}><strong>{schedule.departureTime}</strong></td>
      <td style={styles.td}>
        {schedule.bus?.route?.direction === 'toUniversity'
          ? <span style={styles.toUniBadge}>→ University</span>
          : <span style={styles.toTownBadge}>→ Town</span>
        }
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={styles.saveButton}
            onClick={() => onUpdate(schedule._id, status, remarks)}
          >
            💾 Save
          </button>
          <button
            style={styles.deleteButton}
            onClick={() => onDelete(schedule._id)}
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderLeft: '5px solid #d4af37',
  },
  title: {
    fontSize: '24px',
    color: '#1a2456',
    marginBottom: '5px',
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
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
  successMessage: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px 20px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderLeft: '4px solid #28a745',
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px 20px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderLeft: '4px solid #dc3545',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 25px',
    borderRadius: '5px',
    border: '2px solid #1a2456',
    backgroundColor: '#ffffff',
    color: '#1a2456',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  activeTab: {
    padding: '10px 25px',
    borderRadius: '5px',
    border: '2px solid #1a2456',
    backgroundColor: '#1a2456',
    color: '#d4af37',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderTop: '3px solid #d4af37',
  },
  formTitle: {
    fontSize: '16px',
    color: '#1a2456',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  formGrid: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  formInput: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: '2px solid #e0e0e0',
    fontSize: '14px',
    minWidth: '180px',
    outline: 'none',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
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
    backgroundColor: '#1a2456',
  },
  th: {
    padding: '15px',
    color: '#d4af37',
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
  saveButton: {
    backgroundColor: '#1a2456',
    color: '#d4af37',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  govBadge: {
    backgroundColor: '#1a2456',
    color: '#d4af37',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  privateBadge: {
    backgroundColor: '#d4af37',
    color: '#1a2456',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  toUniBadge: {
    backgroundColor: '#e3f2fd',
    color: '#1a2456',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  toTownBadge: {
    backgroundColor: '#fff8e1',
    color: '#d4af37',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
};

export default AdminPanel;
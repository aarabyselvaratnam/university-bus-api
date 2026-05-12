import { useEffect, useState } from 'react';
import axios from 'axios';

function EveningBuses() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/schedules?direction=fromUniversity')
      .then((res) => {
        setSchedules(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load schedules. Make sure the server is running.');
        setLoading(false);
      });
  }, []);

  const getStatusStyle = (status) => {
    if (status === 'on-time') return { ...styles.badge, backgroundColor: '#28a745' };
    if (status === 'delayed') return { ...styles.badge, backgroundColor: '#ffc107', color: '#000' };
    if (status === 'cancelled') return { ...styles.badge, backgroundColor: '#dc3545' };
    return styles.badge;
  };

  if (loading) return <div style={styles.center}>Loading evening buses...</div>;
  if (error) return <div style={styles.center}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌇 Evening Buses — From University</h2>
      <p style={styles.subtitle}>Mannar Side → University of Vavuniya → Vavuniya Town</p>
      <div style={styles.grid}>
        {schedules.map((schedule) => (
          <div key={schedule._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.busName}>{schedule.bus.busName}</span>
              <span style={getStatusStyle(schedule.status)}>{schedule.status}</span>
            </div>
            <div style={styles.cardBody}>
              <p style={styles.info}>
                🕐 At University: <strong>{schedule.stopTimes[0]?.time}</strong>
              </p>
              <p style={styles.info}>
                🚌 Type: <strong>{schedule.bus.type}</strong>
              </p>
              <p style={styles.info}>
                📍 Origin: <strong>{schedule.bus.origin}</strong>
              </p>
              {schedule.remarks && (
                <p style={styles.remarks}>⚠️ {schedule.remarks}</p>
              )}
              <div style={styles.stopSection}>
                <p style={styles.stopTitle}>Stop Times:</p>
                {schedule.stopTimes.map((st, index) => (
                  <div key={index} style={styles.stopRow}>
                    <span style={styles.stopName}>{st.stop}</span>
                    <span style={styles.stopTime}>{st.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    fontSize: '26px',
    color: '#1a1a2e',
    marginBottom: '5px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '25px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#e94560',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  busName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardBody: {
    padding: '15px',
  },
  info: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#333',
  },
  remarks: {
    color: '#e94560',
    fontSize: '13px',
    margin: '8px 0',
  },
  stopSection: {
    marginTop: '10px',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
  },
  stopTitle: {
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#555',
    marginBottom: '5px',
  },
  stopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    padding: '3px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  stopName: {
    color: '#333',
  },
  stopTime: {
    color: '#e94560',
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
};

export default EveningBuses;
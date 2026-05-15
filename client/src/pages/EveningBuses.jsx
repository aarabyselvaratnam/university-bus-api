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
      .catch(() => {
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
      <div style={styles.header}>
        <h2 style={styles.title}>🌇 Evening Buses — From University</h2>
        <p style={styles.subtitle}>Mannar Side → University of Vavuniya → Vavuniya Town</p>
        <div style={styles.countBadge}>{schedules.length} buses available</div>
      </div>
      <div style={styles.grid}>
        {schedules.map((schedule) => (
          <div key={schedule._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.busName}>{schedule.bus.busName}</span>
              <span style={getStatusStyle(schedule.status)}>{schedule.status}</span>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>🕐 At University</span>
                <span style={styles.infoValue}>{schedule.stopTimes[0]?.time}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>🚌 Type</span>
                <span style={styles.infoValue}>{schedule.bus.type}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>📍 Origin</span>
                <span style={styles.infoValue}>{schedule.bus.origin}</span>
              </div>
              {schedule.remarks && (
                <div style={styles.remarks}>⚠️ {schedule.remarks}</div>
              )}
              <div style={styles.stopSection}>
                <p style={styles.stopTitle}>📌 Stop Times</p>
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
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    color: '#1a2456',
    marginBottom: '5px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '10px',
  },
  countBadge: {
    display: 'inline-block',
    backgroundColor: '#d4af37',
    color: '#1a2456',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    borderTop: '4px solid #1a2456',
  },
  cardHeader: {
    backgroundColor: '#d4af37',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  busName: {
    color: '#1a2456',
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
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '6px 0',
    fontSize: '14px',
  },
  infoLabel: {
    color: '#666',
  },
  infoValue: {
    color: '#1a2456',
    fontWeight: 'bold',
  },
  remarks: {
    color: '#dc3545',
    fontSize: '13px',
    margin: '8px 0',
    padding: '8px',
    backgroundColor: '#fff5f5',
    borderRadius: '5px',
  },
  stopSection: {
    marginTop: '10px',
    borderTop: '2px solid #f0f0f0',
    paddingTop: '10px',
  },
  stopTitle: {
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#1a2456',
    marginBottom: '8px',
  },
  stopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    padding: '4px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  stopName: {
    color: '#444',
  },
  stopTime: {
    color: '#1a2456',
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
};

export default EveningBuses;
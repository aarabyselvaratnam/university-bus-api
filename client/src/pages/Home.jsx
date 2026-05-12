import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>University of Vavuniya</h1>
          <h2 style={styles.subtitle}>Bus Time Slot Tracker</h2>
          <p style={styles.description}>
            Track real-time bus schedules between Vavuniya town and University of Vavuniya.
            View stop-by-stop timings for morning and evening buses.
          </p>
          <div style={styles.buttonContainer}>
            <button
              style={styles.morningButton}
              onClick={() => navigate('/morning')}
            >
              <span style={styles.buttonIcon}>🌅</span>
              <span style={styles.buttonText}>Buses To University</span>
              <span style={styles.buttonSub}>Vavuniya Town → University</span>
            </button>
            <button
              style={styles.eveningButton}
              onClick={() => navigate('/evening')}
            >
              <span style={styles.buttonIcon}>🌇</span>
              <span style={styles.buttonText}>Buses From University</span>
              <span style={styles.buttonSub}>Mannar Side → University → Town</span>
            </button>
          </div>
        </div>
      </div>
      <div style={styles.infoSection}>
        <div style={styles.infoCard}>
          <span style={styles.infoIcon}>🚌</span>
          <h3 style={styles.infoTitle}>23 Bus Services</h3>
          <p style={styles.infoText}>Government and private buses tracked daily</p>
        </div>
        <div style={styles.infoCard}>
          <span style={styles.infoIcon}>📍</span>
          <h3 style={styles.infoTitle}>12 Stops Covered</h3>
          <p style={styles.infoText}>From Vavuniya town to Mannar side villages</p>
        </div>
        <div style={styles.infoCard}>
          <span style={styles.infoIcon}>⏰</span>
          <h3 style={styles.infoTitle}>6:15 AM — 5:15 PM</h3>
          <p style={styles.infoText}>Full day coverage for students</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '80px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '700px',
  },
  title: {
    fontSize: '36px',
    color: '#ffffff',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#e94560',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    color: '#aaaaaa',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  morningButton: {
    backgroundColor: '#e94560',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '20px 35px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '200px',
    boxShadow: '0 4px 15px rgba(233, 69, 96, 0.4)',
  },
  eveningButton: {
    backgroundColor: '#0f3460',
    color: '#ffffff',
    border: '2px solid #e94560',
    borderRadius: '12px',
    padding: '20px 35px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '200px',
    boxShadow: '0 4px 15px rgba(15, 52, 96, 0.4)',
  },
  buttonIcon: {
    fontSize: '28px',
  },
  buttonText: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  buttonSub: {
    fontSize: '12px',
    opacity: 0.8,
  },
  infoSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '50px 20px',
    flexWrap: 'wrap',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  infoIcon: {
    fontSize: '32px',
  },
  infoTitle: {
    fontSize: '16px',
    color: '#1a1a2e',
    margin: '10px 0 5px',
  },
  infoText: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.4',
  },
};

export default Home;
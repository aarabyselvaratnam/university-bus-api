import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>🎓 University of Vavuniya</div>
          <h1 style={styles.title}>Bus Time Slot Tracker</h1>
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
        <div style={styles.infoCard}>
          <span style={styles.infoIcon}>🔒</span>
          <h3 style={styles.infoTitle}>Secure Admin Panel</h3>
          <p style={styles.infoText}>JWT protected admin control panel</p>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          University of Vavuniya — Department of Information Technology
        </p>
        <p style={styles.footerText}>
          Web Services and Server Technology (IT2234) — ICA 03
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  },
  hero: {
    background: 'linear-gradient(135deg, #1a2456 0%, #0d1635 50%, #1a2456 100%)',
    padding: '80px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '700px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    color: '#d4af37',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '20px',
    border: '1px solid #d4af37',
  },
  title: {
    fontSize: '42px',
    color: '#ffffff',
    marginBottom: '20px',
    letterSpacing: '1px',
  },
  description: {
    fontSize: '16px',
    color: '#aaaaaa',
    marginBottom: '40px',
    lineHeight: '1.8',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  morningButton: {
    backgroundColor: '#d4af37',
    color: '#1a2456',
    border: 'none',
    borderRadius: '12px',
    padding: '20px 35px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '200px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
  },
  eveningButton: {
    backgroundColor: 'transparent',
    color: '#d4af37',
    border: '2px solid #d4af37',
    borderRadius: '12px',
    padding: '20px 35px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '200px',
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
    borderTop: '4px solid #d4af37',
  },
  infoIcon: {
    fontSize: '32px',
  },
  infoTitle: {
    fontSize: '16px',
    color: '#1a2456',
    margin: '10px 0 5px',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.4',
  },
  footer: {
    backgroundColor: '#1a2456',
    padding: '20px',
    textAlign: 'center',
  },
  footerText: {
    color: '#aaaaaa',
    fontSize: '13px',
    marginBottom: '5px',
  },
};

export default Home;
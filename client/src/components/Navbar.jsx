import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.brand}>🚌 University Bus Tracker</div>
        <div style={styles.date}>📅 {today}</div>
      </div>
      <div style={styles.links}>
        <Link to="/" style={isActive('/') ? styles.activeLink : styles.link}>
          🏠 Home
        </Link>
        <Link to="/morning" style={isActive('/morning') ? styles.activeLink : styles.link}>
          🌅 Morning
        </Link>
        <Link to="/evening" style={isActive('/evening') ? styles.activeLink : styles.link}>
          🌇 Evening
        </Link>
        <Link to="/admin" style={isActive('/admin') ? styles.activeAdminLink : styles.adminLink}>
          ⚙️ Admin
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#1a2456',
    padding: '15px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  brand: {
    color: '#d4af37',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  date: {
    color: '#aaaaaa',
    fontSize: '12px',
  },
  links: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  link: {
    color: '#aaaaaa',
    fontSize: '15px',
    padding: '8px 15px',
    borderRadius: '5px',
  },
  activeLink: {
    color: '#1a2456',
    fontSize: '15px',
    padding: '8px 15px',
    borderRadius: '5px',
    backgroundColor: '#d4af37',
    fontWeight: 'bold',
  },
  adminLink: {
    color: '#d4af37',
    fontSize: '15px',
    padding: '8px 15px',
    borderRadius: '5px',
    border: '1px solid #d4af37',
  },
  activeAdminLink: {
    color: '#1a2456',
    fontSize: '15px',
    padding: '8px 15px',
    borderRadius: '5px',
    backgroundColor: '#d4af37',
    fontWeight: 'bold',
  },
};

export default Navbar;
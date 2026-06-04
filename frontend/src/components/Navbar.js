import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/dashboard" style={styles.logo}>
          <span style={styles.logoText}>📋 Avidus</span>
        </Link>

        <div style={styles.menu}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/tasks" style={styles.link}>
            Tasks
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin/users" style={styles.link}>
                Users
              </Link>
              <Link to="/admin/activity" style={styles.link}>
                Activity Logs
              </Link>
              <Link to="/admin/analytics" style={styles.link}>
                Analytics
              </Link>
            </>
          )}
        </div>

        <div style={styles.userMenu}>
          <span style={styles.userName}>
            👤 {user?.name} {isAdmin && '(Admin)'}
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '15px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  logo: {
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white'
  },
  logoText: {
    fontSize: '24px'
  },
  menu: {
    display: 'flex',
    gap: '30px',
    flex: 1,
    justifyContent: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 0',
    borderBottom: '2px solid transparent',
    transition: 'border-color 0.3s',
    cursor: 'pointer'
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  userName: {
    fontSize: '14px',
    color: '#ecf0f1'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s'
  }
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI, tasksAPI } from '../utils/api';
import { Card, Alert } from '../components/UI';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        let userStats = { totalUsers: 0, activeUsers: 0, inactiveUsers: 0 };
        let taskStats = { totalTasks: 0, completedTasks: 0, pendingTasks: 0 };

        if (isAdmin) {
          const userResponse = await usersAPI.getUserStats();
          userStats = userResponse.data.stats;
        }

        const taskResponse = await tasksAPI.getTaskStats();
        taskStats = taskResponse.data.stats;

        setStats({
          totalUsers: userStats.totalUsers,
          totalTasks: taskStats.totalTasks,
          completedTasks: taskStats.completedTasks,
          pendingTasks: taskStats.pendingTasks
        });
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin, user]);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome, {user?.name}!</h1>
        {isAdmin && <p style={styles.adminBadge}>👑 Administrator Dashboard</p>}

        {error && <Alert message={error} type="error" />}

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stats.totalTasks}</h3>
                <p style={styles.statLabel}>Total Tasks</p>
              </div>
            </Card>

            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#27ae60' }}>
                  {stats.completedTasks}
                </h3>
                <p style={styles.statLabel}>Completed Tasks</p>
              </div>
            </Card>

            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#f39c12' }}>
                  {stats.pendingTasks}
                </h3>
                <p style={styles.statLabel}>Pending Tasks</p>
              </div>
            </Card>

            {isAdmin && (
              <Card style={styles.statCard}>
                <div style={styles.statContent}>
                  <h3 style={styles.statValue}>{stats.totalUsers}</h3>
                  <p style={styles.statLabel}>Total Users</p>
                </div>
              </Card>
            )}
          </div>
        )}

        <Card style={styles.quickActionsCard}>
          <h2 style={styles.cardTitle}>Quick Actions</h2>
          <div style={styles.actionGrid}>
            <Link to="/tasks" style={styles.actionLink}>
              📝 View My Tasks
            </Link>
            <Link to="/tasks" state={{ openCreate: true }} style={styles.actionLink}>
              ➕ Create New Task
            </Link>
            {isAdmin && (
              <>
                <Link to="/admin/users" style={styles.actionLink}>
                  👥 Manage Users
                </Link>
                <Link to="/admin/activity" style={styles.actionLink}>
                  📊 View Activity Logs
                </Link>
                <Link to="/admin/analytics" style={styles.actionLink}>
                  📈 Analytics
                </Link>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  title: {
    fontSize: '32px',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  adminBadge: {
    fontSize: '14px',
    color: '#f39c12',
    marginBottom: '30px',
    fontWeight: 'bold'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    textAlign: 'center'
  },
  statContent: {
    padding: '20px'
  },
  statValue: {
    fontSize: '36px',
    color: '#007bff',
    margin: '10px 0'
  },
  statLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: 0
  },
  quickActionsCard: {
    marginTop: '30px'
  },
  cardTitle: {
    fontSize: '20px',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  actionLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #007bff',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    cursor: 'pointer'
  }
};

export default Dashboard;

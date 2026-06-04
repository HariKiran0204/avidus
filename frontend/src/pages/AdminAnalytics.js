import React, { useState, useEffect } from 'react';
import { usersAPI, tasksAPI, activityAPI } from '../utils/api';
import { Card, Alert } from '../components/UI';
import Navbar from '../components/Navbar';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    users: {},
    tasks: {},
    activity: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [userResponse, taskResponse, activityResponse] = await Promise.all([
          usersAPI.getUserStats(),
          tasksAPI.getTaskStats(),
          activityAPI.getActivityStats()
        ]);

        setAnalytics({
          users: userResponse.data.stats,
          tasks: taskResponse.data.stats,
          activity: activityResponse.data.stats
        });
      } catch (err) {
        setError('Failed to load analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <p>Loading analytics...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>📈 Analytics & Reports</h1>

        {error && <Alert message={error} type="error" />}

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>User Analytics</h2>
          <div style={styles.grid}>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{analytics.users.totalUsers}</h3>
                <p style={styles.statLabel}>Total Users</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#27ae60' }}>
                  {analytics.users.activeUsers}
                </h3>
                <p style={styles.statLabel}>Active Users</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#e74c3c' }}>
                  {analytics.users.inactiveUsers}
                </h3>
                <p style={styles.statLabel}>Inactive Users</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#f39c12' }}>
                  {analytics.users.adminUsers}
                </h3>
                <p style={styles.statLabel}>Admin Users</p>
              </div>
            </Card>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Task Analytics</h2>
          <div style={styles.grid}>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{analytics.tasks.totalTasks}</h3>
                <p style={styles.statLabel}>Total Tasks</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#27ae60' }}>
                  {analytics.tasks.completedTasks}
                </h3>
                <p style={styles.statLabel}>Completed Tasks</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#f39c12' }}>
                  {analytics.tasks.pendingTasks}
                </h3>
                <p style={styles.statLabel}>Pending Tasks</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#3498db' }}>
                  {analytics.tasks.inProgressTasks}
                </h3>
                <p style={styles.statLabel}>In Progress Tasks</p>
              </div>
            </Card>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Activity (Last 24 Hours)</h2>
          <div style={styles.grid}>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>
                  {analytics.activity.last24Hours?.logins || 0}
                </h3>
                <p style={styles.statLabel}>Logins</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#27ae60' }}>
                  {analytics.activity.last24Hours?.taskCreations || 0}
                </h3>
                <p style={styles.statLabel}>Tasks Created</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#3498db' }}>
                  {analytics.activity.last24Hours?.taskUpdates || 0}
                </h3>
                <p style={styles.statLabel}>Tasks Updated</p>
              </div>
            </Card>
            <Card style={styles.statCard}>
              <div style={styles.statContent}>
                <h3 style={{ ...styles.statValue, color: '#e74c3c' }}>
                  {analytics.activity.last24Hours?.taskDeletions || 0}
                </h3>
                <p style={styles.statLabel}>Tasks Deleted</p>
              </div>
            </Card>
          </div>
        </div>
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
    marginBottom: '40px'
  },
  section: {
    marginBottom: '50px'
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  statCard: {
    textAlign: 'center'
  },
  statContent: {
    padding: '30px 20px'
  },
  statValue: {
    fontSize: '40px',
    color: '#007bff',
    margin: '10px 0'
  },
  statLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: 0
  }
};

export default AdminAnalytics;

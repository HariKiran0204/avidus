import React, { useState, useEffect } from 'react';
import { activityAPI } from '../utils/api';
import { Card, Select, Table, Pagination, Alert } from '../components/UI';
import Navbar from '../components/Navbar';

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await activityAPI.getActivityLogs(page, 20, actionFilter);
      setLogs(response.data.logs);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Failed to load activity logs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'LOGIN', label: 'Login' },
    { value: 'CREATE_TASK', label: 'Create Task' },
    { value: 'UPDATE_TASK', label: 'Update Task' },
    { value: 'DELETE_TASK', label: 'Delete Task' },
    { value: 'VIEW_ALL_USERS', label: 'View Users' },
    { value: 'UPDATE_USER_STATUS', label: 'Update User Status' },
    { value: 'DELETE_USER', label: 'Delete User' }
  ];

  const columns = [
    {
      key: 'userId',
      label: 'User',
      render: (row) => row.userId?.name || 'Unknown'
    },
    { key: 'action', label: 'Action' },
    { key: 'description', label: 'Description' },
    {
      key: 'createdAt',
      label: 'Timestamp',
      render: (row) => new Date(row.createdAt).toLocaleString()
    },
    {
      key: 'ipAddress',
      label: 'IP Address',
      render: (row) => row.ipAddress || 'N/A'
    }
  ];

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>📊 Activity Logs</h1>

        {error && <Alert message={error} type="error" onClose={() => setError('')} />}

        <Card style={styles.filterCard}>
          <h3 style={styles.filterTitle}>Filters</h3>
          <div style={styles.filterGrid}>
            <Select
              options={actionOptions}
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </Card>

        <Card>
          <Table columns={columns} data={logs} loading={loading} />
          {logs.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
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
    marginBottom: '30px'
  },
  filterCard: {
    marginBottom: '20px'
  },
  filterTitle: {
    margin: '0 0 15px 0',
    fontSize: '16px',
    color: '#2c3e50'
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  }
};

export default AdminActivityLogs;

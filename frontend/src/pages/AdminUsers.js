import React, { useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';
import { Card, Button, Select, Table, Pagination, Alert } from '../components/UI';
import Navbar from '../components/Navbar';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await usersAPI.getAllUsers(page, 10);
      let filteredUsers = response.data.users;

      if (statusFilter) {
        filteredUsers = filteredUsers.filter(u => u.status === statusFilter);
      }

      setUsers(filteredUsers);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      await usersAPI.updateUserStatus(userId, newStatus);
      setSuccess(`User status updated to ${newStatus}`);
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user status');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This will also delete all their tasks.')) {
      try {
        await usersAPI.deleteUser(userId);
        setSuccess('User deleted successfully');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (row) => row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : 'Never'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div style={styles.actionButtons}>
          <Button
            type="secondary"
            onClick={() => handleUpdateStatus(row._id, row.status === 'Active' ? 'Inactive' : 'Active')}
            style={{ padding: '5px 10px', fontSize: '12px' }}
          >
            {row.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            type="secondary"
            onClick={() => handleDeleteUser(row._id)}
            style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: '#e74c3c' }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>👥 User Management</h1>

        {error && <Alert message={error} type="error" onClose={() => setError('')} />}
        {success && <Alert message={success} type="success" onClose={() => setSuccess('')} />}

        <Card style={styles.filterCard}>
          <h3 style={styles.filterTitle}>Filters</h3>
          <div style={styles.filterGrid}>
            <Select
              options={[
                { value: '', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </Card>

        <Card>
          <Table columns={columns} data={users} loading={loading} />
          {users.length > 0 && (
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
  },
  actionButtons: {
    display: 'flex',
    gap: '5px'
  }
};

export default AdminUsers;

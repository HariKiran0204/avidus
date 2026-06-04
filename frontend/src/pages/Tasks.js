import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../utils/api';
import { Card, Button, Input, Select, Table, Pagination, Alert } from '../components/UI';
import Navbar from '../components/Navbar';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [page, filters]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await tasksAPI.getAllTasks(page, 10, filters.status, filters.priority);
      setTasks(response.data.tasks);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await tasksAPI.createTask(formData);
      setSuccess('Task created successfully!');
      setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
      setShowCreateForm(false);
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        setSuccess('Task deleted successfully!');
        fetchTasks();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
  ];

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (row) => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : 'N/A'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button
          type="secondary"
          onClick={() => handleDeleteTask(row._id)}
          style={{ padding: '5px 10px', fontSize: '12px' }}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📝 My Tasks</h1>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? 'Cancel' : '➕ Create Task'}
          </Button>
        </div>

        {error && <Alert message={error} type="error" onClose={() => setError('')} />}
        {success && <Alert message={success} type="success" onClose={() => setSuccess('')} />}

        {showCreateForm && (
          <Card style={styles.formCard}>
            <h2 style={styles.formTitle}>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <Input
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Task Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={styles.textarea}
              />
              <Select
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' }
                ]}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              />
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
              <Button type="primary" style={styles.submitBtn}>
                Create Task
              </Button>
            </form>
          </Card>
        )}

        <Card style={styles.filterCard}>
          <h3 style={styles.filterTitle}>Filters</h3>
          <div style={styles.filterGrid}>
            <Select
              options={statusOptions}
              value={filters.status}
              onChange={(e) => {
                setFilters({ ...filters, status: e.target.value });
                setPage(1);
              }}
              placeholder="Status"
            />
            <Select
              options={priorityOptions}
              value={filters.priority}
              onChange={(e) => {
                setFilters({ ...filters, priority: e.target.value });
                setPage(1);
              }}
              placeholder="Priority"
            />
          </div>
        </Card>

        <Card>
          <Table
            columns={columns}
            data={tasks}
            loading={loading}
          />
          {tasks.length > 0 && (
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '32px',
    color: '#2c3e50',
    margin: 0
  },
  formCard: {
    marginBottom: '20px'
  },
  formTitle: {
    fontSize: '20px',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif'
  },
  submitBtn: {
    width: '100%',
    padding: '12px'
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

export default Tasks;

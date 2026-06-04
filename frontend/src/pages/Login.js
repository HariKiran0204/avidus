import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert, Button, Input, Card } from '../components/UI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <Card style={styles.card}>
          <h1 style={styles.title}>📋 Avidus</h1>
          <p style={styles.subtitle}>Task Management System with RBAC</p>

          {error && <Alert message={error} type="error" onClose={() => setError('')} />}

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              style={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p style={styles.signupText}>
            Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
          </p>

          <hr style={styles.divider} />
          <p style={styles.demoText}>
            <strong>Demo Credentials:</strong><br />
            Admin: admin@example.com / password123<br />
            User: user@example.com / password123
          </p>
        </Card>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px'
  },
  card: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '10px',
    color: '#2c3e50'
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: '30px'
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    marginBottom: '15px'
  },
  signupText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '15px'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  divider: {
    margin: '15px 0',
    borderColor: '#ecf0f1'
  },
  demoText: {
    fontSize: '12px',
    color: '#7f8c8d',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '4px',
    lineHeight: '1.6'
  }
};

export default Login;

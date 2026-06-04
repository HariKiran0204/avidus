import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert, Button, Input, Card } from '../components/UI';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <Card style={styles.card}>
          <h1 style={styles.title}>📋 Avidus</h1>
          <p style={styles.subtitle}>Create Your Account</p>

          {error && <Alert message={error} type="error" onClose={() => setError('')} />}

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              style={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <p style={styles.loginText}>
            Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
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
    backgroundColor: '#27ae60',
    color: 'white',
    marginBottom: '15px'
  },
  loginText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#7f8c8d'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Register;

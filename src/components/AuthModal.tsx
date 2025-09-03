import React, { useState } from 'react';
import { Modal, Form, Button, Nav, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'admin'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { login: adminLogin } = useAdminAuth();

  const resetForm = () => {
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = (): string | null => {
    const { email, password, name, confirmPassword } = formData;
    
    if (!email.trim()) return 'Email is required';
    if (!password) return 'Password is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    
    if (activeTab === 'signup') {
      if (!name.trim()) return 'Name is required';
      if (password.length < 6) return 'Password must be at least 6 characters';
      if (password !== confirmPassword) return 'Passwords do not match';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      switch (activeTab) {
        case 'login':
          success = await login(formData.email.trim(), formData.password);
          if (!success) setError('Invalid email or password');
          break;
          
        case 'admin':
          success = await adminLogin(formData.email.trim(), formData.password);
          if (!success) setError('Invalid admin credentials');
          break;
          
        case 'signup':
          success = await signup(formData.email.trim(), formData.password, formData.name.trim());
          if (!success) setError('An account with this email already exists');
          break;
      }
      
      if (success) {
        onHide();
        resetForm();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  const switchTab = (tab: 'login' | 'signup' | 'admin') => {
    setActiveTab(tab);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {activeTab === 'admin' ? 'Admin Access' : 
           activeTab === 'signup' ? 'Create Account' : 'Sign In'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="pills" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'login'}
              onClick={() => switchTab('login')}
              style={{ cursor: 'pointer' }}
            >
              Sign In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'signup'}
              onClick={() => switchTab('signup')}
              style={{ cursor: 'pointer' }}
            >
              Sign Up
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'admin'}
              onClick={() => switchTab('admin')}
              style={{ cursor: 'pointer' }}
            >
              Admin
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>{activeTab === 'admin' ? 'Username' : 'Email'} *</Form.Label>
            <Form.Control
              type={activeTab === 'admin' ? 'text' : 'email'}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={activeTab === 'admin' ? 'Enter admin username' : 'Enter your email'}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </Form.Group>

          {activeTab === 'signup' && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                disabled={loading}
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 
             activeTab === 'admin' ? 'Access Admin Panel' :
             activeTab === 'signup' ? 'Create Account' : 'Sign In'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
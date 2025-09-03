import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [formType, setFormType] = useState<'user' | 'admin'>('user');
  const [userTab, setUserTab] = useState<'login' | 'signup'>('login');
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
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const clearForm = () => {
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setError('');
  };

  const handleFormTypeChange = (type: 'user' | 'admin') => {
    setFormType(type);
    clearForm();
  };

  const handleUserTabChange = (tab: 'login' | 'signup') => {
    setUserTab(tab);
    clearForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const activeProcess = formType === 'user' ? userTab : 'admin';

    try {
      if (activeProcess === 'login') {
        const success = await login(formData.email, formData.password);
        if (success) navigate('/');
        else setError('Invalid email or password');
      } else if (activeProcess === 'admin') {
        const success = await adminLogin(formData.email, formData.password);
        if (success) navigate('/myadminpage');
        else setError('Invalid admin email or password');
      } else { // signup
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
        } else if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
        } else {
          const success = await signup(formData.email, formData.password, formData.name);
          if (success) navigate('/');
          else setError('User with this email already exists');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  const renderUserForm = () => {
    return (
      <Card className="professional-card shadow-lg">
        <Card.Body className="p-5">
          <Nav variant="pills" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link active={userTab === 'login'} onClick={() => handleUserTabChange('login')} style={{ cursor: 'pointer' }}>Sign In</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={userTab === 'signup'} onClick={() => handleUserTabChange('signup')} style={{ cursor: 'pointer' }}>Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {userTab === 'signup' && (
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your full name" />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Enter your password" />
            </Form.Group>
            {userTab === 'signup' && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required placeholder="Confirm your password" />
              </Form.Group>
            )}
            <Button type="submit" className="btn-gradient-primary w-100" disabled={loading}>
              {loading ? 'Please wait...' : (userTab === 'login' ? 'Sign In' : 'Sign Up')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  const renderAdminForm = () => {
    return (
      <Card className="professional-card shadow-lg">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <div className="service-icon mx-auto mb-3"><i className="fas fa-shield-alt"></i></div>
            <h3 className="fw-bold">Admin Access</h3>
            <p className="text-muted">Please sign in to continue</p>
          </div>
          {error && <Alert variant="danger" className="mb-4"><i className="fas fa-exclamation-triangle me-2"></i>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Admin Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your admin email" className="form-control-clean" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Admin Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Enter your admin password" className="form-control-clean" />
            </Form.Group>
            <Button type="submit" className="btn-clean-primary w-100" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <small className="text-muted">
              Team Access Information:<br/>
              Kumar Saatharla - Founder & CEO<br/>
              Hemanth Kumar Pattem - Team Manager<br/>
              Pujitha Golla - Co-Founder & AI-Specialist
            </small>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <section className="min-vh-100 d-flex align-items-center" style={{ background: 'hsl(var(--background))' }}>
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs="auto">
            <Button variant={formType === 'user' ? 'primary' : 'outline-primary'} onClick={() => handleFormTypeChange('user')}>User Login</Button>
          </Col>
          <Col xs="auto">
            <Button variant={formType === 'admin' ? 'primary' : 'outline-primary'} onClick={() => handleFormTypeChange('admin')}>Admin Login</Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={5} md={7}>
            {formType === 'user' ? renderUserForm() : renderAdminForm()}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;
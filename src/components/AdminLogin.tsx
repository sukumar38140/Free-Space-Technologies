
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', credentials.username);
      const success = await login(credentials.username, credentials.password);
      if (!success) {
        setError('Invalid username or password');
        console.error('Login failed: Invalid credentials');
      } else {
        console.log('Login successful, redirecting to admin panel');
        // Use React Router navigation instead of window.location
        navigate('/myadminpage');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-vh-100 d-flex align-items-center" style={{marginTop: '80px', background: 'hsl(var(--background))'}}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={7}>
            <Card className="professional-card shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="service-icon mx-auto mb-3">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3 className="fw-bold">Admin Access</h3>
                  <p className="text-muted">Please sign in to continue</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your username"
                      autoComplete="username"
                      className="form-control-clean"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="form-control-clean"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn-clean-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminLogin;

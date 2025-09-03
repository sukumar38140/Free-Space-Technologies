
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const validateForm = (): string | null => {
    const { name, email, subject, message } = formData;
    
    if (!name.trim()) return 'Name is required';
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!subject.trim()) return 'Subject is required';
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    
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
      // Save contact form submission to localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toISOString()
      };
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{marginTop: '80px'}}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h1 className="display-2 mb-4">Get In Touch</h1>
                <p className="lead">
                  Ready to transform your business? Let's discuss your project requirements 
                  and explore how we can help you achieve your digital transformation goals.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={8} className="mb-5">
              <Card className="professional-card animate-fade-up">
                <Card.Body>
                  <h3 className="mb-4">Let's Start a Conversation</h3>
                  
                  {showAlert && (
                    <Alert variant="success" className="mb-4">
                      <i className="fas fa-check-circle me-2"></i>
                      Thank you for reaching out! We'll respond to your inquiry within 24 hours.
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {error}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="form-control-clean"
                            disabled={loading}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@company.com"
                            className="form-control-clean"
                            disabled={loading}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company name"
                            className="form-control-clean"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 8978943122"
                            className="form-control-clean"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Project Type *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Web Development, Mobile App, AI Solutions, etc."
                        className="form-control-clean"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Project Details *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Please describe your project requirements, timeline, and any specific features you need..."
                        className="form-control-clean"
                      />
                    </Form.Group>
                    
                    <Button type="submit" className="btn-clean-primary" size="lg">
                      <i className="fas fa-paper-plane me-2"></i>
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <div className="animate-fade-up animate-delay-100">
                <Card className="professional-card mb-4">
                  <Card.Body className="text-center">
                    <div className="service-icon mb-3">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h5>Visit Our Office</h5>
                    <p className="mb-0 text-muted">
                      Ntr Circle<br />
                      Madanapalle-517325<br />
                      Andhra Pradesh, India
                    </p>
                  </Card.Body>
                </Card>
                
                <Card className="professional-card mb-4">
                  <Card.Body className="text-center">
                    <div className="service-icon mb-3">
                      <i className="fas fa-phone"></i>
                    </div>
                    <h5>Call Us</h5>
                    <p className="mb-0 text-muted">
                      <strong>Phone:</strong> +91 8978943122<br />
                      <strong>Available:</strong> Mon - Sat<br />
                      <strong>Time:</strong> 9:00 AM - 6:00 PM
                    </p>
                  </Card.Body>
                </Card>
                
                <Card className="professional-card mb-4">
                  <Card.Body className="text-center">
                    <div className="service-icon mb-3">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h5>Email Us</h5>
                    <p className="mb-0 text-muted">
                      <strong>General:</strong> info@freespacetechnologies.com<br />
                      <strong>Projects:</strong> projects@freespacetechnologies.com<br />
                      <strong>Support:</strong> support@freespacetechnologies.com
                    </p>
                  </Card.Body>
                </Card>
                
                <Card className="professional-card">
                  <Card.Body className="text-center">
                    <div className="service-icon mb-3">
                      <i className="fas fa-clock"></i>
                    </div>
                    <h5>Business Hours</h5>
                    <p className="mb-0 text-muted">
                      <strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM<br />
                      <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
                      <strong>Sunday:</strong> Closed
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="section-padding" style={{background: 'hsl(var(--muted) / 0.3)'}}>
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title animate-fade-up">Our Location</h2>
              <p className="text-muted animate-fade-up animate-delay-100">
                Located in the heart of Madanapalle, Andhra Pradesh
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="animate-fade-up animate-delay-200">
                <div 
                  className="professional-card d-flex align-items-center justify-content-center"
                  style={{height: '400px', background: 'hsl(var(--muted) / 0.5)'}}
                >
                  <div className="text-center">
                    <i className="fas fa-map-marked-alt fa-3x mb-3" style={{color: 'hsl(var(--primary))'}}></i>
                    <h4>Find Us Here</h4>
                    <p className="text-muted mb-0">Ntr Circle, Madanapalle-517325, Andhra Pradesh</p>
                    <p className="text-muted">Easy access via public transportation</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;

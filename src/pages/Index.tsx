
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="section-container">
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="animate-fade-up">
                  <h1 className="display-1 mb-4">
                    Transform Your Business with Modern Technology
                  </h1>
                  <p className="lead mb-5">
                    We deliver comprehensive technology solutions that drive innovation, 
                    streamline operations, and accelerate growth for businesses of all sizes.
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Link to="/services" className="btn-clean-primary">
                      Explore Solutions
                    </Link>
                    <Link to="/contact" className="btn-clean-secondary">
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="text-center animate-fade-up animate-delay-200">
                <div className="mt-5 mt-lg-0">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center"
                    alt="Modern Technology Solutions"
                    className="img-fluid rounded-3"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section section-padding">
        <Container>
          <div className="section-container">
            <Row className="text-center">
              <Col lg={3} md={6} className="mb-4 mb-lg-0">
                <div className="animate-fade-up">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4 mb-lg-0">
                <div className="animate-fade-up animate-delay-100">
                  <div className="stat-number">250+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-4 mb-lg-0">
                <div className="animate-fade-up animate-delay-200">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support Available</div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="animate-fade-up animate-delay-300">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime Guarantee</div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <Container>
          <div className="section-container">
            <Row>
              <Col lg={12} className="text-center mb-5">
                <div className="animate-fade-up">
                  <h2 className="display-2 mb-3">What We Offer</h2>
                  <p className="lead">
                    Comprehensive technology services tailored to your business needs
                  </p>
                </div>
              </Col>
            </Row>
            
            <div className="services-grid">
              <Card className="professional-card animate-fade-up">
                <div className="service-icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <Card.Body className="p-0">
                  <h4 className="mb-3">Web Development</h4>
                  <p className="text-muted">
                    Modern, responsive websites and web applications built with cutting-edge technologies 
                    and best practices for optimal performance.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="professional-card animate-fade-up animate-delay-100">
                <div className="service-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <Card.Body className="p-0">
                  <h4 className="mb-3">Mobile Solutions</h4>
                  <p className="text-muted">
                    Native and cross-platform mobile applications for iOS and Android 
                    that deliver exceptional user experiences.
                  </p>
                </Card.Body>
              </Card>
              
              <Card className="professional-card animate-fade-up animate-delay-200">
                <div className="service-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <Card.Body className="p-0">
                  <h4 className="mb-3">Cloud Services</h4>
                  <p className="text-muted">
                    Scalable cloud infrastructure and migration services for enhanced 
                    performance, security, and cost efficiency.
                  </p>
                </Card.Body>
              </Card>
            </div>
            
            <Row className="text-center mt-5">
              <Col>
                <Link to="/services" className="btn-clean-primary">
                  View All Services
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="feature-highlight">
        <Container>
          <div className="section-container">
            <Row className="align-items-center">
              <Col lg={6} className="mb-4 mb-lg-0">
                <div className="animate-fade-up">
                  <h2 className="display-2 mb-4">Why Choose Free Space Technologies?</h2>
                  <p className="lead mb-4">
                    We combine industry expertise with innovative approaches to deliver 
                    solutions that drive real business results.
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-3"></i>
                      Expert team with 10+ years experience
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-3"></i>
                      Agile development methodology
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-3"></i>
                      Scalable and secure solutions
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-3"></i>
                      Ongoing support and maintenance
                    </li>
                  </ul>
                  <Link to="/about" className="btn-clean-primary">
                    Learn More About Us
                  </Link>
                </div>
              </Col>
              <Col lg={6}>
                <div className="animate-fade-up animate-delay-200">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=center"
                    alt="Professional Development Team"
                    className="img-fluid rounded-3"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <Container>
          <div className="section-container">
            <Row>
              <Col lg={12} className="text-center">
                <div className="animate-fade-up">
                  <h2 className="display-2 mb-4">Ready to Get Started?</h2>
                  <p className="lead mb-5">
                    Let's discuss your project and explore how we can help you achieve your goals.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link to="/contact" className="btn-clean-primary">
                      Contact Us Today
                    </Link>
                    <Link to="/career" className="btn-clean-secondary">
                      Join Our Team
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Index;

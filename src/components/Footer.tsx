
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="clean-footer">
      <Container>
        <div className="section-container">
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <div>
                <h5 className="footer-title">Free Space Technologies</h5>
                <p className="text-muted mb-4">
                  Pioneering the future with AI-powered solutions, intelligent automation, 
                  and cutting-edge robotics. Innovation beyond boundaries.
                </p>
                <div className="d-flex gap-3">
                  <a href="#" className="footer-link">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="footer-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="footer-link">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </Col>
            
            <Col lg={2} md={6} className="mb-4">
              <div>
                <h5 className="footer-title">Quick Links</h5>
                <div>
                  <Link to="/" className="footer-link">Home</Link>
                  <Link to="/services" className="footer-link">Services</Link>
                  <Link to="/about" className="footer-link">About Us</Link>
                  <Link to="/career" className="footer-link">Career</Link>
                  <Link to="/contact" className="footer-link">Contact</Link>
                </div>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div>
                <h5 className="footer-title">Our Team</h5>
                <div>
                  <div className="footer-link">Kumar Saatharla - Founder & CEO</div>
                  <div className="footer-link">Hemanth Kumar Pattem - Team Manager</div>
                  <div className="footer-link">Pujitha Golla - Co-Founder & AI-Specialist</div>
                </div>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div>
                <h5 className="footer-title">Contact Info</h5>
                <div className="text-muted">
                  <div className="mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Ntr Circle, Madanapalle-517325, AP
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-phone me-2"></i>
                    +91 8978943122
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-envelope me-2"></i>
                    info@freespacetechnologies.com
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
          <hr className="my-5" style={{ borderColor: 'hsl(var(--border))' }} />
          
          <Row className="align-items-center">
            <Col md={8}>
              <p className="text-muted mb-0">
                &copy; 2024 Free Space Technologies. All rights reserved.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Link to="/privacy-policy" className="footer-link me-3">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="footer-link">
                Terms of Service
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;


import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AuthModal from './AuthModal';
import ProfileDropdown from './ProfileDropdown';

const CustomNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isRootAdmin } = useAdminAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ backgroundColor: 'white' }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            Free Space Technologies
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/services" 
                className={isActive('/services') ? 'active' : ''}
              >
                Services
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
              >
                About Us
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/career" 
                className={isActive('/career') ? 'active' : ''}
              >
                Career
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className={isActive('/contact') ? 'active' : ''}
              >
                Contact
              </Nav.Link>
              
              {isRootAdmin && (
                <Nav.Link
                  as={Link}
                  to="/myadminpage"
                  className={isActive('/myadminpage') ? 'active' : ''}
                >
                  Admin
                </Nav.Link>
              )}
              
              {/* Authentication Section */}
              {isAuthenticated ? (
                <Nav.Item className="ms-3">
                  <ProfileDropdown />
                </Nav.Item>
              ) : (
                <Nav.Item className="ms-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Account
                  </Button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default CustomNavbar;

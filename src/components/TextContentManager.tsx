
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Accordion } from 'react-bootstrap';

interface TextContent {
  [key: string]: string;
}

interface PageTextContent {
  [pageName: string]: TextContent;
}

const TextContentManager = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [textContent, setTextContent] = useState<PageTextContent>({});

  // Default text content for all pages
  const defaultTextContent: PageTextContent = {
    home: {
      heroTitle: 'Innovative Technology Solutions for Modern Businesses',
      heroSubtitle: 'Transform your business with cutting-edge technology solutions. We provide web development, mobile apps, cloud services, and digital transformation consulting.',
      heroButtonPrimary: 'Get Started',
      heroButtonSecondary: 'Learn More',
      servicesTitle: 'Our Core Services',
      servicesSubtitle: 'Comprehensive technology solutions tailored to your business needs',
      whyChooseTitle: 'Why Choose Free Space Technologies?',
      whyChooseSubtitle: 'We combine technical expertise with business insight to deliver exceptional results',
      ctaTitle: 'Ready to Transform Your Business?',
      ctaSubtitle: 'Let\'s discuss your project and create a solution that drives real results.',
      ctaButton: 'Start Your Project'
    },
    about: {
      heroTitle: 'About Free Space Technologies',
      heroSubtitle: 'We are a dynamic technology company committed to helping businesses thrive in the digital age through innovative solutions and expert guidance.',
      journeyTitle: 'Our Journey',
      journeySubtitle: 'Building tomorrow\'s solutions today',
      journeyLead: 'Established in 2018, Free Space Technologies emerged from a simple vision: to bridge the gap between complex technology and practical business solutions.',
      valuesTitle: 'Our Core Values',
      valuesSubtitle: 'The principles that drive our success',
      teamTitle: 'Meet Our Leadership',
      teamSubtitle: 'The experienced professionals guiding our vision',
      statsYears: '6+',
      statsYearsLabel: 'Years of Excellence',
      statsYearsDesc: 'Delivering quality solutions since 2018',
      statsProjects: '350+',
      statsProjectsLabel: 'Projects Delivered',
      statsProjectsDesc: 'Successful implementations across industries',
      statsClients: '180+',
      statsClientsLabel: 'Satisfied Clients',
      statsClientsDesc: 'Long-term partnerships worldwide',
      statsTeam: '35+',
      statsTeamLabel: 'Team Members',
      statsTeamDesc: 'Skilled professionals and growing'
    },
    services: {
      heroTitle: 'Our Services',
      heroSubtitle: 'Comprehensive technology solutions designed to accelerate your business growth and digital transformation journey.',
      techTitle: 'Technologies We Use',
      techSubtitle: 'Modern tools and frameworks that power exceptional solutions',
      ctaTitle: 'Ready to Start Your Project?',
      ctaSubtitle: 'Let\'s discuss your requirements and create a solution that drives results.',
      ctaButtonPrimary: 'Get Quote',
      ctaButtonSecondary: 'View Portfolio'
    },
    career: {
      heroTitle: 'Join Our Team',
      heroSubtitle: 'Be part of a dynamic team that\'s shaping the future of technology solutions.',
      openingsTitle: 'Current Openings',
      openingsSubtitle: 'Explore exciting career opportunities with us',
      benefitsTitle: 'Why Work With Us?',
      benefitsSubtitle: 'We offer more than just a job - we offer a career and a community'
    },
    contact: {
      heroTitle: 'Get In Touch',
      heroSubtitle: 'Ready to start your next project? We\'d love to hear from you.',
      formTitle: 'Send us a message',
      formSubtitle: 'We\'ll get back to you within 24 hours',
      contactInfoTitle: 'Contact Information',
      submitButton: 'Send Message'
    }
  };

  useEffect(() => {
    loadTextContent();
  }, []);

  const loadTextContent = () => {
    const savedContent = localStorage.getItem('siteTextContent');
    if (savedContent) {
      setTextContent(JSON.parse(savedContent));
    } else {
      setTextContent(defaultTextContent);
      localStorage.setItem('siteTextContent', JSON.stringify(defaultTextContent));
    }
  };

  const handleTextChange = (page: string, key: string, value: string) => {
    setTextContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [key]: value
      }
    }));
  };

  const saveTextContent = (page: string) => {
    localStorage.setItem('siteTextContent', JSON.stringify(textContent));
    setAlertMessage(`${page.charAt(0).toUpperCase() + page.slice(1)} page text content saved successfully!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const pages = [
    { key: 'home', label: 'Home Page' },
    { key: 'about', label: 'About Page' },
    { key: 'services', label: 'Services Page' },
    { key: 'career', label: 'Career Page' },
    { key: 'contact', label: 'Contact Page' }
  ];

  const getFieldLabel = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <>
      {showAlert && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          {alertMessage}
        </Alert>
      )}

      <Nav variant="pills" className="mb-4">
        {pages.map(page => (
          <Nav.Item key={page.key}>
            <Nav.Link 
              active={activeTab === page.key}
              onClick={() => setActiveTab(page.key)}
              style={{ cursor: 'pointer' }}
            >
              {page.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Row>
        <Col lg={12}>
          <Card className="admin-card">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-edit me-2"></i>
                Edit {pages.find(p => p.key === activeTab)?.label} Text Content
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                {textContent[activeTab] && Object.entries(textContent[activeTab]).map(([key, value]) => (
                  <Form.Group className="mb-3" key={key}>
                    <Form.Label>{getFieldLabel(key)}</Form.Label>
                    {value && value.length > 100 ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={value}
                        onChange={(e) => handleTextChange(activeTab, key, e.target.value)}
                        placeholder={`Enter ${getFieldLabel(key).toLowerCase()}...`}
                      />
                    ) : (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={(e) => handleTextChange(activeTab, key, e.target.value)}
                        placeholder={`Enter ${getFieldLabel(key).toLowerCase()}...`}
                      />
                    )}
                  </Form.Group>
                ))}

                <Button 
                  className="btn-gradient-primary"
                  onClick={() => saveTextContent(activeTab)}
                >
                  <i className="fas fa-save me-2"></i>
                  Save {pages.find(p => p.key === activeTab)?.label} Text Content
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TextContentManager;

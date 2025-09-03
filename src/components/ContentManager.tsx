
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Modal } from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import FullImageModal from './FullImageModal';

interface TextContent {
  [key: string]: string;
}

interface PageTextContent {
  [pageName: string]: TextContent;
}

interface PageContent {
  title: string;
  description: string;
  content: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

interface PageContentData {
  [key: string]: PageContent;
}

interface TeamData {
  [key: string]: TeamMember;
}

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('home-text');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  // Text Content State
  const [textContent, setTextContent] = useState<PageTextContent>({});
  
  // Page Content State
  const [pageContent, setPageContent] = useState<PageContentData>({
    home: { title: '', description: '', content: '' },
    about: { title: '', description: '', content: '' },
    services: { title: '', description: '', content: '' },
    career: { title: '', description: '', content: '' },
    contact: { title: '', description: '', content: '' }
  });

  // Team Members State
  const [teamMembers, setTeamMembers] = useState<TeamData>({
    ceo: {
      id: 'ceo',
      name: 'Kumar Saatharla',
      position: 'Founder & CEO',
      image: '/team/Kumar%20Saatharla%20CEO.jpg',
      bio: 'Visionary leader with expertise in technology consulting and business development.'
    },
    manager: {
      id: 'manager',
      name: 'Hemanth Kumar Pattem',
      position: 'Team Manager',
      image: '/team/Hemanth.png',
      bio: 'Experienced manager specializing in team coordination and project management.'
    },
    ai_specialist: {
      id: 'ai_specialist',
      name: 'Golla Pujitha',
      position: 'Co-Founder & AI-Specialist',
      image: '/team/Pujitha%20Golla.png',
      bio: 'AI expert and co-founder passionate about artificial intelligence and innovative solutions. Specializes in machine learning and cutting-edge AI technologies.'
    },
    design_director: {
      id: 'design_director',
      name: 'Design Lead',
      position: 'Design Director',
      image: '/placeholder.svg',
      bio: 'Creative designer focused on user experience and modern interface design.'
    }
  });

  // Default text content
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
    loadAllContent();
  }, []);

  const loadAllContent = () => {
    // Load text content
    const savedTextContent = localStorage.getItem('siteTextContent');
    if (savedTextContent) {
      setTextContent(JSON.parse(savedTextContent));
    } else {
      setTextContent(defaultTextContent);
      localStorage.setItem('siteTextContent', JSON.stringify(defaultTextContent));
    }

    // Load page content
    const savedPageContent = localStorage.getItem('pageContent');
    if (savedPageContent) {
      setPageContent(JSON.parse(savedPageContent));
    }

    // Load team members
    const savedTeam = localStorage.getItem('teamMembers');
    if (savedTeam) {
      try {
        const parsed = JSON.parse(savedTeam);
        const migrated = { ...parsed };
        Object.keys(migrated).forEach((key) => {
          const m = migrated[key];
          if (!m) return;
          const img: string = m.image || '';
          const isExternal = img.includes('images.unsplash.com') || img.startsWith('http');
          const isAlreadyLocal = img.startsWith('/team/');
          if (!isAlreadyLocal && (isExternal || !img)) {
            switch (m.id || key) {
              case 'ceo':
                m.image = '/team/Kumar%20Saatharla%20CEO.jpg';
                break;
              case 'manager':
                m.image = '/team/Hemanth.png';
                break;
              case 'ai_specialist':
                m.image = '/team/Pujitha%20Golla.png';
                break;
              default:
                break;
            }
          }
        });
        setTeamMembers(migrated);
        if (JSON.stringify(migrated) !== savedTeam) {
          localStorage.setItem('teamMembers', JSON.stringify(migrated));
        }
      } catch {
        setTeamMembers(JSON.parse(savedTeam));
      }
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

  const handlePageContentChange = (page: string, field: keyof PageContent, value: string) => {
    setPageContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value
      }
    }));
  };

  const saveTextContent = (page: string) => {
    localStorage.setItem('siteTextContent', JSON.stringify(textContent));
    showSuccessAlert(`${page.charAt(0).toUpperCase() + page.slice(1)} text content saved successfully!`);
  };

  const savePageContent = (page: string) => {
    localStorage.setItem('pageContent', JSON.stringify(pageContent));
    showSuccessAlert(`${page.charAt(0).toUpperCase() + page.slice(1)} page content saved successfully!`);
  };

  const showSuccessAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleImageClick = (member: TeamMember) => {
    setSelectedMember(member);
    setShowFullImage(true);
  };

  const handleImageUpdate = (member: TeamMember) => {
    setSelectedMember(member);
    setShowImageUpload(true);
  };

  const handleImageChange = (newImageUrl: string) => {
    if (selectedMember) {
      const updatedMembers = {
        ...teamMembers,
        [selectedMember.id]: {
          ...selectedMember,
          image: newImageUrl
        }
      };
      setTeamMembers(updatedMembers);
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      showSuccessAlert('Profile picture updated successfully!');
    }
  };

  const getFieldLabel = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const pages = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'services', label: 'Services' },
    { key: 'career', label: 'Career' },
    { key: 'contact', label: 'Contact' }
  ];

  const contentTabs = [
    ...pages.map(p => ({ key: `${p.key}-text`, label: `${p.label} Text`, type: 'text' })),
    ...pages.map(p => ({ key: `${p.key}-page`, label: `${p.label} Page`, type: 'page' })),
    { key: 'team', label: 'Team Members', type: 'team' }
  ];

  return (
    <>
      {showAlert && (
        <Alert variant="success" className="mb-4 animate-fade-in">
          <i className="fas fa-check-circle me-2"></i>
          {alertMessage}
        </Alert>
      )}

      <Nav variant="pills" className="mb-4 flex-wrap">
        {contentTabs.map(tab => (
          <Nav.Item key={tab.key} className="mb-2">
            <Nav.Link 
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="animate-fade-in hover-scale"
              style={{ cursor: 'pointer' }}
            >
              {tab.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Row>
        <Col lg={12}>
          <Card className="admin-card animate-fade-in">
            <Card.Header className="bg-primary-gradient text-white">
              <h5 className="mb-0">
                <i className="fas fa-edit me-2"></i>
                {contentTabs.find(t => t.key === activeTab)?.label} Content
              </h5>
            </Card.Header>
            <Card.Body>
              {/* Text Content Forms */}
              {contentTabs.find(t => t.key === activeTab)?.type === 'text' && (
                <Form>
                  {textContent[activeTab.replace('-text', '')] && Object.entries(textContent[activeTab.replace('-text', '')]).map(([key, value]) => (
                    <Form.Group className="mb-3 animate-fade-up" key={key}>
                      <Form.Label className="fw-bold">{getFieldLabel(key)}</Form.Label>
                      {value && value.length > 100 ? (
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={value}
                          onChange={(e) => handleTextChange(activeTab.replace('-text', ''), key, e.target.value)}
                          placeholder={`Enter ${getFieldLabel(key).toLowerCase()}...`}
                          className="form-control-animated"
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          value={value}
                          onChange={(e) => handleTextChange(activeTab.replace('-text', ''), key, e.target.value)}
                          placeholder={`Enter ${getFieldLabel(key).toLowerCase()}...`}
                          className="form-control-animated"
                        />
                      )}
                    </Form.Group>
                  ))}

                  <Button 
                    className="btn-gradient-primary animate-pulse"
                    onClick={() => saveTextContent(activeTab.replace('-text', ''))}
                  >
                    <i className="fas fa-save me-2"></i>
                    Save Text Content
                  </Button>
                </Form>
              )}

              {/* Page Content Forms */}
              {contentTabs.find(t => t.key === activeTab)?.type === 'page' && (
                <Form>
                  <Form.Group className="mb-3 animate-fade-up">
                    <Form.Label className="fw-bold">Page Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={pageContent[activeTab.replace('-page', '')]?.title || ''}
                      onChange={(e) => handlePageContentChange(activeTab.replace('-page', ''), 'title', e.target.value)}
                      placeholder="Enter page title..."
                      className="form-control-animated"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 animate-fade-up">
                    <Form.Label className="fw-bold">Page Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={pageContent[activeTab.replace('-page', '')]?.description || ''}
                      onChange={(e) => handlePageContentChange(activeTab.replace('-page', ''), 'description', e.target.value)}
                      placeholder="Enter page description..."
                      className="form-control-animated"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 animate-fade-up">
                    <Form.Label className="fw-bold">Main Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={pageContent[activeTab.replace('-page', '')]?.content || ''}
                      onChange={(e) => handlePageContentChange(activeTab.replace('-page', ''), 'content', e.target.value)}
                      placeholder="Enter main page content..."
                      className="form-control-animated"
                    />
                    <Form.Text className="text-muted">
                      This content will be displayed as the main body of the page.
                    </Form.Text>
                  </Form.Group>

                  <Button 
                    className="btn-gradient-primary animate-pulse"
                    onClick={() => savePageContent(activeTab.replace('-page', ''))}
                  >
                    <i className="fas fa-save me-2"></i>
                    Save Page Content
                  </Button>
                </Form>
              )}

              {/* Team Members */}
              {activeTab === 'team' && (
                <Row>
                  {Object.values(teamMembers).map((member, index) => (
                    <Col lg={6} key={member.id} className="mb-4">
                      <Card className="h-100 team-member-card animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <Card.Body className="text-center">
                          <div className="position-relative d-inline-block mb-3">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="rounded-circle profile-image-clickable profile-image-square"
                              onClick={() => handleImageClick(member)}
                            />
                            <div className="profile-overlay">
                              <Button
                                size="sm"
                                className="btn-gradient-secondary position-absolute"
                                style={{ bottom: '0', right: '0' }}
                                onClick={() => handleImageUpdate(member)}
                              >
                                <i className="fas fa-camera"></i>
                              </Button>
                            </div>
                          </div>
                          <h5 className="mb-1">{member.name}</h5>
                          <h6 className="text-primary mb-3">{member.position}</h6>
                          <p className="text-muted small">{member.bio}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Image Upload Modal */}
      {selectedMember && (
        <ImageUpload
          show={showImageUpload}
          onHide={() => setShowImageUpload(false)}
          currentImage={selectedMember.image}
          onImageChange={handleImageChange}
          memberName={selectedMember.name}
        />
      )}

      {/* Full Image Modal */}
      {selectedMember && (
        <FullImageModal
          show={showFullImage}
          onHide={() => setShowFullImage(false)}
          imageUrl={selectedMember.image}
          memberName={selectedMember.name}
          memberPosition={selectedMember.position}
        />
      )}
    </>
  );
};

export default ContentManager;

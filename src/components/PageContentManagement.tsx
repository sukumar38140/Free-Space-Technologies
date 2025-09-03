
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Modal } from 'react-bootstrap';

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

const PageContentManagement = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const [pageContent, setPageContent] = useState<PageContentData>({
    home: { title: '', description: '', content: '' },
    about: { title: '', description: '', content: '' },
    services: { title: '', description: '', content: '' },
    career: { title: '', description: '', content: '' },
    contact: { title: '', description: '', content: '' }
  });

  const [teamMembers, setTeamMembers] = useState<TeamData>({
    ceo: {
      id: 'ceo',
      name: 'Alex Thompson',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Visionary leader with 12+ years in technology consulting and business development.'
    },
    cto: {
      id: 'cto',
      name: 'Maria Rodriguez',
      position: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Technical expert specializing in scalable architecture and emerging technologies.'
    },
    lead_dev: {
      id: 'lead_dev',
      name: 'David Chen',
      position: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Full-stack developer passionate about clean code and innovative solutions.'
    },
    design_director: {
      id: 'design_director',
      name: 'Sophie Williams',
      position: 'Design Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Creative designer focused on user experience and modern interface design.'
    }
  });

  const [memberForm, setMemberForm] = useState({
    name: '',
    position: '',
    image: '',
    bio: ''
  });

  useEffect(() => {
    loadPageContent();
    loadTeamMembers();
  }, []);

  const loadPageContent = () => {
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      setPageContent(JSON.parse(savedContent));
    }
  };

  const loadTeamMembers = () => {
    const savedTeam = localStorage.getItem('teamMembers');
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    }
  };

  const savePageContent = (page: string) => {
    const updatedContent = { ...pageContent };
    localStorage.setItem('pageContent', JSON.stringify(updatedContent));
    setAlertMessage(`${page.charAt(0).toUpperCase() + page.slice(1)} page content saved successfully!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const saveTeamMembers = () => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    setAlertMessage('Team member updated successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleContentChange = (page: string, field: keyof PageContent, value: string) => {
    setPageContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value
      }
    }));
  };

  const handleEditMember = (memberId: string) => {
    const member = teamMembers[memberId];
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      position: member.position,
      image: member.image,
      bio: member.bio
    });
    setShowTeamModal(true);
  };

  const handleMemberFormChange = (field: string, value: string) => {
    setMemberForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveMember = () => {
    if (editingMember) {
      setTeamMembers(prev => ({
        ...prev,
        [editingMember.id]: {
          ...editingMember,
          ...memberForm
        }
      }));
      saveTeamMembers();
      setShowTeamModal(false);
      setEditingMember(null);
      setMemberForm({ name: '', position: '', image: '', bio: '' });
    }
  };

  const handleCloseModal = () => {
    setShowTeamModal(false);
    setEditingMember(null);
    setMemberForm({ name: '', position: '', image: '', bio: '' });
  };

  const pages = [
    { key: 'home', label: 'Home Page' },
    { key: 'about', label: 'About Page' },
    { key: 'services', label: 'Services Page' },
    { key: 'career', label: 'Career Page' },
    { key: 'contact', label: 'Contact Page' }
  ];

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
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'team'}
            onClick={() => setActiveTab('team')}
            style={{ cursor: 'pointer' }}
          >
            Team Members
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab !== 'team' && (
        <Row>
          <Col lg={12}>
            <Card className="admin-card">
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-edit me-2"></i>
                  Edit {pages.find(p => p.key === activeTab)?.label} Content
                </h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Page Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={pageContent[activeTab]?.title || ''}
                      onChange={(e) => handleContentChange(activeTab, 'title', e.target.value)}
                      placeholder="Enter page title..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Page Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={pageContent[activeTab]?.description || ''}
                      onChange={(e) => handleContentChange(activeTab, 'description', e.target.value)}
                      placeholder="Enter page description..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Main Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={pageContent[activeTab]?.content || ''}
                      onChange={(e) => handleContentChange(activeTab, 'content', e.target.value)}
                      placeholder="Enter main page content..."
                    />
                    <Form.Text className="text-muted">
                      This content will be displayed as the main body of the page.
                    </Form.Text>
                  </Form.Group>

                  <Button 
                    className="btn-gradient-primary"
                    onClick={() => savePageContent(activeTab)}
                  >
                    <i className="fas fa-save me-2"></i>
                    Save {pages.find(p => p.key === activeTab)?.label} Content
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {activeTab === 'team' && (
        <Row>
          <Col lg={12}>
            <Card className="admin-card">
              <Card.Header>
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Manage Team Members
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {Object.values(teamMembers).map((member) => (
                    <Col lg={6} key={member.id} className="mb-4">
                      <Card className="h-100">
                        <Card.Body className="text-center">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="rounded-circle mb-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                          <h5>{member.name}</h5>
                          <h6 className="text-primary mb-3">{member.position}</h6>
                          <p className="text-muted small">{member.bio}</p>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditMember(member.id)}
                          >
                            <i className="fas fa-edit me-2"></i>
                            Edit
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Edit Team Member Modal */}
      <Modal show={showTeamModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => handleMemberFormChange('name', e.target.value)}
                    placeholder="Enter name..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    value={memberForm.position}
                    onChange={(e) => handleMemberFormChange('position', e.target.value)}
                    placeholder="Enter position..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="url"
                value={memberForm.image}
                onChange={(e) => handleMemberFormChange('image', e.target.value)}
                placeholder="Enter photo URL..."
              />
              <Form.Text className="text-muted">
                Enter a direct URL to the team member's photo
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={memberForm.bio}
                onChange={(e) => handleMemberFormChange('bio', e.target.value)}
                placeholder="Enter bio..."
              />
            </Form.Group>

            {memberForm.image && (
              <div className="text-center mb-3">
                <p className="mb-2"><strong>Preview:</strong></p>
                <img 
                  src={memberForm.image} 
                  alt="Preview"
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className="btn-gradient-primary" onClick={handleSaveMember}>
            <i className="fas fa-save me-2"></i>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PageContentManagement;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert, Nav } from 'react-bootstrap';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../components/AdminLogin';
import AdminManagement from '../components/AdminManagement';
import ApplicationManagement from '../components/ApplicationManagement';
import ContentManager from '../components/ContentManager';

interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  createdAt: string;
}

const Admin = () => {
  const { currentUser, logout, isAuthenticated, isRootAdmin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [learnMoreContent, setLearnMoreContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadJobs();
      loadLearnMoreContent();
    }
  }, [isAuthenticated]);

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const loadJobs = () => {
    const savedJobs = localStorage.getItem('careerPosts');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  };

  const loadLearnMoreContent = () => {
    const savedContent = localStorage.getItem('learnMoreContent');
    if (savedContent) {
      setLearnMoreContent(savedContent);
    }
  };

  const saveJobs = (updatedJobs: JobPost[]) => {
    localStorage.setItem('careerPosts', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const saveLearnMoreContent = () => {
    localStorage.setItem('learnMoreContent', learnMoreContent);
    setAlertMessage('Learn More content updated successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingJob) {
      // Update existing job
      const updatedJobs = jobs.map(job => 
        job.id === editingJob.id 
          ? { ...editingJob, ...formData }
          : job
      );
      saveJobs(updatedJobs);
      setAlertMessage('Job post updated successfully!');
    } else {
      // Create new job
      const newJob: JobPost = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updatedJobs = [...jobs, newJob];
      saveJobs(updatedJobs);
      setAlertMessage('Job post created successfully!');
    }
    
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    handleCloseModal();
  };

  const handleEdit = (job: JobPost) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements
    });
    setShowModal(true);
  };

  const handleDelete = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      saveJobs(updatedJobs);
      setAlertMessage('Job post deleted successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: ''
    });
  };

  const handleNewJob = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: ''
    });
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Admin Header */}
      <section className="section-padding" style={{marginTop: '80px', background: 'hsl(var(--background))'}}>
        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="display-2 mb-3">Admin Dashboard</h1>
                <p className="lead">Welcome, {currentUser?.username} ({currentUser?.role})</p>
              </div>
              <Button variant="outline-secondary" onClick={handleLogout} className="btn-clean-secondary">
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Admin Navigation */}
      <section className="py-4" style={{background: 'hsl(var(--muted) / 0.3)', borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))'}}>
        <Container>
          <Nav variant="tabs" className="professional-card p-3">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'jobs'} 
                onClick={() => setActiveTab('jobs')}
                className="nav-link-clean"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-briefcase me-2"></i>
                Job Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'applications'} 
                onClick={() => setActiveTab('applications')}
                className="nav-link-clean"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-file-alt me-2"></i>
                Applications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'content'} 
                onClick={() => setActiveTab('content')}
                className="nav-link-clean"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-edit me-2"></i>
                Learn More Content
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'unified-content'} 
                onClick={() => setActiveTab('unified-content')}
                className="nav-link-clean"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-layer-group me-2"></i>
                Content Management
              </Nav.Link>
            </Nav.Item>
            {isRootAdmin && (
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'admins'} 
                  onClick={() => setActiveTab('admins')}
                  className="nav-link-clean"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-users-cog me-2"></i>
                  Admin Management
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Container>
      </section>

      {/* Admin Content */}
      <section className="section-padding" style={{background: 'hsl(var(--background))'}}>
        <Container>
          {showAlert && (
            <Alert variant="success" className="mb-4 animate-fade-in">
              <i className="fas fa-check-circle me-2"></i>
              {alertMessage}
            </Alert>
          )}

          {activeTab === 'jobs' && (
            <div className="animate-fade-up">
              <Row className="mb-4">
                <Col lg={12} className="d-flex justify-content-between align-items-center">
                  <h3>Job Posts Management</h3>
                  <Button className="btn-clean-primary" onClick={handleNewJob}>
                    <i className="fas fa-plus me-2"></i>
                    Add New Job
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <Card className="professional-card">
                    <Card.Body>
                      {jobs.length > 0 ? (
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Department</th>
                              <th>Location</th>
                              <th>Type</th>
                              <th>Created</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jobs.map((job) => (
                              <tr key={job.id}>
                                <td><strong>{job.title}</strong></td>
                                <td>{job.department}</td>
                                <td>{job.location}</td>
                                <td>
                                  <span className={`badge bg-${job.type === 'Full-time' ? 'primary' : 'secondary'}`}>
                                    {job.type}
                                  </span>
                                </td>
                                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                                <td>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(job)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(job.id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <div className="text-center py-5">
                          <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
                          <h4>No Job Posts</h4>
                          <p className="text-muted">Create your first job post to get started.</p>
                          <Button className="btn-clean-primary" onClick={handleNewJob}>
                            Add New Job
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="animate-fade-up">
              <Row className="mb-4">
                <Col lg={12}>
                  <h3>Learn More Content Management</h3>
                  <p className="text-muted">Manage the content that appears on the "Learn More" page</p>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <Card className="professional-card">
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Learn More Content</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={15}
                            value={learnMoreContent}
                            onChange={(e) => setLearnMoreContent(e.target.value)}
                            placeholder="Enter the content that will be displayed on the Learn More page..."
                            className="form-control-clean"
                            style={{ fontSize: '14px' }}
                          />
                          <Form.Text className="text-muted">
                            This content will be displayed when users click the "Learn More" button.
                          </Form.Text>
                        </Form.Group>
                        <Button 
                          className="btn-clean-primary"
                          onClick={saveLearnMoreContent}
                        >
                          <i className="fas fa-save me-2"></i>
                          Save Content
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}

          {activeTab === 'unified-content' && (
            <div className="animate-fade-up">
              <ContentManager />
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="animate-fade-up">
              <ApplicationManagement />
            </div>
          )}
          
          {activeTab === 'admins' && (
            <div className="animate-fade-up">
              <AdminManagement />
            </div>
          )}
        </Container>
      </section>

      {/* Add/Edit Job Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingJob ? 'Edit Job Post' : 'Add New Job Post'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., AI/ML Engineer"
                    className="form-control-clean"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department *</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Artificial Intelligence"
                    className="form-control-clean"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Remote, Hybrid, On-site"
                    className="form-control-clean"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Type *</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="form-control-clean"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Job Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the role and responsibilities..."
                className="form-control-clean"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Requirements *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
                placeholder="List the required qualifications and skills..."
                className="form-control-clean"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} className="btn-clean-secondary">
              Cancel
            </Button>
            <Button type="submit" className="btn-clean-primary">
              {editingJob ? 'Update Job' : 'Create Job'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Admin;

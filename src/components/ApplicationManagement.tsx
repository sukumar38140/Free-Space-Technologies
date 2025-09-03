
import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Badge, Form } from 'react-bootstrap';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  experience: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

const ApplicationManagement = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const savedApplications = localStorage.getItem('jobApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  };

  const updateApplicationStatus = (applicationId: string, status: Application['status']) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'reviewed': return 'info';
      case 'shortlisted': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'fas fa-clock';
      case 'reviewed': return 'fas fa-eye';
      case 'shortlisted': return 'fas fa-star';
      case 'rejected': return 'fas fa-times';
      default: return 'fas fa-question';
    }
  };

  return (
    <>
      <Card className="admin-card">
        <Card.Header>
          <h5 className="mb-0">Job Applications</h5>
        </Card.Header>
        <Card.Body>
          {applications.length > 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Position</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div>
                        <strong>{application.applicantName}</strong>
                        <br />
                        <small className="text-muted">{application.email}</small>
                      </div>
                    </td>
                    <td>{application.jobTitle}</td>
                    <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
                    <td>
                      <Badge bg={getStatusColor(application.status)}>
                        <i className={`${getStatusIcon(application.status)} me-1`}></i>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewDetails(application)}
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Form.Select
                        size="sm"
                        value={application.status}
                        onChange={(e) => updateApplicationStatus(application.id, e.target.value as Application['status'])}
                        style={{ width: '130px', display: 'inline-block' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
              <h4>No Applications</h4>
              <p className="text-muted">Job applications will appear here when candidates apply.</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Application Details - {selectedApplication.applicantName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Position:</strong> {selectedApplication.jobTitle}
              </div>
              <div className="col-md-6">
                <strong>Applied Date:</strong> {new Date(selectedApplication.appliedAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Email:</strong> {selectedApplication.email}
              </div>
              <div className="col-md-6">
                <strong>Phone:</strong> {selectedApplication.phone}
              </div>
            </div>

            <div className="mb-3">
              <strong>Experience:</strong>
              <p className="mt-2">{selectedApplication.experience}</p>
            </div>

            <div className="mb-3">
              <strong>Resume/CV:</strong>
              <p className="mt-2 bg-light p-3 rounded">{selectedApplication.resume}</p>
            </div>

            <div className="mb-3">
              <strong>Cover Letter:</strong>
              <p className="mt-2 bg-light p-3 rounded">{selectedApplication.coverLetter}</p>
            </div>

            <div className="mb-3">
              <strong>Current Status:</strong>
              <Badge bg={getStatusColor(selectedApplication.status)} className="ms-2">
                <i className={`${getStatusIcon(selectedApplication.status)} me-1`}></i>
                {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
              </Badge>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
            <Button 
              variant="primary" 
              onClick={() => updateApplicationStatus(selectedApplication.id, 'shortlisted')}
            >
              Shortlist Candidate
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ApplicationManagement;

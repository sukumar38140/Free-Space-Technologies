import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

interface JobApplicationFormProps {
  show: boolean;
  onHide: () => void;
  jobTitle: string;
  jobId: string;
}

interface ApplicationData {
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

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ show, onHide, jobTitle, jobId }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    experience: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      applicantName: '',
      email: '',
      phone: '',
      resume: '',
      coverLetter: '',
      experience: ''
    });
    setError('');
    setShowAlert(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = (): string | null => {
    const { applicantName, email, phone, experience, coverLetter } = formData;
    
    if (!applicantName.trim()) return 'Full name is required';
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!phone.trim()) return 'Phone number is required';
    if (!experience.trim()) return 'Experience is required';
    if (!coverLetter.trim()) return 'Cover letter is required';
    if (coverLetter.trim().length < 50) return 'Cover letter must be at least 50 characters';
    
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
      const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      const duplicateApplication = existingApplications.find((app: ApplicationData) => 
        app.jobId === jobId && app.email.toLowerCase() === formData.email.toLowerCase()
      );
      
      if (duplicateApplication) {
        setError('You have already applied for this position with this email address.');
        setLoading(false);
        return;
      }
      
      const application: ApplicationData = {
        id: Date.now().toString(),
        jobId,
        jobTitle,
        applicantName: formData.applicantName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        resume: formData.resume.trim(),
        coverLetter: formData.coverLetter.trim(),
        experience: formData.experience.trim(),
        appliedAt: new Date().toISOString(),
        status: 'pending'
      };

      const applications = [...existingApplications, application];
      localStorage.setItem('jobApplications', JSON.stringify(applications));

      // Log for debugging
      console.log('Application submitted successfully:', application);

      setAlertMessage(`Application submitted successfully! Application ID: ${application.id}. We will review your application and get back to you soon.`);
      setShowAlert(true);
      resetForm();

      setTimeout(() => {
        setShowAlert(false);
        onHide();
      }, 4000);
      
    } catch (err) {
      console.error('Application submission error:', err);
      setError('Failed to submit application. Please try again.');
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    console.log('Closing job application form');
    resetForm();
    onHide();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    console.log('Submit button clicked!', {
      formData,
      jobTitle,
      jobId,
      loading
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Apply for {jobTitle}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {showAlert && (
            <Alert variant="success" className="mb-4">
              <i className="fas fa-check-circle me-2"></i>
              {alertMessage}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-4">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number *</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resume/CV Link</Form.Label>
            <Form.Control
              type="url"
              name="resume"
              value={formData.resume}
              onChange={handleInputChange}
              placeholder="Link to your resume (Google Drive, LinkedIn, etc.)"
              disabled={loading}
            />
            <Form.Text className="text-muted">
              Share a link to your resume from Google Drive, LinkedIn, or any other platform
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Years of Experience *</Form.Label>
            <Form.Control
              as="select"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="">Select your experience level</option>
              <option value="0-1 years">0-1 years</option>
              <option value="2-3 years">2-3 years</option>
              <option value="4-5 years">4-5 years</option>
              <option value="6-10 years">6-10 years</option>
              <option value="10+ years">10+ years</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cover Letter *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              disabled={loading}
            />
            <Form.Text className="text-muted">
              Minimum 50 characters. Share your motivation and relevant experience.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            onClick={handleButtonClick}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default JobApplicationForm;
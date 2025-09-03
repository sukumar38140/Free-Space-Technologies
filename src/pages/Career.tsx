
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import JobApplicationForm from '../components/JobApplicationForm';

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

const Career = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  useEffect(() => {
    const savedJobs = localStorage.getItem('careerPosts');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      const defaultJobs: JobPost[] = [
        {
          id: '1',
          title: 'Senior Full-Stack Developer',
          department: 'Engineering',
          location: 'Remote',
          type: 'Full-time',
          description: 'Join our development team to build cutting-edge web applications using modern frameworks. Work on challenging projects that impact thousands of users.',
          requirements: 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience with React, Node.js, and TypeScript. Experience with cloud platforms and agile development.',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'UI/UX Designer',
          department: 'Design',
          location: 'Hybrid',
          type: 'Full-time',
          description: 'Create intuitive and engaging user experiences for web and mobile applications. Collaborate with product teams to design solutions that delight users.',
          requirements: 'Bachelor\'s degree in Design or related field. 3+ years of experience with Figma, Adobe Creative Suite, and user research. Portfolio demonstrating strong design skills.',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Cloud Solutions Architect',
          department: 'Infrastructure',
          location: 'On-site',
          type: 'Full-time',
          description: 'Design and implement scalable cloud infrastructure solutions. Lead cloud migration projects and ensure optimal performance and security.',
          requirements: 'Master\'s degree in Engineering or Computer Science. 6+ years of experience with AWS/Azure/GCP. Strong background in DevOps, containers, and microservices.',
          createdAt: new Date().toISOString()
        }
      ];
      setJobs(defaultJobs);
      localStorage.setItem('careerPosts', JSON.stringify(defaultJobs));
    }
  }, []);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'primary';
      case 'part-time': return 'secondary';
      case 'contract': return 'warning';
      case 'internship': return 'info';
      default: return 'primary';
    }
  };

  const handleApplyClick = (job: JobPost) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleCloseApplicationForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  const handleGeneralApplicationClick = () => {
    // Create a general application job entry
    const generalJob: JobPost = {
      id: 'general-application',
      title: 'General Application - Future Opportunities',
      department: 'Various',
      location: 'Remote/Hybrid/On-site',
      type: 'Various',
      description: 'Submit your resume for future opportunities. We\'ll contact you when a position matching your skills becomes available.',
      requirements: 'We welcome applications from professionals with diverse backgrounds and experience levels.',
      createdAt: new Date().toISOString()
    };
    setSelectedJob(generalJob);
    setShowApplicationForm(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-gradient text-white py-5" style={{marginTop: '80px'}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h1 className="display-4 fw-bold mb-4">Join Our Team</h1>
                <p className="lead">
                  Build the future of technology with us. We're looking for passionate 
                  individuals who want to make a real impact in the digital world.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title animate-fade-up">Why Choose Free Space Technologies?</h2>
              <p className="section-subtitle animate-fade-up">
                Join a company that values growth, innovation, and work-life balance
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Card className="custom-card text-center animate-fade-up">
                <div className="card-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <Card.Body>
                  <h5>Professional Growth</h5>
                  <p>Continuous learning opportunities, mentorship programs, and skill development initiatives.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="custom-card text-center animate-fade-up" style={{animationDelay: '0.1s'}}>
                <div className="card-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <Card.Body>
                  <h5>Work-Life Balance</h5>
                  <p>Flexible working hours, remote work options, and comprehensive health benefits.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="custom-card text-center animate-fade-up" style={{animationDelay: '0.2s'}}>
                <div className="card-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <Card.Body>
                  <h5>Innovation Culture</h5>
                  <p>Work on cutting-edge projects with the latest technologies and creative freedom.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Job Listings */}
      <section className="section-padding bg-light">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title animate-fade-up">Current Openings</h2>
              <p className="section-subtitle animate-fade-up">
                Discover exciting opportunities to grow your career with us
              </p>
            </Col>
          </Row>
          <Row>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <Col lg={12} key={job.id} className="mb-4">
                  <div className="career-post animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <Row className="align-items-center">
                      <Col lg={8}>
                        <h4 className="mb-2">{job.title}</h4>
                        <div className="mb-3">
                          <Badge bg="primary" className="me-2">{job.department}</Badge>
                          <Badge bg={getTypeColor(job.type)} className="me-2">{job.type}</Badge>
                          <Badge bg="secondary">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {job.location}
                          </Badge>
                        </div>
                        <p className="mb-3">{job.description}</p>
                        <div className="mb-3">
                          <h6>Requirements:</h6>
                          <p className="text-muted small">{job.requirements}</p>
                        </div>
                      </Col>
                      <Col lg={4} className="text-end">
                        <div className="mb-3">
                          <small className="text-muted">
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <Button 
                          className="btn-gradient-primary"
                          onClick={() => handleApplyClick(job)}
                        >
                          Apply Now
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))
            ) : (
              <Col lg={12} className="text-center">
                <div className="animate-fade-up">
                  <h4>No Current Openings</h4>
                  <p>We don't have any open positions right now, but we're always interested in meeting talented professionals. Send us your resume!</p>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark-gradient text-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h2 className="display-5 fw-bold mb-4">Don't See the Right Fit?</h2>
                <p className="lead mb-4">
                  We're always looking for talented individuals who share our passion 
                  for technology and innovation. Send us your resume and let's talk!
                </p>
                <Button 
                  className="btn-gradient-secondary" 
                  size="lg"
                  onClick={handleGeneralApplicationClick}
                >
                  Submit Your Resume
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Job Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          show={showApplicationForm}
          onHide={handleCloseApplicationForm}
          jobTitle={selectedJob.title}
          jobId={selectedJob.id}
        />
      )}
    </>
  );
};

export default Career;

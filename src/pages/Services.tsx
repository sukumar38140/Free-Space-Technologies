
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      icon: 'fas fa-code',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      description: 'Custom web applications and websites built with modern frameworks and best practices.',
      features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions', 'Content Management'],
      specialization: 'Frontend & Backend'
    },
    {
      title: 'Mobile Development',
      icon: 'fas fa-mobile-alt',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: ['Native iOS/Android', 'React Native', 'Flutter Development', 'App Store Deployment'],
      specialization: 'Mobile Applications'
    },
    {
      title: 'AI & Machine Learning',
      icon: 'fas fa-brain',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning algorithms.',
      features: ['AI Agents', 'Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
      specialization: 'Artificial Intelligence'
    },
    {
      title: 'Cloud Solutions',
      icon: 'fas fa-cloud',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      description: 'Scalable cloud infrastructure, migration services, and cloud-native application development.',
      features: ['AWS/Azure/GCP', 'Cloud Migration', 'DevOps Services', 'Microservices Architecture'],
      specialization: 'Cloud Infrastructure'
    },
    {
      title: 'IoT Solutions',
      icon: 'fas fa-microchip',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      description: 'Internet of Things solutions connecting devices and enabling smart automation.',
      features: ['Smart Devices', 'Sensor Integration', 'Real-time Monitoring', 'Automation Systems'],
      specialization: 'Internet of Things'
    },
    {
      title: 'Robotics',
      icon: 'fas fa-robot',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      description: 'Advanced robotics solutions for automation, manufacturing, and service applications.',
      features: ['Industrial Automation', 'Service Robots', 'Process Optimization', 'AI Integration'],
      specialization: 'Robotics & Automation'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{marginTop: '80px'}}>
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h1 className="display-2 mb-4">Our Services</h1>
                <p className="lead">
                  Comprehensive technology solutions designed to accelerate your business growth 
                  and digital transformation journey.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <Container>
          <Row>
            {services.map((service, index) => (
              <Col lg={4} md={6} key={index} className="mb-5">
                <Card className="professional-card h-100 animate-fade-up card-hover" style={{animationDelay: `${index * 0.1}s`, overflow: 'hidden'}}>
                  <div className="position-relative" style={{height: '200px', overflow: 'hidden'}}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-100 h-100"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                      background: 'linear-gradient(45deg, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.4))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className={`${service.icon} fa-3x text-white`}></i>
                    </div>
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white'
                    }}>
                      <h5 className="mb-0 text-white">{service.title}</h5>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <p className="mb-4 text-muted">{service.description}</p>
                    
                    <ul className="list-unstyled mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="mb-2">
                          <i className="fas fa-check me-2" style={{color: 'hsl(var(--primary))'}}></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <div className="h6 mb-0" style={{color: 'hsl(var(--primary))'}}>{service.specialization}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="section-padding" style={{background: 'hsl(var(--muted) / 0.3)'}}>
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="display-3 mb-4 animate-fade-up">Technologies We Use</h2>
              <p className="lead animate-fade-up animate-delay-100">
                Modern tools and frameworks that power exceptional solutions
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center animate-fade-up">
                <div className="service-icon mx-auto mb-3">
                  <i className="fab fa-react"></i>
                </div>
                <h5>Frontend</h5>
                <p className="text-muted">React, Vue.js, Angular, TypeScript</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center animate-fade-up" style={{animationDelay: '0.1s'}}>
                <div className="service-icon mx-auto mb-3">
                  <i className="fas fa-server"></i>
                </div>
                <h5>Backend</h5>
                <p className="text-muted">Node.js, Python, Java, .NET</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center animate-fade-up" style={{animationDelay: '0.2s'}}>
                <div className="service-icon mx-auto mb-3">
                  <i className="fas fa-database"></i>
                </div>
                <h5>Database</h5>
                <p className="text-muted">PostgreSQL, MongoDB, MySQL, Redis</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center animate-fade-up" style={{animationDelay: '0.3s'}}>
                <div className="service-icon mx-auto mb-3">
                  <i className="fab fa-aws"></i>
                </div>
                <h5>Cloud</h5>
                <p className="text-muted">AWS, Azure, Google Cloud, Docker</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{background: 'hsl(var(--foreground))', color: 'hsl(var(--background))'}}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h2 className="display-4 mb-4">Ready to Start Your Project?</h2>
                <p className="lead mb-4">
                  Let's discuss your requirements and create a solution that drives results.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/contact">
                    <Button 
                      className="btn-clean-secondary"
                      size="lg"
                    >
                      Get Quote
                    </Button>
                  </Link>
                  <Button 
                    variant="outline-light" 
                    size="lg"
                    className="btn-clean-secondary"
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const LearnMore = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const savedContent = localStorage.getItem('learnMoreContent');
    if (savedContent) {
      setContent(savedContent);
    } else {
      // Set default content about modern technology solutions
      const defaultContent = `Welcome to the future of business technology!

At Free Space Technologies, we believe that every business deserves access to cutting-edge technology solutions that drive growth and innovation. Our comprehensive approach combines industry expertise with the latest technological advancements to deliver solutions that not only meet your current needs but also prepare you for future challenges.

Our Technology Philosophy:
We embrace emerging technologies while maintaining a focus on practical, business-driven solutions. Whether you're looking to modernize legacy systems, implement cloud infrastructure, or develop custom applications, our team brings deep technical expertise and strategic thinking to every project.

What Sets Us Apart:
• Agile Development: We use modern development methodologies to ensure rapid delivery and continuous improvement
• Scalable Architecture: Our solutions are built to grow with your business
• Security First: We implement robust security measures from the ground up
• User-Centric Design: Every solution is designed with the end-user experience in mind

Industry Expertise:
We serve clients across various industries including healthcare, finance, e-commerce, manufacturing, and education. Our diverse experience allows us to bring cross-industry insights and best practices to every project.

The Future is Here:
As technology continues to evolve, we stay at the forefront of innovation, exploring new possibilities in areas like artificial intelligence, machine learning, IoT, and cloud computing. Our goal is to help you leverage these technologies to create competitive advantages and drive business success.

Ready to transform your business? Let's start the conversation about how technology can propel your organization forward.`;
      
      setContent(defaultContent);
      localStorage.setItem('learnMoreContent', defaultContent);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ marginTop: '80px', paddingTop: '60px', paddingBottom: '60px' }}>
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Learn More</h1>
              <p className="lead">Discover how we're transforming businesses through innovative technology solutions</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              {content ? (
                <Card className="shadow-sm">
                  <Card.Body className="p-5">
                    <div 
                      className="content-display"
                      dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
                      style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#333'
                      }}
                    />
                  </Card.Body>
                </Card>
              ) : (
                <Card className="shadow-sm">
                  <Card.Body className="p-5 text-center">
                    <div className="py-5">
                      <i className="fas fa-info-circle fa-4x text-muted mb-4"></i>
                      <h3 className="mb-3">Content Loading</h3>
                      <p className="text-muted">
                        Please wait while we load the latest information about our services and solutions.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LearnMore;

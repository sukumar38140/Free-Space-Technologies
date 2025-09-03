
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TermsOfService = () => {
  return (
    <>
      <section className="bg-primary-gradient text-white py-5" style={{marginTop: '80px'}}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h1 className="display-4 fw-bold mb-4">Terms of Service</h1>
                <p className="lead">
                  Please review these terms carefully as they govern your use of our services.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="animate-fade-up">
                <p className="text-muted mb-4">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <h3>1. Agreement to Terms</h3>
                <p>
                  By accessing our website or using our services, you agree to be bound by 
                  these Terms of Service and all applicable laws and regulations.
                </p>

                <h3>2. Service Description</h3>
                <p>
                  Free Space Technologies provides technology consulting, web development, 
                  mobile application development, cloud solutions, and related digital services 
                  as outlined on our website.
                </p>

                <h3>3. Client Responsibilities</h3>
                <p>As our client, you agree to:</p>
                <ul>
                  <li>Provide accurate and complete project information</li>
                  <li>Respond promptly to requests for feedback and approvals</li>
                  <li>Make timely payments according to agreed terms</li>
                  <li>Respect intellectual property rights</li>
                  <li>Use our services in compliance with applicable laws</li>
                </ul>

                <h3>4. Intellectual Property</h3>
                <p>
                  Unless otherwise specified in a separate agreement, you retain ownership 
                  of your content and data. We retain rights to our methodologies, tools, 
                  and general knowledge used in providing services.
                </p>

                <h3>5. Payment Terms</h3>
                <p>
                  Payment terms are specified in individual project agreements. Generally, 
                  payments are due within 30 days of invoice date. Late payments may incur 
                  additional fees.
                </p>

                <h3>6. Service Availability</h3>
                <p>
                  While we strive for continuous service availability, we cannot guarantee 
                  uninterrupted access. We reserve the right to perform maintenance and 
                  updates as necessary.
                </p>

                <h3>7. Limitation of Liability</h3>
                <p>
                  Our liability is limited to the amount paid for services. We are not liable 
                  for indirect, incidental, or consequential damages arising from the use of 
                  our services.
                </p>

                <h3>8. Confidentiality</h3>
                <p>
                  We maintain strict confidentiality regarding client information and project 
                  details. Both parties agree to protect confidential information shared 
                  during the course of our business relationship.
                </p>

                <h3>9. Termination</h3>
                <p>
                  Either party may terminate the service agreement with appropriate notice 
                  as specified in individual contracts. Termination does not relieve either 
                  party of obligations incurred prior to termination.
                </p>

                <h3>10. Governing Law</h3>
                <p>
                  These terms are governed by the laws of California, United States. Any 
                  disputes will be resolved through binding arbitration in San Francisco, CA.
                </p>

                <h3>11. Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be 
                  effective upon posting to our website. Continued use of our services 
                  constitutes acceptance of modified terms.
                </p>

                <h3>12. Contact Us</h3>
                <p>
                  For questions regarding these terms, please contact us:
                </p>
                <p>
                  <strong>Email:</strong> legal@freespacetec.com<br />
                  <strong>Phone:</strong> +1 (415) 555-0123<br />
                  <strong>Address:</strong> 456 Innovation Drive, Tech Hub Plaza, Suite 200, San Francisco, CA 94105
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TermsOfService;

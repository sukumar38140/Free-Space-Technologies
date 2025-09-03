
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <>
      <section className="bg-primary-gradient text-white py-5" style={{marginTop: '80px'}}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="animate-fade-up">
                <h1 className="display-4 fw-bold mb-4">Privacy Policy</h1>
                <p className="lead">
                  Your privacy matters to us. Learn how we collect, use, and protect 
                  your personal information when you use our services.
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
                  <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                </p>

                <h3>1. Information Collection</h3>
                <p>We collect information that you provide to us when you:</p>
                <ul>
                  <li>Complete contact forms or request quotes</li>
                  <li>Subscribe to our newsletters or updates</li>
                  <li>Apply for job opportunities</li>
                  <li>Communicate with us via email or phone</li>
                  <li>Use our website and services</li>
                </ul>

                <h3>2. Use of Information</h3>
                <p>We use your information to:</p>
                <ul>
                  <li>Respond to your inquiries and provide requested services</li>
                  <li>Send you relevant updates and communications</li>
                  <li>Improve our website and service offerings</li>
                  <li>Process job applications and recruitment</li>
                  <li>Comply with legal requirements</li>
                </ul>

                <h3>3. Information Protection</h3>
                <p>
                  We implement industry-standard security measures to protect your personal 
                  information from unauthorized access, use, or disclosure. This includes 
                  encryption, secure servers, and regular security audits.
                </p>

                <h3>4. Information Sharing</h3>
                <p>
                  We do not sell, rent, or share your personal information with third parties 
                  for marketing purposes. We may share information only when required by law 
                  or with trusted service providers who assist in our operations.
                </p>

                <h3>5. Cookies and Analytics</h3>
                <p>
                  Our website uses cookies to improve user experience and analytics tools 
                  to understand how visitors use our site. You can control cookie settings 
                  through your browser preferences.
                </p>

                <h3>6. Your Privacy Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Request access to your personal information</li>
                  <li>Correct any inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Unsubscribe from marketing communications</li>
                  <li>Object to certain uses of your information</li>
                </ul>

                <h3>7. Data Retention</h3>
                <p>
                  We retain your personal information only as long as necessary to fulfill 
                  the purposes outlined in this policy or as required by law.
                </p>

                <h3>8. Updates to This Policy</h3>
                <p>
                  We may update this privacy policy periodically. Any changes will be posted 
                  on this page with an updated effective date.
                </p>

                <h3>9. Contact Information</h3>
                <p>
                  If you have questions about this privacy policy or our data practices, 
                  please contact us:
                </p>
                <p>
                  <strong>Email:</strong> privacy@freespacetec.com<br />
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

export default PrivacyPolicy;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

const About = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  // Migrate any saved team images in localStorage to local public/team assets
  const migrateTeamImages = (teamData: Record<string, TeamMember>) => {
    try {
      const data = { ...teamData };
      const updateIfNeeded = (m: TeamMember, target: string) => {
        if (!m) return m;
        const img: string = m.image || '';
        const isExternal = img.includes('images.unsplash.com') || img.startsWith('http');
        const isAlreadyLocal = img.startsWith('/team/');
        if (!isAlreadyLocal && (isExternal || !img)) {
          m.image = target;
        }
        return m;
      };
      Object.keys(data).forEach((key) => {
        const m = data[key];
        if (!m) return;
        switch (m.id || key) {
          case 'ceo':
            data[key] = updateIfNeeded(m, '/team/Kumar%20Saatharla%20CEO.jpg');
            break;
          case 'manager':
            data[key] = updateIfNeeded(m, '/team/Hemanth.png');
            break;
          case 'ai_specialist':
            data[key] = updateIfNeeded(m, '/team/Pujitha%20Golla.png');
            break;
          default:
            break;
        }
      });
      return data;
    } catch {
      return teamData;
    }
  };

  // Updated team data with correct Free Space Technologies team
  const defaultTeam = [
    {
      id: 'ceo',
      name: 'Kumar Saatharla',
      position: 'Founder & CEO',
      image: '/team/Kumar Saatharla CEO.jpg',
      bio: 'Visionary leader with expertise in technology consulting and business development.'
    },
    {
      id: 'manager',
      name: 'Hemanth Kumar Pattem',
      position: 'Team Manager',
      image: '/team/Hemanth.png',
      bio: 'Experienced manager specializing in team coordination and project management.'
    },
    {
      id: 'ai_specialist',
      name: 'Golla Pujitha',
      position: 'Co-Founder & AI-Specialist',
      image: '/team/Pujitha Golla.png',
      bio: 'AI expert and co-founder passionate about artificial intelligence and innovative solutions. Specializes in machine learning and cutting-edge AI technologies.'
    }
  ];

  useEffect(() => {
    // Load team members from localStorage
    const savedTeam = localStorage.getItem('teamMembers');
    if (savedTeam) {
      const teamData = JSON.parse(savedTeam);
      const migrated = migrateTeamImages(teamData);
      setTeam(Object.values(migrated));
      // Persist migration if any
      if (JSON.stringify(migrated) !== savedTeam) {
        localStorage.setItem('teamMembers', JSON.stringify(migrated));
      }
    } else {
      // Use default team data if no saved data exists
      setTeam(defaultTeam);
    }
  }, []); // defaultTeam is a constant, safe to omit

  const values = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions to solve complex challenges.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Partnership',
      description: 'We build lasting relationships with our clients based on trust and mutual success.'
    },
    {
      icon: 'fas fa-award',
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code to customer service.'
    },
    {
      icon: 'fas fa-users',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication to achieve great results.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-gradient text-white py-5" style={{marginTop: '80px'}}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="animate-fade-left">
                <h1 className="display-4 fw-bold mb-4">About Free Space Technologies</h1>
                <p className="lead">
                  We are a dynamic technology company committed to helping businesses 
                  thrive in the digital age through innovative solutions and expert guidance.
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="animate-fade-right">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop"
                  alt="Our Team at Work"
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="animate-fade-up text-center mb-5">
                <h2 className="section-title">Our Journey</h2>
                <p className="section-subtitle">
                  Building tomorrow's solutions today
                </p>
              </div>
              <div className="animate-fade-up">
                <p className="lead text-center mb-4">
                  Established in 2018, Free Space Technologies emerged from a simple vision: 
                  to bridge the gap between complex technology and practical business solutions.
                </p>
                <p className="mb-4">
                  What started as a small team of passionate developers has grown into a 
                  comprehensive technology partner, serving clients from innovative startups 
                  to established enterprises. Our journey has been marked by continuous learning, 
                  adaptation, and an unwavering commitment to our clients' success.
                </p>
                <p className="mb-4">
                  Today, we stand at the forefront of digital transformation, helping 
                  organizations leverage cutting-edge technologies to streamline operations, 
                  enhance customer experiences, and drive sustainable growth in an 
                  increasingly digital world.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-light">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title animate-fade-up">Our Core Values</h2>
              <p className="section-subtitle animate-fade-up">
                The principles that drive our success
              </p>
            </Col>
          </Row>
          <Row>
            {values.map((value, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="custom-card text-center animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="card-icon">
                    <i className={value.icon}></i>
                  </div>
                  <Card.Body>
                    <h5>{value.title}</h5>
                    <p>{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Team */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="section-title animate-fade-up">Meet Our Leadership</h2>
              <p className="section-subtitle animate-fade-up">
                The experienced professionals guiding our vision
              </p>
            </Col>
          </Row>
          <Row>
            {team.map((member, index) => (
              <Col lg={4} md={6} key={member.id} className="mb-4">
                <div className="team-card animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-avatar"
                  />
                  <h5>{member.name}</h5>
                  <h6 className="text-primary mb-3">{member.position}</h6>
                  <p className="text-muted">{member.bio}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats */}
      <section className="section-padding bg-dark-gradient">
        <Container>
          <Row className="text-center">
            <Col lg={3} md={6} className="mb-4">
              <div className="animate-fade-up">
                <div className="stats-counter">6+</div>
                <h5>Years of Excellence</h5>
                <p>Delivering quality solutions since 2018</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="animate-fade-up" style={{animationDelay: '0.1s'}}>
                <div className="stats-counter">350+</div>
                <h5>Projects Delivered</h5>
                <p>Successful implementations across industries</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
                <div className="stats-counter">180+</div>
                <h5>Satisfied Clients</h5>
                <p>Long-term partnerships worldwide</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="animate-fade-up" style={{animationDelay: '0.3s'}}>
                <div className="stats-counter">35+</div>
                <h5>Team Members</h5>
                <p>Skilled professionals and growing</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;

import React, { useState, useRef } from 'react';
import { Modal, Form, Button, Nav, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Plus } from 'lucide-react';

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ show, onHide }) => {
  const { currentUser, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    profileImage: currentUser?.profileImage || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    setMessage('');
    setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setMessage('');
    setError('');
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files (PNG, JPG, JPEG, GIF, etc.)');
        return;
      }

      // Check file size (optional - limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Create a temporary URL for the image
      const imageUrl = URL.createObjectURL(file);
      setProfileData({
        ...profileData,
        profileImage: imageUrl
      });
      setError('');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      updateProfile(profileData.name, profileData.profileImage);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
    
    setLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const success = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (success) {
        setMessage('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError('Current password is incorrect');
      }
    } catch (err) {
      setError('Failed to change password');
    }
    
    setLoading(false);
  };

  const switchTab = (tab: 'profile' | 'password') => {
    setActiveTab(tab);
    setMessage('');
    setError('');
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Profile Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="pills" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'profile'} 
              onClick={() => switchTab('profile')}
              style={{ cursor: 'pointer' }}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'password'} 
              onClick={() => switchTab('password')}
              style={{ cursor: 'pointer' }}
            >
              Change Password
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {message && (
          <Alert variant="success" className="mb-3">
            {message}
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        {activeTab === 'profile' ? (
          <Form onSubmit={handleProfileSubmit}>
            <Row>
              <Col md={12} className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <div 
                    className="profile-avatar d-flex align-items-center justify-content-center position-relative"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      backgroundColor: '#007bff',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      border: '3px solid #e9ecef'
                    }}
                  >
                    {profileData.profileImage ? (
                      <img 
                        src={profileData.profileImage} 
                        alt="Profile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      getInitials(profileData.name || 'U')
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleImageSelect}
                    className="btn btn-primary btn-sm position-absolute"
                    style={{
                      bottom: '5px',
                      right: '5px',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <p className="mt-2 text-muted small">Click the + button to upload a profile picture</p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image URL (Optional)</Form.Label>
                  <Form.Control
                    type="url"
                    name="profileImage"
                    value={profileData.profileImage}
                    onChange={handleProfileChange}
                    placeholder="Enter image URL or upload using the + button above"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button 
              type="submit" 
              className="btn-gradient-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="btn-gradient-primary"
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

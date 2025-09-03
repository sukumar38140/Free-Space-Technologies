
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';

const ProfileDropdown: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="link"
          id="profile-dropdown"
          className="p-0 border-0 bg-transparent"
          style={{ boxShadow: 'none' }}
        >
          <div 
            className="profile-avatar d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {currentUser?.profileImage ? (
              <img 
                src={currentUser.profileImage} 
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              getInitials(currentUser?.name || 'U')
            )}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>
            <div className="fw-bold">{currentUser?.name}</div>
            <div className="text-muted small">{currentUser?.email}</div>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setShowProfileModal(true)}>
            <i className="fas fa-user me-2"></i>
            Profile Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowProfileModal(true)}>
            <i className="fas fa-key me-2"></i>
            Change Password
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} className="text-danger">
            <i className="fas fa-sign-out-alt me-2"></i>
            Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ProfileModal 
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default ProfileDropdown;

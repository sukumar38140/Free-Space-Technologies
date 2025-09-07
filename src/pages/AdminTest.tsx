import React from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const AdminTest = () => {
  const { currentUser, isAuthenticated, isRootAdmin, login, logout } = useAdminAuth();

  const handleTestLogin = async () => {
    console.log('Testing login...');
    const result = await login('24691F0071@mits.ac.in', 'Hemanth@71');
    console.log('Login result:', result);
  };

  const handleTestKumarLogin = async () => {
    console.log('Testing Kumar admin login...');
    const result = await login('24691F00A8@mits.ac.in', 'Kumar@12345');
    console.log('Kumar login result:', result);
  };

  const handleTestPujithaLogin = async () => {
    console.log('Testing Pujitha admin login...');
    const result = await login('24691F00C3@mits.ac.in', 'Pujitha@C3');
    console.log('Pujitha login result:', result);
  };

  const handleClearStorage = () => {
    localStorage.removeItem('adminUser');
    console.log('Cleared localStorage');
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Admin Authentication Test</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Current State:</h3>
        <p><strong>isAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
        <p><strong>isRootAdmin:</strong> {isRootAdmin ? 'true' : 'false'}</p>
        <p><strong>currentUser:</strong> {currentUser ? JSON.stringify(currentUser, null, 2) : 'null'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Actions:</h3>
        <button onClick={handleTestLogin} style={{ marginRight: '10px', padding: '10px' }}>
          Test Login (Root Admin)
        </button>
        <button onClick={handleTestKumarLogin} style={{ marginRight: '10px', padding: '10px' }}>
          Test Kumar Admin Login
        </button>
        <button onClick={handleTestPujithaLogin} style={{ marginRight: '10px', padding: '10px' }}>
          Test Pujitha Admin Login
        </button>
        <button onClick={logout} style={{ marginRight: '10px', padding: '10px' }}>
          Logout
        </button>
        <button onClick={handleClearStorage} style={{ padding: '10px' }}>
          Clear Storage & Reload
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>LocalStorage Check:</h3>
        <p>{localStorage.getItem('adminUser') || 'No admin user in localStorage'}</p>
      </div>

      <div>
        <h3>Instructions:</h3>
        <ol>
          <li>Click "Test Login" to simulate a successful login</li>
          <li>Check if the state updates correctly</li>
          <li>If authenticated, you should see the user details above</li>
          <li>Navigate to /admin or /myadminpage to test the actual page</li>
        </ol>
      </div>
    </div>
  );
};

export default AdminTest;

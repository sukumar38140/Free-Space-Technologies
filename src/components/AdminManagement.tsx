import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface AdminAccount {
  id: string;
  username: string;
  role: 'root' | 'admin';
  email: string;
  password?: string;
}

const AdminManagement = () => {
  const { isRootAdmin } = useAdminAuth();
  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'root'
  });

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = () => {
    const savedAdmins = localStorage.getItem('adminAccounts');
    if (savedAdmins) {
      setAdmins(JSON.parse(savedAdmins));
    } else {
      // Initialize with default accounts including updated company emails
      const defaultAdmins = [
        { id: '1', username: 'rootadmin', role: 'root' as const, email: 'root@freespacetechnologies.com' },
        { id: '2', username: 'admin1', role: 'admin' as const, email: 'saatharlakumar@gmail.com' },
        { id: '3', username: 'admin2', role: 'admin' as const, email: 'admin2@freespacetechnologies.com' }
      ];
      setAdmins(defaultAdmins);
      localStorage.setItem('adminAccounts', JSON.stringify(defaultAdmins));
    }
  };

  const saveAdmins = (updatedAdmins: AdminAccount[]) => {
    localStorage.setItem('adminAccounts', JSON.stringify(updatedAdmins));
    setAdmins(updatedAdmins);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAdmin) {
      // Update existing admin
      const updatedAdmins = admins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData }
          : admin
      );
      saveAdmins(updatedAdmins);
      setAlertMessage('Admin account updated successfully!');
    } else {
      // Create new admin
      const newAdmin: AdminAccount = {
        id: Date.now().toString(),
        ...formData
      };
      const updatedAdmins = [...admins, newAdmin];
      saveAdmins(updatedAdmins);
      setAlertMessage('Admin account created successfully!');
    }
    
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    handleCloseModal();
  };

  const handleEdit = (admin: AdminAccount) => {
    setEditingAdmin(admin);
    setFormData({
      username: admin.username,
      email: admin.email,
      password: '',
      role: admin.role
    });
    setShowModal(true);
  };

  const handleDelete = (adminId: string) => {
    if (window.confirm('Are you sure you want to delete this admin account?')) {
      const updatedAdmins = admins.filter(admin => admin.id !== adminId);
      saveAdmins(updatedAdmins);
      setAlertMessage('Admin account deleted successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'admin'
    });
  };

  const handleNewAdmin = () => {
    setEditingAdmin(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'admin'
    });
    setShowModal(true);
  };

  if (!isRootAdmin) {
    return (
      <Card className="admin-card">
        <Card.Body className="text-center py-5">
          <i className="fas fa-lock fa-3x text-muted mb-3"></i>
          <h4>Access Restricted</h4>
          <p className="text-muted">Only root administrators can manage admin accounts.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {showAlert && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          {alertMessage}
        </Alert>
      )}

      <Card className="admin-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Admin Account Management</h5>
          <Button className="btn-gradient-primary" onClick={handleNewAdmin}>
            <i className="fas fa-user-plus me-2"></i>
            Add New Admin
          </Button>
        </Card.Header>
        <Card.Body>
          {admins.length > 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td><strong>{admin.username}</strong></td>
                    <td>{admin.email}</td>
                    <td>
                      <span className={`badge bg-${admin.role === 'root' ? 'danger' : 'primary'}`}>
                        {admin.role === 'root' ? 'Root Admin' : 'Admin'}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(admin)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      {admin.role !== 'root' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(admin.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <h4>No Admin Accounts</h4>
              <p className="text-muted">Create your first admin account to get started.</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Admin Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAdmin ? 'Edit Admin Account' : 'Add New Admin Account'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editingAdmin}
                placeholder={editingAdmin ? "Leave blank to keep current password" : "Enter password"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role *</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="admin">Admin</option>
                <option value="root">Root Admin</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-gradient-primary">
              {editingAdmin ? 'Update Admin' : 'Create Admin'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AdminManagement;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SORT_FIELDS = {
  submittedAt: 'Date',
  name: 'Name',
  email: 'Email'
};

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [sortField, setSortField] = useState('submittedAt');
  const [sortDir, setSortDir] = useState('desc'); // 'asc' | 'desc'
  const navigate = useNavigate();

  const getToken = () => sessionStorage.getItem('adminToken');

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const fetchContacts = useCallback(async () => {
    const token = getToken();
    if (!token) {
      navigate('/admin');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data.contacts);
      setTotal(response.data.total);
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem('adminToken');
        navigate('/admin');
      } else {
        setError(err.response?.data?.error || 'Failed to load contacts.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`/api/admin/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setTotal((prev) => prev - 1);
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete contact.');
      setDeleteConfirm(null);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const getSortedContacts = () => {
    return [...contacts].sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (sortField === 'submittedAt') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
        return sortDir === 'asc' ? valA - valB : valB - valA;
      }
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="sort-icon sort-icon--inactive">⇅</span>;
    return <span className="sort-icon sort-icon--active">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const sortedContacts = getSortedContacts();

  return (
    <section id="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="admin-subtitle">
            Contact Submissions &nbsp;
            <span className="admin-badge">{total} / 1000</span>
          </p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-refresh-btn" onClick={fetchContacts} disabled={isLoading} title="Refresh">
            🔄 Refresh
          </button>
          <button className="admin-logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="admin-error-message" role="alert">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="admin-loading">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="admin-empty">No contact submissions yet.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th
                  className="admin-sortable-th"
                  onClick={() => handleSort('name')}
                  title="Sort by Name"
                >
                  Name <SortIcon field="name" />
                </th>
                <th
                  className="admin-sortable-th"
                  onClick={() => handleSort('email')}
                  title="Sort by Email"
                >
                  Email <SortIcon field="email" />
                </th>
                <th>Message</th>
                <th
                  className="admin-sortable-th"
                  onClick={() => handleSort('submittedAt')}
                  title="Sort by Date"
                >
                  Submitted At <SortIcon field="submittedAt" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td className="admin-message-cell">
                    {expandedId === contact.id ? (
                      <>
                        <span>{contact.message}</span>
                        <button
                          className="admin-toggle-btn"
                          onClick={() => setExpandedId(null)}
                        >
                          Show less
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{contact.message.length > 80 ? contact.message.slice(0, 80) + '…' : contact.message}</span>
                        {contact.message.length > 80 && (
                          <button
                            className="admin-toggle-btn"
                            onClick={() => setExpandedId(contact.id)}
                          >
                            Read more
                          </button>
                        )}
                      </>
                    )}
                  </td>
                  <td className="admin-date-cell">{formatDate(contact.submittedAt)}</td>
                  <td>
                    {deleteConfirm === contact.id ? (
                      <div className="admin-confirm-delete">
                        <span>Delete?</span>
                        <button
                          className="admin-confirm-yes"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Yes
                        </button>
                        <button
                          className="admin-confirm-no"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        className="admin-delete-btn"
                        onClick={() => setDeleteConfirm(contact.id)}
                        title="Delete this contact"
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;

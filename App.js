import React, { useState, useMemo } from 'react';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CustomerGrid from './components/CustomerGrid';
import AddEditModal from './components/AddEditModal';
import { dummyCustomers } from './data/dummyData';
import './App.css';

function App() {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showArchivedOnly, setShowArchivedOnly] = useState(false);

  // Filter customers based on search and archive status
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);

      if (showArchivedOnly) {
        return matchesSearch && customer.archived;
      } else {
        return matchesSearch && !customer.archived;
      }
    });
  }, [customers, searchTerm, showArchivedOnly]);

  // Handle adding new customer
  const handleAddCustomer = (formData) => {
    const newCustomer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...formData,
      archived: false,
      createdDate: new Date().toLocaleDateString()
    };
    setCustomers([...customers, newCustomer]);
    setShowAddModal(false);
  };

  // Handle editing customer
  const handleEditCustomer = (formData) => {
    setCustomers(customers.map(c => 
      c.id === editingCustomer.id ? { ...c, ...formData } : c
    ));
    setShowEditModal(false);
    setEditingCustomer(null);
  };

  // Handle archive customer
  const handleArchiveCustomer = (id) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, archived: true } : c
    ));
  };

  // Handle unarchive customer
  const handleUnarchiveCustomer = (id) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, archived: false } : c
    ));
  };

  // Open edit modal
  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setShowEditModal(true);
  };

  return (
    <div className="app-container">
      <Header />
      
      <Container fluid className="container-wrapper">
        <div className="controls-section">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showArchivedOnly={showArchivedOnly}
            onToggleArchived={setShowArchivedOnly}
          />
          <button 
            className="btn-add-customer"
            onClick={() => setShowAddModal(true)}
          >
            + Add Customer
          </button>
        </div>

        <CustomerGrid 
          customers={filteredCustomers}
          onEdit={openEditModal}
          onArchive={handleArchiveCustomer}
          onUnarchive={handleUnarchiveCustomer}
        />

        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-title">
              {searchTerm ? 'No customers found' : 'No active customers'}
            </div>
            <div className="empty-state-message">
              {searchTerm 
                ? 'Try searching with different terms' 
                : 'Click "Add Customer" to create new profiles'}
            </div>
          </div>
        )}
      </Container>

      <AddEditModal
        isOpen={showAddModal}
        toggle={() => setShowAddModal(false)}
        onSubmit={handleAddCustomer}
        isEdit={false}
      />

      <AddEditModal
        isOpen={showEditModal}
        toggle={() => {
          setShowEditModal(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleEditCustomer}
        isEdit={true}
        customer={editingCustomer}
      />
    </div>
  );
}

export default App;

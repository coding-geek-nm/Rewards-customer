import React from 'react';

const CustomerCard = ({ customer, onEdit, onArchive, onUnarchive }) => {
  return (
    <div className={`customer-card ${customer.archived ? 'archived' : ''}`}>
      <div className="avatar-container">
        <img 
          src={customer.avatar} 
          alt={customer.name}
          className="avatar"
        />
      </div>

      <div className="customer-info">
        <div className="customer-name">{customer.name}</div>
        <div className="loyalty-badge">Level {customer.loyaltyLevel}</div>
        
        <div className="customer-detail">
          <strong>Email:</strong> {customer.email}
        </div>
        <div className="customer-detail">
          <strong>Phone:</strong> {customer.phone}
        </div>
        <div className="customer-detail">
          <strong>DOB:</strong> {new Date(customer.dob).toLocaleDateString()}
        </div>
      </div>

      <div className="card-buttons">
        {!customer.archived ? (
          <>
            <button 
              className="btn-icon btn-edit"
              onClick={() => onEdit(customer)}
              title="Edit customer details"
            >
              ✏️ Edit
            </button>
            <button 
              className="btn-icon btn-archive"
              onClick={() => onArchive(customer.id)}
              title="Archive this customer"
            >
              📦 Archive
            </button>
          </>
        ) : (
          <button 
            className="btn-icon btn-unarchive"
            onClick={() => onUnarchive(customer.id)}
            title="Restore archived customer"
            style={{ flex: 1 }}
          >
            ↩️ Unarchive
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;

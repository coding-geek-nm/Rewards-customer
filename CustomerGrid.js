import React from 'react';
import CustomerCard from './CustomerCard';

const CustomerGrid = ({ customers, onEdit, onArchive, onUnarchive }) => {
  return (
    <div className="customers-grid">
      {customers.map(customer => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onEdit={onEdit}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      ))}
    </div>
  );
};

export default CustomerGrid;

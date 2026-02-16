import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, showArchivedOnly, onToggleArchived }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Search by name, email, or phone..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          id="archived-toggle"
          checked={showArchivedOnly}
          onChange={(e) => onToggleArchived(e.target.checked)}
          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
        />
        <label htmlFor="archived-toggle" style={{ cursor: 'pointer', margin: 0, fontSize: '0.9rem' }}>
          Show Archived Only
        </label>
      </div>
    </div>
  );
};

export default SearchBar;

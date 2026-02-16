import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { avatarImages } from '../data/dummyData';
import AvatarSelector from './AvatarSelector';

const AddEditModal = ({ isOpen, toggle, onSubmit, isEdit, customer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    loyaltyLevel: 1,
    avatar: avatarImages[0]
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (isEdit && customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        dob: customer.dob,
        loyaltyLevel: customer.loyaltyLevel,
        avatar: customer.avatar
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        dob: '',
        loyaltyLevel: 1,
        avatar: avatarImages[0]
      });
    }
    setErrors({});
  }, [isOpen, isEdit, customer]);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-?\d{4}$|^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone format (e.g., 555-0101)';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dob = 'Customer must be at least 18 years old';
      }
      if (birthDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
      }
    }

    if (!formData.avatar) {
      newErrors.avatar = 'Please select an avatar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      avatar
    }));
    if (errors.avatar) {
      setErrors(prev => ({
        ...prev,
        avatar: ''
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: '',
      loyaltyLevel: 1,
      avatar: avatarImages[0]
    });
    setErrors({});
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleCancel} size="lg" centered>
      <ModalHeader toggle={handleCancel} className="modal-header">
        {isEdit ? '✏️ Edit Customer' : '➕ Add New Customer'}
      </ModalHeader>
      
      <ModalBody className="modal-body">
        {/* Name Field */}
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter customer name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleInputChange}
            placeholder="customer@email.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="555-0101"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        {/* Date of Birth Field */}
        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
            value={formData.dob}
            onChange={handleInputChange}
          />
          {errors.dob && <span className="error-message">{errors.dob}</span>}
        </div>

        {/* Loyalty Level Field */}
        <div className="form-group">
          <label className="form-label">Loyalty Level</label>
          <select
            name="loyaltyLevel"
            className="form-select"
            value={formData.loyaltyLevel}
            disabled
            title="Loyalty level is preset to 1 and cannot be changed during creation"
          >
            <option value={1}>Level 1 (Starter)</option>
            <option value={2}>Level 2 (Silver)</option>
            <option value={3}>Level 3 (Gold)</option>
            <option value={4}>Level 4 (Platinum)</option>
            <option value={5}>Level 5 (Diamond)</option>
          </select>
          <small style={{ color: '#999', display: 'block', marginTop: '6px' }}>
            💡 Loyalty level is automatically set to 1 for new customers
          </small>
        </div>

        {/* Avatar Selection */}
        <div className="form-group">
          <label className="form-label">Select Avatar *</label>
          <AvatarSelector
            selectedAvatar={formData.avatar}
            onSelectAvatar={handleAvatarSelect}
            avatarImages={avatarImages}
          />
          {errors.avatar && <span className="error-message">{errors.avatar}</span>}
        </div>
      </ModalBody>

      <ModalFooter className="modal-footer">
        <button className="btn-modal-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn-modal-save" onClick={handleSubmit}>
          {isEdit ? '💾 Update' : '✅ Save'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditModal;

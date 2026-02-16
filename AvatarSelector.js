import React from 'react';

const AvatarSelector = ({ selectedAvatar, onSelectAvatar, avatarImages }) => {
  return (
    <div className="avatar-selection">
      {avatarImages.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar option ${index + 1}`}
          className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
          onClick={() => onSelectAvatar(avatar)}
          title={`Select avatar ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default AvatarSelector;

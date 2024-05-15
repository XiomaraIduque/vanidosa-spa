import React from 'react';

const Alert = ({ severity, children }) => {
  const alertStyles = {
    padding: '10px',
    border: '1px solid',
    marginBottom: '10px',
    backgroundColor: severity === 'error' ? '#f8d7da' : 'initial',
    borderColor: severity === 'error' ? '#f5c6cb' : 'initial',
    color: severity === 'error' ? '#721c24' : 'initial'
  };

  return (
    <div style={alertStyles}>
      {children}
    </div>
  );
};

export default Alert;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalHeader = ({ title, icon: Icon, roomId, onClose }) => (
  <Modal.Header closeButton className="border-bottom bg-light">
    <Modal.Title className="d-flex align-items-center justify-content-between w-100">
      <div className="d-flex align-items-center">
        {Icon && <Icon className="me-3 text-primary" size={28} />}
        <span className="h4 mb-0 fw-semibold">{title}</span>
      </div>
      {roomId && (
        <div className="badge bg-primary d-flex align-items-center px-3 py-2">
          <span className="fs-6">{roomId}</span>
        </div>
      )}
    </Modal.Title>
  </Modal.Header>
);

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  roomId: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default ModalHeader;
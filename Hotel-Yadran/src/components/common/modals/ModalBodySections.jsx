import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { ServiceCheckChip, StatusBadge } from '../badges';

export const ModalBodySections = ({ roomData, selectedServices, servicesList, statusList }) => (
  <>
    <div className="form-section services-section mt-4 pt-4 border-top">
      <div className="mb-4">
        <h5 className="text-primary mb-3 fw-semibold">Servicios Disponibles</h5>
        <Row className="g-2">
          {servicesList.map(service => (
            <Col md={6} key={service.value}>
              <ServiceCheckChip
                service={service.value}
                label={service.label}
                icon={service.icon}
                isSelected={selectedServices.includes(service.value)}
              />
            </Col>
          ))}
        </Row>

        <Container>
          <div className="status-list mt-4">
            <h6 className="text-primary mb-3">Estados Disponibles:</h6>
            <div className="d-flex flex-wrap gap-2">
              {statusList.map(status => (
                <StatusBadge
                  key={status.value}
                  status={status.value}
                  variant={status.variant}
                  label={status.label}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  </>
);

ModalBodySections.propTypes = {
  roomData: PropTypes.object.isRequired,
  selectedServices: PropTypes.array.isRequired,
  servicesList: PropTypes.array.isRequired,
  statusList: PropTypes.array.isRequired
};
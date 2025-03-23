import React from 'react';
import { Table, Button, Container, Card, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminRoomsEsq.css';

function AdminRoomsEsq() {
  return (
    <Container className="containerEsqRooms py-5">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body className="p-4">
          <Row className="align-items-center mb-5">
            <Col>
              <div className="placeholder-glow">
                <span className="placeholder col-6 bg-primary"></span>
              </div>
            </Col>
            <Col xs="auto">
              <div className="placeholder-glow">
                <Button variant="primary" disabled className="placeholder col-12">
                  <span className="placeholder col-12"></span>
                </Button>
              </div>
            </Col>
          </Row>

          <Table striped bordered hover responsive className="align-middle">
            <thead>
              <tr className="bg-light">
                <th className="text-center py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                </th>
                <th className="py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                </th>
                <th className="py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </div>
                </th>
                <th className="text-center py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                </th>
                <th className="text-center py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </div>
                </th>
                <th className="py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </div>
                </th>
                <th className="text-center py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                </th>
                <th className="text-center py-3">
                  <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((item) => (
                <tr key={item}>
                  <td className="text-center">
                    <div className="placeholder-glow">
                      <span className="placeholder col-8"></span>
                    </div>
                  </td>
                  <td>
                    <div className="placeholder-glow">
                      <span className="placeholder col-8"></span>
                    </div>
                  </td>
                  <td>
                    <div className="placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="placeholder-glow">
                      <span className="placeholder col-4"></span>
                    </div>
                  </td>
                  <td>
                    <div className="placeholder-glow">
                      <span className="placeholder col-10"></span>
                    </div>
                  </td>
                  <td className="text-center">
                    <Badge className="placeholder col-8"></Badge>
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      <Button variant="outline-warning" className="placeholder col-5" disabled></Button>
                      <Button variant="outline-danger" className="placeholder col-5" disabled></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminRoomsEsq;
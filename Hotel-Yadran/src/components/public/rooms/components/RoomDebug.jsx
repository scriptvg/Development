import React from 'react';
import { Card } from 'react-bootstrap';

const RoomDebug = ({ rooms }) => {
    return (
        <Card className="my-3">
            <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Debug Information</h5>
            </Card.Header>
            <Card.Body>
                <h6>Total Rooms: {rooms?.length || 0}</h6>
                <details>
                    <summary>View Room Data</summary>
                    <pre style={{ maxHeight: '200px', overflow: 'auto' }}>
                        {JSON.stringify(rooms, null, 2)}
                    </pre>
                </details>
            </Card.Body>
        </Card>
    );
};

export default RoomDebug;


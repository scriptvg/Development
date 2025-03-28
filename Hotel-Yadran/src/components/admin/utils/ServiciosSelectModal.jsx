<Form.Group controlId="formRoomSelectedServices" className="mt-4">
                        <Form.Label className="h5 mb-3 text-primary">Servicios Seleccionados</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                            {services.map(service => (
                                <BadgeComponent 
                                    key={service} 
                                    text={service} 
                                    variant="info" 
                                    icon={getServiceIcon(service)} 
                                />
                            ))}
                            {services.length === 0 && (
                                <p className="text-muted fst-italic">No hay servicios seleccionados</p>
                            )}
                        </div>
                    </Form.Group>
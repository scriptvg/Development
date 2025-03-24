<Form.Group controlId="formRoomSelectedServices" className="mt-4">
                        <Form.Label className="h5 mb-3 text-primary">Servicios Seleccionados</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                            {servicesList.map(service => (
                                <ServiceCheckChip
                                    key={service.value}
                                    service={service.value}
                                    label={service.label}
                                    icon={service.icon}
                                    isSelected={services.includes(service.value)}
                                    onClick={() => handleServiceToggle(service.value)}
                                    className="me-2 mb-2"
                                />
                            ))}
                            {services.length === 0 && (
                                <p className="text-muted fst-italic">No hay servicios seleccionados</p>
                            )}
                        </div>
                    </Form.Group>
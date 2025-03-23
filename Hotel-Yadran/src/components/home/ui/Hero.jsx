import React from 'react'
import { Card, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import heroimg from '../../../assets/img/475382133_1016713003818433_3614689992057952440_n.jpg'

import '../styles/card-img-home.css'

function Hero() {
    return (
        <div>
            <Card className="card-home-container">
                <Card className="home-img">
                    <Card.Img src={heroimg} alt="Hotel Background" />
                </Card>
                <Card className="home-img-text">
                    <Card.Body>
                        <Card.Title className="img-tittle">Bienvenido a Hotel Yadran</Card.Title>
                        <Card.Text className="img-text">
                            Disfrute de una experiencia única en nuestro hotel de lujo con vistas impresionantes y servicio excepcional.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='home-img-btn'>
                    <Card.Body>
                        <Button variant="primary" className='btn-reservar'>Reservar Ahora</Button>
                        <Button variant='secondary' className='btn-rooms'>Ver habitaciones</Button>
                    </Card.Body>
                </Card>
            </Card>
        </div>
    )
}

export default Hero
import React from 'react'
import { Button, Spinner } from "react-bootstrap"



function BtnLoginDB({ onClick, loading }) {
  return (
<>

            <Button 
            variant="primary" 
            className="w-100 mt-4" 
            onClick={onClick} 
            disabled={loading}>
            {loading ? (
                <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Cargando...</span>
                </>
            ) : "Iniciar Sesión"}
        </Button>

</>
  )
}

export default BtnLoginDB
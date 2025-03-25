import React, {useRef} from 'react'
import AirVentIcon from '../../components/test/WindIcon';

function TestPage() {

    const iconRef = useRef();

  const startAnimation = () => {
    iconRef.current?.startAnimation();
  };

  const stopAnimation = () => {
    iconRef.current?.stopAnimation();
  };

  return (
<>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Ejemplo de AirVentIcon</h1>
      <AirVentIcon ref={iconRef} size={50} className="text-blue-600" />
      <div className="mt-4 flex gap-2">
        <button
          onClick={startAnimation}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Iniciar Animación
        </button>
        <button
          onClick={stopAnimation}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Detener Animación
        </button>
      </div>
    </div>

</>
  )
}

export default TestPage

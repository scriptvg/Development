/**
 * Script para verificar si el servidor JSON está funcionando correctamente
 */
const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001';
const RUTA_SERVICIOS = `${API_URL}/services`;

async function verificarAPI() {
    console.log('Verificando conexión con el servidor JSON...');
    
    try {
        // Verificar que podemos obtener servicios
        const respuestaGet = await fetch(RUTA_SERVICIOS);
        
        if (!respuestaGet.ok) {
            throw new Error(`Error al obtener servicios: ${respuestaGet.status} ${respuestaGet.statusText}`);
        }
        
        const servicios = await respuestaGet.json();
        console.log(`✅ GET funcionando: Obtenidos ${servicios.length} servicios`);
        
        // Intentar crear un servicio temporal
        const servicioTemporal = {
            id: "srv-temp",
            valor: "test_api",
            etiqueta: "Servicio de prueba",
            descripcion: "Este servicio se creó para probar la API",
            variante: "warning",
            icono: "FaCheck",
            size: 18,
            precio: 0,
            habilitado: true
        };
        
        const respuestaPost = await fetch(RUTA_SERVICIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicioTemporal)
        });
        
        if (!respuestaPost.ok) {
            throw new Error(`Error al crear servicio: ${respuestaPost.status} ${respuestaPost.statusText}`);
        }
        
        console.log('✅ POST funcionando: Servicio de prueba creado');
        
        // Actualizar el servicio
        servicioTemporal.descripcion = "Servicio de prueba actualizado";
        
        const respuestaPut = await fetch(`${RUTA_SERVICIOS}/srv-temp`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicioTemporal)
        });
        
        if (!respuestaPut.ok) {
            throw new Error(`Error al actualizar servicio: ${respuestaPut.status} ${respuestaPut.statusText}`);
        }
        
        console.log('✅ PUT funcionando: Servicio de prueba actualizado');
        
        // Eliminar el servicio temporal
        const respuestaDelete = await fetch(`${RUTA_SERVICIOS}/srv-temp`, {
            method: 'DELETE'
        });
        
        if (!respuestaDelete.ok) {
            throw new Error(`Error al eliminar servicio: ${respuestaDelete.status} ${respuestaDelete.statusText}`);
        }
        
        console.log('✅ DELETE funcionando: Servicio de prueba eliminado');
        
        console.log('\n✅ Todas las operaciones CRUD funcionan correctamente');
        
    } catch (error) {
        console.error('❌ Error al verificar la API:', error.message);
        console.log('\nPosibles soluciones:');
        console.log('1. Asegúrate de que json-server está en ejecución:');
        console.log('   npx json-server --watch db.json --port 3001');
        console.log('2. Verifica que no haya errores en el archivo db.json');
        console.log('3. Intenta reiniciar el servidor json-server');
    }
}

verificarAPI();

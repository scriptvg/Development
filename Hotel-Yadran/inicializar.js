const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

// Datos iniciales para los servicios
const serviciosIniciales = [
    {
        "id": "srv-1",
        "valor": "wifi",
        "etiqueta": "WiFi Gratis",
        "descripcion": "Conexión WiFi de alta velocidad en todas las habitaciones y áreas comunes.",
        "variante": "primary",
        "icono": "FaWifi",
        "size": 18,
        "precio": 0,
        "habilitado": true
    },
    {
        "id": "srv-2",
        "valor": "aire_acondicionado",
        "etiqueta": "Aire Acondicionado",
        "descripcion": "Control individual de temperatura para su máximo confort.",
        "variante": "info",
        "icono": "FaSnowflake",
        "size": 18,
        "precio": 10,
        "habilitado": true
    },
    {
        "id": "srv-3",
        "valor": "tv",
        "etiqueta": "TV HD",
        "descripcion": "Televisor de alta definición con canales premium.",
        "variante": "secondary",
        "icono": "FaTv",
        "size": 18,
        "precio": 5,
        "habilitado": true
    },
    {
        "id": "srv-4",
        "valor": "vista_al_mar",
        "etiqueta": "Vista al Mar",
        "descripcion": "Impresionantes vistas al mar desde la habitación.",
        "variante": "info",
        "icono": "FaWater",
        "size": 18,
        "precio": 25,
        "habilitado": true
    },
    {
        "id": "srv-5",
        "valor": "bano_privado",
        "etiqueta": "Baño Privado",
        "descripcion": "Baño privado completamente equipado con artículos de tocador.",
        "variante": "primary",
        "icono": "FaBath",
        "size": 18,
        "precio": 0,
        "habilitado": true
    },
    {
        "id": "srv-6",
        "valor": "desayuno",
        "etiqueta": "Desayuno Incluido",
        "descripcion": "Desayuno bufé completo incluido en la tarifa.",
        "variante": "warning",
        "icono": "FaCoffee",
        "size": 18,
        "precio": 15,
        "habilitado": true
    },
    {
        "id": "srv-7",
        "valor": "piscina",
        "etiqueta": "Acceso a Piscina",
        "descripcion": "Acceso gratuito a la piscina principal del hotel.",
        "variante": "info",
        "icono": "FaSwimmingPool",
        "size": 18,
        "precio": 20,
        "habilitado": true
    },
    {
        "id": "srv-8",
        "valor": "balcon",
        "etiqueta": "Balcón Privado",
        "descripcion": "Espacioso balcón privado con mobiliario exterior.",
        "variante": "success",
        "icono": "FaHome",
        "size": 18,
        "precio": 15,
        "habilitado": true
    },
    {
        "id": "srv-9",
        "valor": "toallas",
        "etiqueta": "Toallas de Playa",
        "descripcion": "Toallas de playa disponibles sin cargo adicional.",
        "variante": "primary",
        "icono": "FaWind",
        "size": 18,
        "precio": 5,
        "habilitado": true
    },
    {
        "id": "srv-10",
        "valor": "minibar",
        "etiqueta": "Minibar",
        "descripcion": "Minibar surtido con bebidas y snacks (cargo adicional).",
        "variante": "danger",
        "icono": "FaWineGlass",
        "size": 18,
        "precio": 30,
        "habilitado": true
    },
    {
        "id": "srv-11",
        "valor": "estacionamiento",
        "etiqueta": "Estacionamiento",
        "descripcion": "Estacionamiento gratuito para huéspedes.",
        "variante": "dark",
        "icono": "FaCar",
        "size": 18,
        "precio": 10,
        "habilitado": true
    },
    {
        "id": "srv-12",
        "valor": "mascotas",
        "etiqueta": "Pet Friendly",
        "descripcion": "Habitación que admite mascotas (con restricciones).",
        "variante": "success",
        "icono": "FaPaw",
        "size": 18,
        "precio": 15,
        "habilitado": true
    },
    {
        "id": "srv-13",
        "valor": "bicicletas",
        "etiqueta": "Préstamo de Bicicletas",
        "descripcion": "Bicicletas disponibles para explorar los alrededores.",
        "variante": "warning",
        "icono": "FaBiking",
        "size": 18,
        "precio": 8,
        "habilitado": true
    }
];

// Inicializar la base de datos con los datos necesarios
const inicializarBaseDeDatos = () => {
    console.log('Inicializando la base de datos...');

    try {
        // Verificar si existe el archivo db.json
        if (!fs.existsSync(DB_PATH)) {
            console.log('Archivo db.json no encontrado. Creando nuevo archivo...');

            // Crear estructura básica de la base de datos
            const baseDeDatos = {
                Usuarios: [],
                rooms: [],
                reservations: [],
                surveys: [],
                services: serviciosIniciales,
                reviews: []
            };

            // Escribir el archivo
            fs.writeFileSync(DB_PATH, JSON.stringify(baseDeDatos, null, 2));
            console.log('Base de datos creada exitosamente.');
        } else {
            console.log('Archivo db.json encontrado. Verificando servicios...');

            // Leer el archivo existente
            const baseDeDatos = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

            // Verificar si existen servicios, si no, añadirlos
            if (!baseDeDatos.services || baseDeDatos.services.length === 0) {
                console.log('No se encontraron servicios. Añadiendo servicios predeterminados...');
                baseDeDatos.services = serviciosIniciales;

                // Guardar cambios
                fs.writeFileSync(DB_PATH, JSON.stringify(baseDeDatos, null, 2));
                console.log('Servicios añadidos correctamente.');
            } else {
                console.log(`Se encontraron ${baseDeDatos.services.length} servicios en la base de datos.`);
            }
        }

        console.log('Inicialización completada.');
        console.log('\nPara iniciar el servidor de la API, ejecute:');
        console.log('> npx json-server --watch db.json --port 3001');

    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};

// Ejecutar la inicialización
inicializarBaseDeDatos();

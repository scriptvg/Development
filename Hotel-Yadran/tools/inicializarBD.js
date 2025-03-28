const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

// Datos iniciales para la base de datos
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

const inicializarBD = () => {
    console.log('Iniciando inicialización de la base de datos...');

    try {
        // Comprobar si el archivo existe
        if (!fs.existsSync(DB_PATH)) {
            console.log('Archivo db.json no encontrado. Creando nuevo archivo...');
            const dbInicial = {
                Usuarios: [],
                rooms: [],
                reservations: [],
                surveys: [],
                services: serviciosIniciales,
                reviews: []
            };
            fs.writeFileSync(DB_PATH, JSON.stringify(dbInicial, null, 2));
            console.log('Base de datos inicializada correctamente con datos predeterminados.');
            return;
        }

        // Si el archivo existe, leer y actualizar
        const dbActual = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

        // Si no hay servicios, añadirlos
        if (!dbActual.services || dbActual.services.length === 0) {
            console.log('No se encontraron servicios en la base de datos. Añadiendo servicios predeterminados...');
            dbActual.services = serviciosIniciales;
        } else {
            console.log(`Ya existen ${dbActual.services.length} servicios en la base de datos.`);
        }

        // Guardar los cambios
        fs.writeFileSync(DB_PATH, JSON.stringify(dbActual, null, 2));
        console.log('Base de datos actualizada correctamente.');

    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};

// Ejecutar la inicialización
inicializarBD();

console.log('\nPara iniciar el servidor json, ejecuta:');
console.log('npx json-server --watch db.json --port 3001');

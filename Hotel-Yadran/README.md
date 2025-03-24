# Hotel Yadran - Sistema de Gestión Hotelera

## 📋 Descripción
Sistema web para la gestión del Hotel Yadran, desarrollado con React y Bootstrap. Permite la administración de habitaciones, reservas y servicios del hotel.

## 🚀 Características Principales
- Panel de administración protegido
- Gestión de habitaciones (CRUD)
- Sistema de autenticación
- Interfaz responsive
- Gestión de servicios por habitación

## 🛠️ Tecnologías Utilizadas
- React.js
- React Bootstrap
- React Router DOM
- SweetAlert2
- Lucide React
- React Icons

## 📁 Estructura del Proyecto
```
Hotel-Yadran/
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── components/      # Componentes reutilizables
│   │   ├── admin/      # Componentes del panel admin
│   │   ├── home/       # Componentes de la página principal
│   │   └── security/   # Componentes de seguridad
│   ├── config/         # Configuraciones
│   │   ├── context/    # Contextos de React
│   │   └── routes/     # Configuración de rutas
│   └── pages/          # Páginas principales
```

## 🔐 Convenciones de Código

### Nomenclatura
- Constantes: MAYUSCULAS_GUION (ej: BTN_GUARDAR)
- Variables: camelCase (ej: nombreUsuario)
- Componentes: PascalCase (ej: RoomModal)
- Archivos: PascalCase.jsx

### Ejemplos de Nomenclatura
```javascript
// Constantes
const BTN_GUARDAR = 'Guardar';
const RUTA_API = 'http://api.ejemplo.com';

// Variables
const nombreUsuario = 'Juan';
const listaHabitaciones = [];
```

## 🚦 Guía de Instalación
1. Clonar el repositorio
```bash
git clone [URL_REPOSITORIO]
```
2. Instalar dependencias
```bash
npm install
```
3. Ejecutar en desarrollo
```bash
npm run dev
```

## 📝 Configuración
El proyecto utiliza las siguientes configuraciones principales:

### ESLint
- Configurado para React
- Reglas personalizadas para control de código
- Integración con React Hooks

### Enrutamiento
- Sistema de rutas protegidas
- Gestión de roles (admin)
- Redirecciones automáticas

## 🔒 Seguridad
- Autenticación mediante contexto (useAuth)
- Rutas protegidas por roles
- Validación de formularios

## 🎨 Estilos
- Bootstrap para componentes base
- CSS personalizado para componentes específicos
- Sistema de diseño responsive

## 🛠️ Mantenimiento
Para mantener el código:
1. Seguir convenciones de nombrado
2. Documentar cambios importantes
3. Mantener la estructura de carpetas
4. Realizar pruebas antes de commits

## 👥 Roles y Permisos
- Admin: Acceso total al sistema
- Usuario: Acceso a áreas públicas
- Visitante: Solo visualización

## 🔄 Flujo de Trabajo
1. Desarrollo en ramas feature/
2. Pull requests para revisión
3. Merge a main tras aprobación
4. Deploy automático

## 📫 Contacto
[Información de contacto del equipo/desarrollador]

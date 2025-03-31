// Exportación de todas las páginas

// Páginas públicas
export { default as HomePage } from './public/HomePage';
export { default as RoomsPage } from './public/RoomsPage';
export { default as RoomDetailPage } from './public/RoomDetailPage';
export { default as ContactPage } from './public/ContactPage';

// Páginas de autenticación
export { default as LoginPage } from './auth/LoginPage';
export { default as RegisterPage } from './auth/RegisterPage';
export { default as ForgotPasswordPage } from './auth/ForgotPasswordPage';

// Páginas de administración
export { default as DashboardPage } from './admin/DashboardPage';
export { default as BookingsPage } from './admin/BookingsPage';
export { default as RoomsManagementPage } from './admin/RoomsManagementPage';
export { default as UsersPage } from './admin/UsersPage';
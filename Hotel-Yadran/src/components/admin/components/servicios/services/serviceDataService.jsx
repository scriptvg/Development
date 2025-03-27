import servicesCalls from '../../../../../config/services/servicesCalls';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// Funciones de utilidad
const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Servicios");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(dataBlob, `servicios_${new Date().toISOString()}.xlsx`);
};

const formatServiceData = (serviceData) => {
    if (!serviceData) return {};

    // Create a base formatted service object
    const formattedService = {
        id: serviceData.id || '',
        nombre: serviceData.nombre || serviceData.name || 'Sin nombre',
        descripcion: serviceData.descripcion || serviceData.description || 'Sin descripción',
        hasPrice: serviceData.hasPrice || false,
        precio: serviceData.hasPrice ? parseFloat(serviceData.precio || serviceData.price || 0) : null,
        icon: serviceData.icon || 'coffee',
        imagen: serviceData.imagen || serviceData.image || ''
    };

    return formattedService;
};

const filterServices = (services, filters) => {
    return services.filter(service => {
        const matchesSearch = !filters.searchTerm ||
            service.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            service.descripcion.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesHasPrice = filters.showPriced === undefined ||
            (filters.showPriced === true && service.hasPrice) ||
            (filters.showPriced === false && !service.hasPrice);

        return matchesSearch && matchesHasPrice;
    });
};

// Funciones principales del servicio
const getAllServices = async (successCallback, errorCallback) => {
    try {
        const data = await servicesCalls.GetServices();

        if (typeof successCallback === 'function') {
            const serviciosFormateados = Array.isArray(data) ? data.map(formatServiceData) : [];
            successCallback(serviciosFormateados);
        }
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        } else {
            Swal.fire('Error', 'No se pudieron cargar los servicios', 'error');
        }
    }
};

const saveService = async (datosServicio) => {
    try {
        const serviceToSave = formatServiceData(datosServicio);
        if (!serviceToSave.id) {
            serviceToSave.id = `SER-${Date.now().toString(36).toUpperCase()}`;
            return await servicesCalls.AddService(serviceToSave);
        } else {
            return await servicesCalls.UpdateService(serviceToSave);
        }
    } catch (error) {
        console.error('Error al guardar servicio:', error);
        throw error;
    }
};

const deleteService = async (id) => {
    try {
        await servicesCalls.DeleteService(id);
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        throw error;
    }
};

const serviceService = {
    formatServiceData,
    getAllServices,
    filterServices,
    saveService,
    deleteService,
    exportToExcel
};

// Para uso con import ... from
export default serviceService;

// Para uso con import { ... }
export {
    formatServiceData,
    getAllServices,
    filterServices,
    saveService,
    deleteService,
    exportToExcel
};
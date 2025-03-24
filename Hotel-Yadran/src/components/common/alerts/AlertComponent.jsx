import Swal from 'sweetalert2';

export const AlertComponent = (icon, title, text, config = {}) => {
  return Swal.mixin({
    icon,
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    ...config
  }).fire();
};

export const ConfirmAlert = (title, text, confirmText) => {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar'
  });
};
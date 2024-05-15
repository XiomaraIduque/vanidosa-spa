import Swal from 'sweetalert2';

const cancelacionEditar = (_id) => {
  Swal.fire({
    title: '¿Quieres cancelar la edición?',
    text: 'Estás seguro que quieres cancelar la edición',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#212F3D',
    cancelButtonColor: '#D46146',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirige hacia atrás en la historia del navegador en lugar de cargar una nueva página
      window.history.back();
    }
  });
};

export default cancelacionEditar;

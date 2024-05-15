import Swal from 'sweetalert2';

const cancelarEdicion = (_id) => {
  Swal.fire({
    title: 'Quieres cancelar la edición?',
    text: "Estas seguro que quieres cancelar la edición",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#212F3D',
    cancelButtonColor: '#D46146',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      window.history.back();
    }
  });
};

export default cancelarEdicion;
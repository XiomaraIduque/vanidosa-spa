import Swal from 'sweetalert2';

const usuarioModificar = (_id) => {
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
      // Aquí puedes agregar el código para realizar la acción de edición
      window.location.href ='/listarUsuario';
      //   Swal.fire(
      //     'Edited!',
      //     'Your data has been modified.',
      //     'success'
      //   )
    }
  });
};

export default usuarioModificar;

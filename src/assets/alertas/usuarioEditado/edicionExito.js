import Swal from 'sweetalert2';

const usuarioClientes = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario modificado con exito!',
            showConfirmButton: false,
            timer: 1500,
            confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.href = '/';
        })
    );
}

export default usuarioClientes;

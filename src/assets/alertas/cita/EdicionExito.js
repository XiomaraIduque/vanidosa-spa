import Swal from 'sweetalert2';

const EdicionExito = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cita modificada con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default EdicionExito;
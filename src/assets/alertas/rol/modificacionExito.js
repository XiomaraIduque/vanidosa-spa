import Swal from 'sweetalert2';

const modificacionExito = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rol modificado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default modificacionExito;
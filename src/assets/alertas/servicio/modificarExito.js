import Swal from 'sweetalert2';

const modificarExito = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Servicio modificado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default modificarExito;

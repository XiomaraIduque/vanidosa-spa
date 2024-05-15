import Swal from 'sweetalert2';

const alertaModiCoreacta = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Insumo modificado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default alertaModiCoreacta;

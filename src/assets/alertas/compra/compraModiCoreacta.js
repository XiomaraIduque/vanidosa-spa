import Swal from 'sweetalert2';

const compraModiCoreacta = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra modificado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default compraModiCoreacta;

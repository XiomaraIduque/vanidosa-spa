import Swal from 'sweetalert2';

const proveedorModiCoreacta = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proveedor modificado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default proveedorModiCoreacta;

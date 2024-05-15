import Swal from 'sweetalert2';

const usuarioModiCoreacta = () => {
    
    return (
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario modificado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.history.back();
        })
    );
}

export default usuarioModiCoreacta;

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useAlertasProveedor = () => {
    const navigate = useNavigate();
    const mostrarAlerta = () => { 
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proveedor registrado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/listarProveedor');
        })
    };
    return mostrarAlerta;
}

export default useAlertasProveedor;

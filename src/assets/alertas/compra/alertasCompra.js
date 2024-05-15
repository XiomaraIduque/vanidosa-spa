import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useAlertasCompra = () => {
    
    const navigate = useNavigate();
    const mostrarAlerta = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra registrada con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/listarCompra');
        })
    };
    return mostrarAlerta;
};

export default useAlertasCompra;

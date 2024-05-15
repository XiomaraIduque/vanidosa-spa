import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useAlertasInsumos = () => {
    const navigate = useNavigate();

    const mostrarAlerta = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Insumo registrado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/listarInsumos');
        });
    };

    return mostrarAlerta;
}

export default useAlertasInsumos;

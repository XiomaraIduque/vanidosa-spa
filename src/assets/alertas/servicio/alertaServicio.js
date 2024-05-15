import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useAlertasServicio = () => {
    
    const navigate = useNavigate();

    const mostrarAlerta = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Servicio registrado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/listarServicio');
        })
    };
    return mostrarAlerta
}

export default useAlertasServicio;

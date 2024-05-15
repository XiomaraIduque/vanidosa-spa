import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useRegistrada = () => {
    const navigate = useNavigate();
    const mostrarAlerta = () => { 
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cita registrada con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/Citas');
        })
    };
    return mostrarAlerta;
}

export default useRegistrada;

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useRegistroExito = () => {
    const navigate = useNavigate();

    const mostrarAlerta = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rol registrado con exito!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/listaRol');
        });
    };
    return mostrarAlerta;
};

export default useRegistroExito;

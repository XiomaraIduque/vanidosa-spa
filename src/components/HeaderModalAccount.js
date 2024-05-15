import dashboard from '../assets/img/dashboard.svg';
import React, { useState, useEffect } from 'react';
import settings from '../assets/img/settings.svg';
import cita from '../assets/img/citas_modal.svg';
import '../assets/css/header-modal-account.css';
import perfil from '../assets/img/perfil.png';
import logout from '../assets/img/logout.svg';
import { Link } from 'react-router-dom';
import android from "../assets/img/android.svg";
import Swal from 'sweetalert2';
import ApkVanidosa from "../vanidosa/vanidosa.apk"

const HeaderModalAccount = ({ mostrarModal, cerrarModal }) => {
  const usuarioId = localStorage.getItem('_id') || null;
  const [, setUsuarioInicial] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  // Agregado: Declaración de estado para el apellido
  const [rol] = useState(localStorage.getItem('Rol') || null);
  const isAdminOrEmployee = rol && (rol === 'Empleado' || rol === 'Administrador');
  const isClienteOrEmployee = rol && (rol === 'Cliente');

  const usuarioHaIniciadoSesion = !!usuarioId;
  useEffect(() => {
    const url = 'https://api-proyecto-5hms.onrender.com/api/usuario'; // Reemplaza 'URL_AQUI' con la URL correcta
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        let filteredUsuario = authors.find((usuario) => usuario._id === usuarioId);
        if (filteredUsuario) {
          setUsuarioInicial(filteredUsuario);
          setNombre(filteredUsuario.Nombre);
          setCorreo(filteredUsuario.Correo); // Corregido: Usar el campo 'Correo' en lugar de 'Apellido'

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [usuarioId]);


  const cerrarSesion = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('Rol');
    localStorage.removeItem('Documento');
    // Limpiar los estados de nombre y correo al cerrar sesión
    setNombre('');
    setCorreo('');
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada con éxito',
      showConfirmButton: false,
      timer: 1500 // Oculta la alerta después de 1.5 segundos
    });
    // Otros pasos de cierre de sesión, si es necesario
  };

  return mostrarModal ? (
    <div className="container-modal-account">
      <div className="content-modal-account">

        <div className="container-user-info">
          <img className="image-modal-account" src={perfil} alt="" />
          <span className="name-modal">{nombre}</span>
          <span className="email-modal">{correo}</span>
        </div>

        <div className="container-item-modal-account">
          <div className="content-item-modal-account">
            <img className="modal-account-icon" src={settings} alt="" />
            <Link className="modal-account-link" to="/EditAccount">Configurar mi cuenta</Link>
          </div>
          {isClienteOrEmployee && (
            <div className="content-item-modal-account">
              <img className="modal-account-icon" src={cita} alt="" />
              <Link className="modal-account-link" to="/Citas">Mis Citas</Link>
            </div>
          )}
          {isAdminOrEmployee && (
            <div className="content-item-modal-account">
              <img className="modal-account-icon" src={dashboard} alt="" />
              <Link className="modal-account-link" to="/DashHome">Panel administrativo</Link>
            </div>
          )}
        </div>

        <div className="container-item-modal-account">
          <div className="content-item-modal-account">
            <img className="modal-account-icon" src={logout} alt="" />
            {usuarioHaIniciadoSesion ? (
              <a className="modal-account-link" href="/" onClick={cerrarSesion}>Cerrar sesión</a>
            ) : (
              <Link className="modal-account-link" to="/login">Iniciar sesión</Link>
            )}
          </div>
        </div>

        <div className="container-item-modal-account">
          <div className="content-item-modal-account">
            <a className="modal-account-link" href={ApkVanidosa} download="vanidosa.apk">
              Descarga nuestra App
              <img className="modal-account-icon-apk" src={android} alt="Descargar APK" />
            </a>
          </div>
        </div>

        <div className="container-item-modal-account">
          <button className="close-button" onClick={cerrarModal}>Salir</button>
        </div>

      </div>
    </div>
  ) : null;
};

export default HeaderModalAccount;

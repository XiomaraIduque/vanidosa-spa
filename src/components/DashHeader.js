import menuIcon from "../assets/img/bars-staggered.svg";
import settingsIcon from "../assets/img/settings.svg";
import React, { useState, useEffect } from "react";
import logoutIcon from "../assets/img/logout.svg";
import '../assets/css/header-modal-account.css';
import perfil from "../assets/img/perfil-2.png";
import spaIcon from "../assets/img/spa.svg";
import logo from "../assets/img/logo.svg";
import "../assets/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../assets/css/dash-header.css";
import Swal from "sweetalert2";


const Modal = ({ mostrarModal, cerrarModal }) => {
  const usuarioId = localStorage.getItem("_id") || null;
  const [, setUsuarioInicial] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/usuario"; // Reemplaza 'URL_AQUI' con la URL correcta
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        let filteredUsuario = authors.find(
          (usuario) => usuario._id === usuarioId
        );
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
            <img className="modal-account-icon" src={settingsIcon} alt="" />
            <Link className="modal-account-link" to="/EditAccount">Configurar cuenta</Link>
          </div>
          <div className="content-item-modal-account">
            <img className="modal-account-icon" src={spaIcon} alt="" />
            <Link className="modal-account-link" to="/">
              Página principal
            </Link>
          </div>
        </div>

        <div className="container-item-modal-account">
          <div className="content-item-modal-account">
            <img className="modal-account-icon" src={logoutIcon} alt="" />
            <a className="modal-account-link" href="/" onClick={cerrarSesion}>
              Cerrar sesión
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

function DashHeader() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    const menu = document.getElementById("toggleMenu");
    menu.classList.toggle("menuActive");
  };

  return (

    <header className="header">

      <img className="bars-icon" src={menuIcon} alt="" onClick={toggleMenu} />

      <Link to="/DashHome">
        <img className="logo-header" src={logo} alt="logo" />
      </Link>

      <img className="img-account" src={perfil} alt="" onClick={openModal} />

      <Modal mostrarModal={showModal} cerrarModal={closeModal} />

    </header>

  );
}

export default DashHeader;

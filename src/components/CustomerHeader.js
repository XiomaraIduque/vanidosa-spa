import menuIconCustomer from "../assets/img/bars-staggered.svg";
import HeaderModalAccount from "./HeaderModalAccount";
import { Link, NavLink } from "react-router-dom";
import perfil from "../assets/img/perfil.png";
import logo from "../assets/img/logo.svg";
import "../assets/css/customer-header.css"
import React, { useState } from "react";
function CustomerHeader({ isLoggedIn, user, rol }) {


  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const toggleMenu = () => {
    const menu = document.getElementById("toggleMenu");
    menu.classList.toggle("menuActiveCustomer");
  };

  return (
    <header className="header-customer">

      <img className="bars-icon-customer" src={menuIconCustomer} alt="" onClick={toggleMenu} />

      <Link to="/" className="container-logo-header-customer">
        <img className="logo-header-customer" src={logo} alt="logo" />
      </Link>

      <div className="container-nav-customer menuActiveCustomer" id="toggleMenu">

        <nav className="nav-customer">

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link-customer selected"
                : isActive
                  ? "nav-link-customer selected"
                  : "nav-link-customer"
            }
            to="/"
          >
            INICIO
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link-customer selected"
                : isActive
                  ? "nav-link-customer selected"
                  : "nav-link-customer"
            }
            to="/catalogo"
          >
            CATÁLOGO
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link-customer selected"
                : isActive
                  ? "nav-link-customer selected"
                  : "nav-link-customer"
            }
            to="/Agendar"
          >
            AGENDAR
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link-customer selected"
                : isActive
                  ? "nav-link-customer selected"
                  : "nav-link-customer"
            }
            to="/nosotros"
          >
            NOSOTROS
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link-customer selected"
                : isActive
                  ? "nav-link-customer selected"
                  : "nav-link-customer"
            }
            to="/contacto"
          >
            CONTACTO
          </NavLink>

        </nav>

      </div>

      <Link className="container-img-account-customer" to="#" onClick={abrirModal}>
        <img className="img-account-customer" src={perfil} alt="" style={{ width: "44px" }} />
      </Link>

      <HeaderModalAccount mostrarModal={mostrarModal} cerrarModal={cerrarModal} isLoggedIn={isLoggedIn} user={user} rol={rol} />

    </header>
  );
}

export default CustomerHeader;

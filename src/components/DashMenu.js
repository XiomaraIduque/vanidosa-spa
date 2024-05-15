import proveedores from "../assets/img/proveedores.svg";
import servicio from "../assets/img/servicios.svg";
import usuarios from "../assets/img/usuarios.svg";
import { Link, NavLink } from "react-router-dom";
import compras from "../assets/img/compras.svg";
import insumos from "../assets/img/insumos.svg";
import logo from "../assets/img/logo-menu.svg";
import inicio from "../assets/img/inicio.svg";
import roles from "../assets/img/roles.svg";
import cita from "../assets/img/citas.svg";
import React, { useState } from "react";
import "../assets/css/dash-menu.css";

export default function DashMenu() {
  const [rol] = useState(localStorage.getItem('Rol') || null);
  const isAdminOrEmployee = rol && (rol === 'Administrador');

  return (

    <div className="container-menu menuActive" id="toggleMenu">

      <div className="content-logo">
        <Link to="/DashHome">
          <img className="logo-menu" src={logo} alt="logo" />
        </Link>
      </div>
      
      <div className="menu">
        <NavLink
          className="content-link-menu d-flex align-items-center"
          to="/DashHome"
        >
          <div className="content-icon-menu d-flex justify-content-center">
            <img className="icon-menu" src={inicio} alt="" />
          </div>
          <span className="text-menu">Inicio</span>
        </NavLink>
        {isAdminOrEmployee && (<>
          <NavLink
            className="content-link-menu d-flex align-items-center"
            to="/listaRol"
          >
            <div className="content-icon-menu d-flex justify-content-center ">
              <img className="icon-menu" src={roles} alt="" />
            </div>
            <span className="text-menu">Roles</span>
          </NavLink>

          <NavLink
            className="content-link-menu d-flex align-items-center"
            to="/listarUsuario"
          >
            <div className="content-icon-menu d-flex justify-content-center">
              <img className="icon-menu" src={usuarios} alt="" />
            </div>
            <span className="text-menu">Usuarios</span>
          </NavLink>
        </>)}
        <NavLink
          className="content-link-menu d-flex align-items-center"
          to="/listarInsumos"
        >
          <div className="content-icon-menu d-flex justify-content-center">
            <img className="icon-menu" src={insumos} alt="" />
          </div>
          <span className="text-menu">Insumos</span>
        </NavLink>

        <NavLink
          className="content-link-menu d-flex align-items-center"
          to="/listarProveedor"
        >
          <div className="content-icon-menu d-flex justify-content-center">
            <img className="icon-menu" src={proveedores} alt="" />
          </div>
          <span className="text-menu">Proveedores</span>
        </NavLink>

        <NavLink
          className="content-link-menu d-flex align-items-center"
          to="/listarCompra"
        >
          <div className="content-icon-menu d-flex justify-content-center">
            <img className="icon-menu" src={compras} alt="" />
          </div>
          <span className="text-menu">Compras</span>
        </NavLink>

        <NavLink
          className="content-link-menu d-flex align-items-center"
          to="/listarServicio"
        >
          <div className="content-icon-menu d-flex justify-content-center">
            <img className="icon-menu" src={servicio} alt="" />
          </div>
          <span className="text-menu">Servicios</span>
        </NavLink>

        <NavLink
          className="content-link-menu d-flex align-items-center"
          to="/listaCita"
        >
          <div className="content-icon-menu d-flex justify-content-center">
            <img className="icon-menu" src={cita} alt="" />
          </div>
          <span className="text-menu">Citas</span>
        </NavLink>
      </div>
    </div>
  );
}

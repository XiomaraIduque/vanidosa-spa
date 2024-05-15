
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerHome from "./customer/CustomerHome";
import AgendarCitas from "./customer/CustomerAgendar";
import DashHome from "./dashboard/DashHome";
import Catalogo from "./customer/CustomerCatalogo";
import Contacto from "./customer/CustomerContacto";
import Nosotros from "./customer/CustomerNosotros";
import React, { useState, useEffect } from "react";
import Login from "./customer/Login";

//Rutas a porteger
import ModificarProveedor from "./dashboard/ModificarProveedor";
import ModificarServicio from "./dashboard/ModificarServicio";
import ModificarInsumo from "./dashboard/ModificarInsumo";
import ModificarCompra from "./dashboard/ModificarCompra";
import ListarProveedor from "./dashboard/ListarProveedor";
import ModificarUsu from "./dashboard/ModificarUsuario";
import ListarServicio from "./dashboard/ListarServicio";
import CrearProveedor from "./dashboard/CrearProveedor";
import CrearServicio from "./dashboard/CrearServicio";
import ListarCompra from "./dashboard/ListarCompra";
import ListarUsuario from "./dashboard/ListarUsuario";
import ListarInsumo from "./dashboard/ListarInsumo";
import CrearInsumo from "./dashboard/CrearInsumo";
import CrearCompra from "./dashboard/CrearCompra";
import EditAccount from "./customer/EditAccount";
import ListarCita from "./dashboard/ListarCita";
import CrearUsu from "./dashboard/CrearUsuario";
import CrearCita from "./dashboard/CrearCita";
import Recuperar from "./customer/Recuperar";
import ListaRol from "./dashboard/ListarRol";
import Registrar from "./customer/Registar";
import Citas from "./customer/Citas";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  //const isAdminOrEmployee = true;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [rol, setRol] = useState(localStorage.getItem('Rol') || null);
  const [, setUser_id] = useState(localStorage.getItem('_id') || null);
  const [, setDocumento] = useState(localStorage.getItem('Documento') || null);

  
  useEffect(() => {
    setIsLoggedIn(!!token);
    if (token) {
      setShouldRedirect(true);
    }
  }, [token]);
  
  const isAdminOrEmployee = rol === 'Empleado' || rol === 'Administrador';


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/Recuperar" element={<Recuperar />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Registar" element={<Registrar />} />
          <Route
            path="/EditAccount"
            element={
              isLoggedIn ? <EditAccount /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Citas"
            element={isLoggedIn ? <Citas /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              shouldRedirect && isLoggedIn ? (
                isAdminOrEmployee ? (
                  <Navigate to="/DashHome" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setToken={setToken}
                  setRol={setRol}
                  setUser_id={setUser_id}
                  setDocumento={setDocumento}
                />
              )
            }
          />
          <Route
            path="/DashHome"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <DashHome />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/Agendar"
            element={isLoggedIn ? <AgendarCitas /> : <Navigate to="/login" />}
          />
          {/* Estas son las rutas de los crear */}
          <Route
            path="/crearusuario"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <CrearUsu />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* <Route path="/crearRol" element={isLoggedIn && isAdminOrEmployee ? <CrearRol /> : <Navigate to="/login" />} /> */}
          <Route
            path="/insumos"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <CrearInsumo />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/proveedores"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <CrearProveedor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/compras"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <CrearCompra />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/servicios"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <CrearServicio />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/crearCita"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <CrearCita />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Estan son las rutas de los listar */}
          <Route
            path="/listarUsuario"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListarUsuario />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listaRol"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListaRol />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listarInsumos"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListarInsumo />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listarProveedor"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListarProveedor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listarCompra"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListarCompra />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listarServicio"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListarServicio />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listaCita"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ListarCita />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Estas son las rutas de los modificar */}
          <Route
            path="/modificarUsuario"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ModificarUsu />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* <Route path="/modificarRol" element={isLoggedIn && isAdminOrEmployee ? <ModificarRol /> : <Navigate to="/login" />} /> */}
          <Route
            path="/modificarinsumo"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ModificarInsumo />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/modificarProveedores"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ModificarProveedor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/compra"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ModificarCompra />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/modificarServicio"
            element={
              isLoggedIn && isAdminOrEmployee ? (
                <ModificarServicio />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

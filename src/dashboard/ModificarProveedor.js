import proveedorModiCoreacta from "../assets/alertas/proveedor/proveedorModiCoreacta";
import proveedorModificar from "../assets/alertas/proveedor/proveedorModificar";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function ModificarProveedor() {
  const urlParams = new URLSearchParams(window.location.search);
  const proveedorId = urlParams.get("id");

  const [proveedorInicial, setProveedorInicial] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nit, setNit] = useState("");

  const url = "https://api-proyecto-5hms.onrender.com/api/proveedor";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !nombre ||
      !apellido ||
      !correo ||
      !ciudad ||
      !direccion ||
      !telefono ||
      !nit
    ) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario todos los campos son obligatorios!",
        confirmButtonColor: " #212F3D",
      });
      return;
    }

    const proveedor = {
      _id: proveedorId,
      Nombre: nombre,
      Apellido: apellido,
      Correo: correo,
      Ciudad: ciudad,
      Direccion: direccion,
      Telefono: telefono,
      Nit: nit,
    };

    fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proveedor),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hacer algo con la respuesta del servidor
        console.log(data);
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/proveedor";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.proveedor;
        // Filtrar los insumos basados en el ID
        let filteredProveedor = authors.filter(
          (proveedor) => proveedor._id === proveedorId
        );
        setProveedorInicial(filteredProveedor[0]);
        setNombre(filteredProveedor[0].Nombre);
        setApellido(filteredProveedor[0].Apellido);
        setCorreo(filteredProveedor[0].Correo);
        setCiudad(filteredProveedor[0].Ciudad);
        setDireccion(filteredProveedor[0].Direccion);
        setTelefono(filteredProveedor[0].Telefono);
        setTelefono(filteredProveedor[0].Telefono);
        setNit(filteredProveedor[0].Nit);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p class="main-title">MODIFICAR PROVEEDOR</p>
              <form className="main-view" onSubmit={handleSubmit}>
                {proveedorInicial && (
                  <div className="container-fields">


                    <div className="content-label-input">
                      <label htmlFor="nit">Nit / Documento</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="nit"
                        value={nit || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(/\D/g, "");
                          setNit(numbersOnly);
                        }}
                        disabled
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="nombre">Nombre / Razón social</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="nombre"
                        value={nombre || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setNombre(numbersOnly);
                        }}
                        disabled
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="apellido">Apellido</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="apellido"
                        value={apellido || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setApellido(numbersOnly);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="correo">Correo</label>
                      <input
                        className="general-input form-control"
                        type="email"
                        id="correo"
                        value={correo || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const onlyEmails = inputValue.replace(
                            /[^A-Za-z0-9@._-]/g,
                            ""
                          );
                          setCorreo(onlyEmails);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="ciudad">Ciudad</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="ciudad"
                        value={ciudad || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setCiudad(numbersOnly);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="direccion">Dirección</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="direccion"
                        value={direccion || ""}
                        onChange={(event) => setDireccion(event.target.value)}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="telefono">Teléfono</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="telefono"
                        value={telefono || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(/\D/g, "");
                          setTelefono(numbersOnly);
                        }}
                      />
                    </div>

                  </div>
                )}

                <div class="container-button">
                  <div className="content-button">
                    <input
                      className="general-button cancel-button"
                      type="reset"
                      onClick={proveedorModificar}
                      value="Cancelar"
                    />
                    <input
                      id="btnRegistrar"
                      type="submit"
                      className="general-button submit-button"
                      onClick={proveedorModiCoreacta}
                      value="Modificar"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <script src="../assets/js/funcionesClientes.js"></script>
      <script src="../assets/js/ValidarUsuarios.js"></script>
    </div>
  );
}

export default ModificarProveedor;

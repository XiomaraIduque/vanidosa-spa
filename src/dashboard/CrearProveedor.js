import alertasProveedor from "../assets/alertas/proveedor/alertasProveedor";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function CrearProveedor() {
  const [Proveedor, setProveedor] = useState([]);
  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/proveedor";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.proveedor;
        setProveedor(authors); // Actualiza el estado con los usuarios obtenidos
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [nombre, setNombre] = useState("");
  const [nombreValido, setNombreValido] = useState(true);

  const [apellido, setApellido] = useState("");
  const [apellidoValido, setApellidoValido] = useState(true);

  const [correo, setCorreo] = useState("");
  const [correoValido, setCorreoValido] = useState(true);

  const [ciudad, setCiudad] = useState("");
  const [ciudadValido, setCiudadValido] = useState(true);

  const [direccion, setDireccion] = useState("");
  const [direccionValido, setDireccionValido] = useState(true);

  const [telefono, setTelefono] = useState("");
  const [telefonoValido, setTelefonoValido] = useState(true);

  const [nit, setNit] = useState("");
  const [nitValido, setNitValido] = useState(true);

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
        title: "Campo vacío...",
        text: "Querido usuario, todos los campos son obligatorios.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    // Verificar si el proveedor ya está registrado
    const proveedorExistente = Proveedor.find((proveedor) => {
      return (
        proveedor.Nombre.toLowerCase() === nombre.toLowerCase() &&
        proveedor.Apellido.toLowerCase() === apellido.toLowerCase() &&
        proveedor.Correo.toLowerCase() === correo.toLowerCase() &&
        proveedor.Direccion.toLowerCase() === direccion.toLowerCase() &&
        proveedor.Telefono === parseInt(telefono) &&
        proveedor.Nit === parseInt(nit)
      );
    });

    if (proveedorExistente) {
      Swal.fire({
        icon: "warning",
        title: "Proveedor ya registrado",
        text: "El proveedor que intentas agregar ya está registrado.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    const proveedor = {
      Nombre: nombre,
      Apellido: apellido,
      Correo: correo,
      Ciudad: ciudad,
      Direccion: direccion,
      Telefono: telefono,
      Nit: nit,
    };

    fetch(url, {
      method: "POST",
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

  const resetFields = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setCiudad("");
    setDireccion("");
    setTelefono("");
    setNit("");
  };

  const handleClear = () => {
    resetFields();
  };

  const navigate = useNavigate();
  const mostrarAlerta = alertasProveedor();

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p className="main-title">REGISTRAR PROVEEDOR</p>
              <form className="main-view" onSubmit={handleSubmit}>
                <div className="container-fields">
                  <div className="content-label-input">
                    <label htmlFor="nit">Nit / Documento</label>
                    <input
                      className={`general-input form-control ${nitValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="nit"
                      value={nit || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const numbersOnly = inputValue.replace(/\D/g, "");
                        setNit(numbersOnly.trim() === "" ? null : numbersOnly);
                        setNitValido(numbersOnly.trim() !== "");
                      }}
                    />
                    {!nitValido && (
                      <p className="error-message">El nit es obligatorio*</p>
                    )}
                  </div>
                  <div className="content-label-input">
                    <label htmlFor="nombre">Nombre/Razón social</label>
                    <input
                      className={`general-input form-control ${nombreValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="nombre"
                      value={nombre || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const onlyLetters = inputValue.replace(
                          /[^A-Za-zñÑ\s]/g,
                          ""
                        );
                        setNombre(onlyLetters.trim() === "" ? null : onlyLetters);
                        setNombreValido(onlyLetters.trim() !== "");
                      }}
                    />
                    {!nombreValido && (
                      <p className="error-message">El nombre es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                      className={`general-input form-control ${apellidoValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="apellido"
                      value={apellido || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const onlyLetters = inputValue.replace(
                          /[^A-Za-zñÑ\s]/g,
                          ""
                        );
                        setApellido(onlyLetters.trim() === "" ? null : onlyLetters);
                        setApellidoValido(onlyLetters.trim() !== "");
                      }}
                    />
                    {!apellidoValido && (
                      <p className="error-message">El apellido es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      className={`general-input form-control ${telefonoValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="telefono"
                      value={telefono || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const numbersOnly = inputValue.replace(/\D/g, "");
                        setTelefono(numbersOnly.trim() === "" ? null : numbersOnly);
                        setTelefonoValido(numbersOnly.trim() !== "");
                      }}
                    />
                    {!telefonoValido && (
                      <p className="error-message">El telefono es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="correo">Correo</label>
                    <input
                      className={`general-input form-control ${correoValido ? "" : "campo_invalido"}`}
                      type="email"
                      id="correo"
                      value={correo || ""}
                      onChange={(event) => {
                        setCorreo(event.target.value)
                        setCorreoValido(event.target.value.trim() !== "")
                      }}
                    />
                    {!correoValido && (
                      <p className="error-message">El correo es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                      className={`general-input form-control ${ciudadValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="ciudad"
                      value={ciudad || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const numbersOnly = inputValue.replace(
                          /[^A-Za-zñÑ\s]/g,
                          ""
                        );
                        setCiudad(numbersOnly.trim() === "" ? null : numbersOnly);
                        setCiudadValido(numbersOnly.trim() !== "");
                      }}
                    />
                    {!ciudadValido && (
                      <p className="error-message">La ciudad es obligatoria*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                      className={`general-input form-control ${direccionValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="direccion"
                      value={direccion || ""}
                      onChange={(event) => {
                        setDireccion(event.target.value)
                        setDireccionValido(event.target.value.trim() !== "")
                      }}
                    />
                    {!direccionValido && (
                      <p className="error-message">La dirección es obligatoria*</p>
                    )}
                  </div>
                </div>

                <div class="container-button">
                  <div className="content-button">
                    <input
                      type="submit"
                      className="general-button cancel-button"
                      value="Cancelar"
                      onClick={() => {
                        navigate("/listarProveedor");
                      }}
                    />
                    <input
                      className="general-button clean-button"
                      type="reset"
                      value="Limpiar"
                      onClick={handleClear}
                    />
                    <input
                      id="btnRegistrar"
                      type="submit"
                      className="general-button submit-button"
                      onClick={mostrarAlerta}
                      value="Registrar"
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

export default CrearProveedor;

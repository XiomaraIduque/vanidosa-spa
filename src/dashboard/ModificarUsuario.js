import usuarioModiCoreacta from "../assets/alertas/usuario/usuarioModiCoreacta";
import usuarioModificar from "../assets/alertas/usuario/usuarioModificar";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function ModificarUsu() {
  const urlParams = new URLSearchParams(window.location.search);
  const usuarioId = urlParams.get("id");

  const [usuarioInicial, setUsuarioInicial] = useState(null);
  const [rol, setRol] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const url = "https://api-proyecto-5hms.onrender.com/api/usuario";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !nombre ||
      !apellido ||
      !tipoDocumento ||
      !documento ||
      !direccion ||
      !telefono ||
      !correo ||
      !contrasena
    ) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario, todos los campos son obligatorios!",
        confirmButtonColor: "#212F3D",
      });
      return;
    } else if (contrasena !== confirmarContrasena) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    const usuario = {
      _id: usuarioId,
      Rol: rol,
      Nombre: nombre,
      Apellido: apellido,
      Tipo_Documento: tipoDocumento,
      Documento: documento,
      Direccion: direccion,
      Telefono: telefono,
      Correo: correo,
      Contrasena: contrasena,
    };

    fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
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

  const validarContrasena = () => {
    if (contrasena === confirmarContrasena) {
      console.log("Las contraseñas coinciden");
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/usuario";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        let filteredUsuario = authors.filter(
          (Usuarios) => Usuarios._id === usuarioId
        );
        setUsuarioInicial(filteredUsuario[0]); // Establecer los valores iniciales del Usuario
        setRol(filteredUsuario[0].Rol);
        setNombre(filteredUsuario[0].Nombre);
        setApellido(filteredUsuario[0].Apellido);
        setTipoDocumento(filteredUsuario[0].Tipo_Documento);
        setDocumento(filteredUsuario[0].Documento);
        setDireccion(filteredUsuario[0].Direccion);
        setTelefono(filteredUsuario[0].Telefono);
        setCorreo(filteredUsuario[0].Correo);
        setContrasena(filteredUsuario[0].Contrasena);
        setConfirmarContrasena(filteredUsuario[0].Contrasena);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Hace la consulta de los roles disponibles
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/rol";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.rol;
        let filtrarProveedores = authors.filter((rol) => rol.Estado === true);
        setRoles(filtrarProveedores);
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
              <h2 className="main-title text-center">MODIFICAR USUARIO</h2>
              <form className="main-view" onSubmit={handleSubmit}>
                {usuarioInicial && (
                  <div className="container-fields">

                    <div className="content-label-input">
                      <label htmlFor="documento">Documento</label>
                      <input
                        className="general-input form-control"
                        type="number"
                        id="documento"
                        disabled
                        value={documento || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(/\D/g, "");
                          setDocumento(numbersOnly);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="tipoDocumento">Tipo de documento</label>
                      <select
                        id="tipoDocumento"
                        className="general-input form-select"
                        disabled
                        value={tipoDocumento || ""}
                        onChange={(event) => setTipoDocumento(event.target.value)}
                      >
                        <option defaultValue>Seleccione...</option>
                        <option value="CC">Cédula de ciudadanía</option>
                        <option value="Ti">Cédula de extranjería</option>
                        <option value="CE">Tarjeta de identidad</option>
                      </select>
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="rol">Rol</label>
                      <select
                        className="general-input form-select"
                        id="rol"
                        value={rol}
                        onChange={(event) => setRol(event.target.value)}
                      >
                        <option value="">Seleccione</option>
                        {roles.length > 0 &&
                          roles.map((role, index) => (
                            <option key={index} value={role.Nombre}>
                              {role.Nombre}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="nombre"
                        value={nombre || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const onlyLetters = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setNombre(onlyLetters);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="apellido">Apellidos</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="apellido"
                        value={apellido || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const onlyLetters = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setApellido(onlyLetters);
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

                    <div className="content-label-input">
                      <label htmlFor="correo">Correo</label>
                      <input
                        className="general-input form-control"
                        type="email"
                        id="correo"
                        value={correo || ""}
                        onChange={(event) => setCorreo(event.target.value)}
                      />
                    </div>

                  </div>
                )}
                <div class="container-button">
                  <div className="content-button">
                    <input
                      onClick={usuarioModificar}
                      className="general-button cancel-button"
                      type="reset"
                      value="Cancelar"
                    />
                    <input
                      onClick={usuarioModiCoreacta}
                      class="general-button submit-button"
                      type="submit"
                      id="btnRegistrar"
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

export default ModificarUsu;

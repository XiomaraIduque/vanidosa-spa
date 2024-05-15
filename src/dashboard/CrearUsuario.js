import alertasUsuario from "../assets/alertas/usuario/alertasUsuario";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function CrearUsu() {
  const [usuarios, setUsuarios] = useState([]);
  const [rolito, setRolito] = useState("");
  const [rolitoValido, setRolitoValido] = useState(true);

  const [nombre, setNombre] = useState('');
  const [nombreValido, setNombreValido] = useState(true);

  const [apellido, setApellido] = useState('');
  const [apellidoValido, setApellidoValido] = useState(true);

  const [tipoDocumento, setTipoDocumento] = useState('');
  const [tipoDocumentoValido, setTipoDocumentoValido] = useState(true);

  const [documento, setDocumento] = useState('');
  const [documentoValido, setDocumentoValido] = useState(true);

  const [direccion, setDireccion] = useState('');
  const [direccionValido, setDireccionValido] = useState(true);

  const [telefono, setTelefono] = useState('');
  const [telefonoValido, setTelefonoValido] = useState(true);

  const [correo, setCorreo] = useState('');
  const [correoValido, setCorreoValido] = useState(true);

  const [contrasena, setContrasena] = useState('');
  const [contrasenaValido, setContrasenaValido] = useState(true);

  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [confirmarContrasenaValido, setConfirmarContrasenaValido] = useState(true);

  const url = "https://api-proyecto-5hms.onrender.com/api/usuario";

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        setUsuarios(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    //valida de que el documento tenga al menos 10 numeros
    if (documento.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Documento inválido",
        text: "El documento debe tener al menos 10 números.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    //Validade que el telefono tenga al menos 10 numeros
    if (telefono.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Teléfono inválido",
        text: "El teléfono debe tener al menos 10 números.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    //Valida de que ningun campo este vacio
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
        title: "Campo vacío...",
        text: "Querido usuario, todos los campos son obligatorios.",
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

    //valida que el documento ya exista o no
    if (
      usuarios.some((usuario) => usuario.Documento === parseInt(documento, 10))
    ) {
      Swal.fire({
        icon: "error",
        title: "Documento existente",
        text: "El documento ingresado ya se encuentra registrado.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }
    //valida de que el correo este registrado o no
    if (usuarios.some((usuario) => usuario.Correo === correo)) {
      Swal.fire({
        icon: "error",
        title: "Correo existente",
        text: "El correo ingresado ya se encuentra registrado.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }
    //valida de que la contraseña tenga al menos 8 caracteres
    if (contrasena.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    const usuario = {
      Rol: rolito,
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
      method: "POST",
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

  const resetFields = () => {
    setNombre("");
    setApellido("");
    setTipoDocumento("");
    setDocumento("");
    setDireccion("");
    setTelefono("");
    setCorreo("");
    setContrasena("");
    setConfirmarContrasena("");
    setRolito("");
  };

  const handleClear = () => {
    resetFields();
  };


  const [Rol, setRol] = useState([]);

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/rol";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.rol;
        let filtrarProveedores = authors.filter((rol) => rol.Estado === true);
        setRol(filtrarProveedores);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const mostrarAlerta = alertasUsuario();

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p className="main-title">CREAR USUARIO</p>
              <form className="main-view" onSubmit={handleSubmit}>
                <div className="container-fields">
                  <div className="content-label-input">
                    <label htmlFor="tipoDocumento">Tipo de documento</label>
                    <select
                      id="tipoDocumento"
                      className={`general-input form-select ${tipoDocumentoValido ? "" : "campo_invalido"}`}
                      value={tipoDocumento || ""}
                      onChange={(event) => {
                        setTipoDocumento(event.target.value)
                        setTipoDocumentoValido(event.target.value.trim() !== "")
                      }}
                    >
                      <option defaultValue>Seleccione...</option>
                      <option value="Cédula de ciudadanía">
                        Cédula de ciudadanía
                      </option>
                      <option value="Cédula de extranjería">
                        Cédula de extranjería
                      </option>
                      <option value="Tarjeta de identidad">
                        Tarjeta de identidad
                      </option>
                    </select>
                    {!tipoDocumentoValido && (
                      <p className="error-message">El tipo de documento es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="documento">Documento</label>
                    <input
                      className={`general-input form-control ${documentoValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="documento"
                      value={documento || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const numbersOnly = inputValue.replace(/\D/g, "");
                        setDocumento(
                          numbersOnly.trim() === "" ? null : numbersOnly
                        );
                        setDocumentoValido(
                          numbersOnly.trim() !== ""
                        );
                      }}
                    />
                    {!documentoValido && (
                      <p className="error-message">El documento es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="nombre">Nombre</label>
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
                    <label htmlFor="apellido">Apellidos</label>
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
                    <label htmlFor="rol">Rol</label>
                    <select
                      className={`general-input form-select ${rolitoValido ? "" : "campo_valido"}`}
                      id="proveedor"
                      value={rolito || ""}
                      onChange={(e) => {
                        setRolito(e.target.value)
                        setRolitoValido(e.target.value.trim() !== "")
                      }}
                    >
                      <option value="">Seleccione</option>
                      {Rol.length > 0 &&
                        Rol.map((roles, index) => (
                          <option key={index}>{roles.Nombre}</option>
                        ))}
                    </select>
                    {!rolitoValido && (
                      <p className="error-message">El rolito es obligatorio*</p>
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

                  <div className="content-label-input">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                      className={`general-input form-control ${contrasenaValido ? "" : "campo_invalido"}`}
                      type="password"
                      id="contrasena"
                      value={contrasena || ""}
                      onChange={(event) => {
                        setContrasena(event.target.value);
                        setContrasenaValido(event.target.value.trim() !== "");

                      }}
                    />
                    {!contrasenaValido && (
                      <p className="error-message">La contraseña es obligatoria*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="confirmarContrasena">
                      Confirmar contraseña
                    </label>
                    <input
                      className={`general-input form-control ${confirmarContrasenaValido ? "" : "campo_invalido"}`}
                      type="password"
                      id="confirmarContrasena"
                      value={confirmarContrasena || ""}
                      onChange={(event) => {
                        setConfirmarContrasena(event.target.value);
                        setConfirmarContrasenaValido(event.target.value.trim() !== "");

                      }}
                    />
                    {!confirmarContrasenaValido && (
                      <p className="error-message">Confirmar contraseña es obligatorio*</p>
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
                        navigate("/listarUsuario");
                      }}
                    />

                    <input
                      className="general-button clean-button"
                      type="reset"
                      value="Limpiar"
                      onClick={handleClear}
                    />
                    <input
                      onClick={mostrarAlerta}
                      className="general-button submit-button"
                      type="submit"
                      id="btnRegistrar"
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

export default CrearUsu;

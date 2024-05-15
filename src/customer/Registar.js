import exitoRegistro from "../assets/alertas/Registrar/exitoRegistro";
import CustomerHeader from "../components/CustomerHeader";
import React, { useState, useEffect } from "react";
import whatsapp from '../assets/img/whatsapp.svg';
import Swal from 'sweetalert2';


function Registrar() {
  const [usuarios, setUsuarios] = useState([]);
  const url = 'https://api-proyecto-5hms.onrender.com/api/usuario';

  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        setUsuarios(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [rol, setRol] = useState('Cliente'); // Rol por defecto: cliente
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

  const handleSubmit = (event) => {
    event.preventDefault();

    //valida de que el documento tenga al menos 10 numeros
    if (!documento || documento.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Documento inválido',
        text: 'El documento debe tener al menos 8 números.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }

    //Validade que el telefono tenga al menos 10 numeros
    if (!telefono || telefono.length < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono debe tener al menos 10 números.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }

    //Valida de que ningun campo este vacio
    if (!nombre || !apellido || !tipoDocumento || !documento || !direccion || !telefono || !correo || !contrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío...',
        text: 'Querido usuario, todos los campos son obligatorios.',
        confirmButtonColor: '#212F3D'
      });
      return;
    } else if (contrasena !== confirmarContrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.',
        confirmButtonColor: '#212F3D'
      });
      return;
    } else if (contrasena.trim() === "" || confirmarContrasena.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }

    //valida que el documento ya exista o no
    if (usuarios.some(usuario => usuario.Documento === parseInt(documento, 8))) {
      Swal.fire({
        icon: 'error',
        title: 'Documento existente',
        text: 'El documento ingresado ya se encuentra registrado.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }
    //valida de que el correo este registrado o no
    if (usuarios.some(usuario => usuario.Correo === correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo existente',
        text: 'El correo ingresado ya se encuentra registrado.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }

    //valida de que la contraseña tenga al menos 8 caracteres
    if (contrasena.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 8 caracteres.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }

    const usuario = {
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
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => response.json())
      .then(data => {
        // Hacer algo con la respuesta del servidor
        console.log(data);
      })
      .catch(error => {
        // Manejar el error de la solicitud
        console.error('Error:', error);
      });
  };


  const resetFields = () => {
    setNombre('');
    setApellido('');
    setTipoDocumento('');
    setDocumento('');
    setDireccion('');
    setTelefono('');
    setCorreo('');
    setContrasena('');
    setConfirmarContrasena('');
    setRol('Cliente');
  };

  const handleClear = () => {
    resetFields();
  };




  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'El correo ingresado no es valido',
        text: 'El correo ingresado no es valido ingresa por favor un correo valido.',
        confirmButtonColor: '#212F3D'
      });
      setCorreo('');
      return;
      //alert('Ingresa un correo electrónico válido');
    }
  };

  const mostrarAlerta = exitoRegistro();
  return (
    <>
      <CustomerHeader />
      <div className="content-registration-form d-flex justify-content-center align-items-center">
        <div className="registration-form">
          <h2 className="text-center align-items-center titulo-registro">REGISTRO</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={`access-input form-control ${nombreValido ? "" : "campo_invalido"}`}
              type="text"
              placeholder="Nombre"
              id="nombre"
              value={nombre || ""}
              onChange={(event) => {
                const inputValue = event.target.value;
                const onlyLetters = inputValue.replace(/[^A-Za-zñÑ\s]/g, "");
                setNombre(onlyLetters.trim() === "" ? "" : onlyLetters);
                setNombreValido(onlyLetters.trim() !== "");
              }}
            />
            {!nombreValido && (
              <p className="error-message">El nombre es obligatorio*</p>
            )}


            <input className={`access-input form-control ${apellidoValido ? "" : "campo_invalido"}`}
              type="text" placeholder="Apellidos"
              id="apellido"
              value={apellido || ""}
              onChange={(event) => {
                const inputValue = event.target.value;
                const onlyLetters = inputValue.replace(/[^A-Za-zñÑ\s]/g, '');
                setApellido(onlyLetters.trim() === "" ? null : onlyLetters);
                setApellidoValido(onlyLetters.trim() !== "");
              }}
            />
            {!apellidoValido && (
              <p className="error-message">Los apellidos es obligatorio*</p>
            )}

            <select
              className={`access-input form-select select ${tipoDocumentoValido ? "campo_nvalido" : ""}`}
              name="tipoDocumento"
              value={tipoDocumento}
              onChange={(event) => {
                setTipoDocumento(event.target.value);
                setTipoDocumentoValido(event.target.value !== "Seleccione tipo de documento");
              }}
              id="tipoDocumento"
            >
              <option defaultValue>Seleccione tipo de documento</option>
              <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
              <option value="Cédula de extranjería">Cédula de extranjería</option>
              <option value="Tarjeta de identidad">Tarjeta de identidad</option>
            </select>
            {!tipoDocumentoValido && (
              <p className="error-message">Por favor, seleccione un tipo de documento válido.</p>
            )}


            <input className={`access-input form-control ${documentoValido ? "" : "campo_invalido"}`}
              type="text" placeholder="Documento"
              id="documento"
              value={documento || ""}
              onChange={event => {
                const inputValue = event.target.value;
                const numbersOnly = inputValue.replace(/\D/g, '');
                setDocumento(numbersOnly.trim() === "" ? null : numbersOnly);
                setDocumentoValido(numbersOnly.trim() !== "");
              }}
            />
            {!documentoValido && (
              <p className="error-message">El documento es obligatorio minimo 8 digitos*</p>
            )}


            <input
              className={`access-input form-control ${direccionValido ? "" : "campo_invalido"}`}
              type="text"
              placeholder="Dirección"
              id="direccion"
              value={direccion || ""}
              onChange={(event) => {
                setDireccion(event.target.value);
                setDireccionValido(event.target.value.trim() !== "");
              }}
            />
            {!direccionValido && (
              <p className="error-message">La dirección es obligatoria*</p>
            )}



            <input className={`access-input form-control ${telefonoValido ? "" : "campo_invalido"}`}
              type="text" placeholder="Teléfono"
              id="telefono"
              value={telefono || ""}
              onChange={event => {
                const inputValue = event.target.value;
                const numbersOnly = inputValue.replace(/\D/g, '');
                setTelefono(numbersOnly.trim() === "" ? null : numbersOnly);
                setTelefonoValido(numbersOnly.trim() !== "");
              }}
            />
            {!telefonoValido && (
              <p className="error-message">El telefono es obligatorio minimo 10 digitos*</p>
            )}

            <input className={`access-input form-control ${correoValido ? "" : "campo_invalido"}`}
              type="email" placeholder="Correo"
              id="correo"
              value={correo || ""}
              onChange={(event) => {
                setCorreo(event.target.value)
                setCorreoValido(event.target.value.trim() !== "")
              }}
              onBlur={(event) => validateEmail(event.target.value)}
            />
            {!correoValido && (
              <p className="error-message">El correo es obligatorio*</p>
            )}


            <input className={`access-input form-control ${contrasenaValido ? "" : "campo_invalido"}`}
              type="password" placeholder="Contraseña"
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

            <input className={`access-input form-control ${confirmarContrasenaValido ? "" : "campo_invalido"}`}
              type="password" placeholder="Confirmar Contraseña"
              id="confirmarContrasena"
              value={confirmarContrasena || ""}
              onChange={(event) => {
                setConfirmarContrasena(event.target.value);
                setConfirmarContrasenaValido(event.target.value.trim() !== "");

              }}
            />
            {!confirmarContrasenaValido && (
              <p className="error-message">La contraseña es obligatoria*</p>
            )}

            <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>

            <div className="boton-registro">
              <input className="clean-button" type="reset" value="Limpiar" onClick={handleClear} />
              {/* <input className="send-button btn btn-primary" type="submit" id="btnRegistrar" value="Registrar" /> */}
              <button className="register-edict" id="registrar" type="submit" value="Registrar" onClick={mostrarAlerta}>Registrar</button>
            </div>
          </form>
        </div>

        <a
          className="Link-whatsapp d-flex justify-content-center"
          href=""
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={whatsapp} alt="" style={{ width: "36px" }} />
        </a>
      </div>
    </>
  );
}

export default Registrar;
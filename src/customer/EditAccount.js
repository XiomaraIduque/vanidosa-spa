import CustomerHeader from "../components/CustomerHeader";
import React, { useState, useEffect } from "react";
import whatsapp from '../assets/img/whatsapp.svg';
import Swal from 'sweetalert2';
import "../assets/css/register-login.css"
import usuarioClientes from "../assets/alertas/usuarioEditado/edicionExito";

function EditAccount() {
  const usuarioId = localStorage.getItem('_id') || null;
  const [usuarioInicial, setUsuarioInicial] = useState(null);

  const [rol, setRol] = useState('Cliente');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const url = 'https://api-proyecto-5hms.onrender.com/api/usuario';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !tipoDocumento || !documento || !direccion || !telefono || !correo) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío...',
        text: 'Querido usuario, todos los campos son obligatorios.',
        confirmButtonColor: '#212F3D'
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
    };

    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
    }
  };

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        let filteredUsuario = authors.find((Usuarios) => Usuarios._id === usuarioId);
        if (filteredUsuario) {
          setUsuarioInicial(filteredUsuario);
          setRol(filteredUsuario.Rol);
          setNombre(filteredUsuario.Nombre);
          setApellido(filteredUsuario.Apellido);
          setTipoDocumento(filteredUsuario.Tipo_Documento);
          setDocumento(filteredUsuario.Documento);
          setDireccion(filteredUsuario.Direccion);
          setTelefono(filteredUsuario.Telefono);
          setCorreo(filteredUsuario.Correo);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [usuarioId]);

  return (
    <>
      <CustomerHeader />
      <div className="content-registration-form d-flex justify-content-center align-items-center">
        <div className="registration-form">
          <h2 className="mb-3">CONFIGURACIÓN CUENTA</h2>
          <form className="form-configurarCuenta" onSubmit={handleSubmit}>
            {usuarioInicial && (
              <>
                <input
                  className="access-input form-control"
                  type="text"
                  placeholder="Nombre"
                  id="nombre"
                  value={nombre || ""}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const onlyLetters = inputValue.replace(/[^A-Za-zñÑ\s]/g, '');
                    setNombre(onlyLetters)
                  }}
                />
                <input
                  className="access-input form-control"
                  type="text"
                  placeholder="Apellidos"
                  id="apellido"
                  value={apellido || ""}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const onlyLetters = inputValue.replace(/[^A-Za-zñÑ\s]/g, '');
                    setApellido(onlyLetters);
                  }}
                />

                <select
                  className="access-input form-select select"
                  name="tipoDocumento"
                  value={tipoDocumento}
                  onChange={(event) => setTipoDocumento(event.target.value)}
                  id="tipoDocumento"
                >
                  <option value="">Seleccione tipo de documento</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="Ti">Cédula de extranjería</option>
                  <option value="CE">Tarjeta de identidad</option>
                </select>

                <input
                  className="access-input form-control"
                  type="text"
                  placeholder="Documento"
                  id="documento"
                  value={documento || ""}
                  onChange={event => {
                    const inputValue = event.target.value;
                    const numbersOnly = inputValue.replace(/\D/g, '');
                    setDocumento(numbersOnly);
                  }}
                />

                <input
                  className="access-input form-control"
                  type="text"
                  placeholder="Dirección"
                  id="direccion"
                  value={direccion}
                  onChange={(event) => setDireccion(event.target.value)}
                />
                <input
                  className="access-input form-control"
                  type="text"
                  placeholder="Teléfono"
                  id="telefono"
                  value={telefono}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const numbersOnly = inputValue.replace(/\D/g, '');
                    setTelefono(numbersOnly);
                  }}
                />

                <input
                  className="access-input form-control"
                  type="email"
                  placeholder="Correo"
                  id="correo"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  onBlur={(event) => validateEmail(event.target.value)}
                />
              </>
            )}


            <div className="boton-registro">
              <input className="clear-cancelar" type="reset" value="Cancelar" />
              {/* <input className="send-button btn btn-primary" type="submit" id="btnRegistrar" value="Registrar" /> */}
              <button className="register-button" id="registrar" type="submit" value="Registrar" onClick={usuarioClientes} >Editar</button>
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

export default EditAccount;

import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import React, { useState, useEffect } from 'react';
import whatsapp from '../assets/img/whatsapp.svg';
import logo from '../assets/img/logo.svg';
import Swal from 'sweetalert2';

const urlUsuarios = 'https://api-proyecto-5hms.onrender.com/api/usuario';
const urlRecuperar = 'https://api-proyecto-5hms.onrender.com/api/olvidocontrasena';

function Recuperar() {
  const [correo, setCorreo] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch(urlUsuarios)
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

    // Valida de que ningún campo esté vacío
    if (!correo) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío...',
        text: 'Querido usuario debes ingresar el Correo.',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    // Verificar si el correo está desactivado
    const usuarioDesactivado = usuarios.find((usuario) => usuario.Correo === correo && usuario.Estado === false);
    if (usuarioDesactivado) {
      Swal.fire({
        icon: 'error',
        title: 'Correo desactivado',
        text: 'No se puede enviar correo porque el correo está desactivado. Por favor, contacta al administrador.',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    const recuperar = {
      Correo: correo,
    };

    fetch(urlRecuperar, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recuperar),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hacer algo con la respuesta del servidor
        console.log(data);

        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: `El correo de verificación para reestablecer su contraseña se ha enviado correctamente a la dirección de email: "${correo}". Gracias por utilizar nuestro servicio.`,
          confirmButtonColor: '#212F3D',
        });
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error('Error:', error);
      });
  };

  return (
    <>
      <CustomerHeader />
      <div className="text-center">
        <div className="content-form d-flex justify-content-center align-items-center">
          <div>
            <img src={logo} alt="Logo de la empresa" />
            <br /> <br />
            <h4>Recuperar</h4>
            <form id="formulario" className="input-inicio" onSubmit={handleSubmit}>
              <input
                type="text"
                name="correo"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <br />
              <button className="btn btn-primary bnt-loguear" type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
        <a className="Link-whatsapp d-flex justify-content-center" href="https://wa.me/123456789" style={{ justifyContent: "center" }}>
          <img src={whatsapp} alt="Enlace de WhatsApp" style={{ width: "36px" }} />
        </a>
      </div>
      <CustomerFooter />
    </>
  );
}

export default Recuperar;

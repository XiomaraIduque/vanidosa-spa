import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import whatsapp from '../assets/img/whatsapp.svg';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../assets/css/customer-mixed-styles.css"
const url = 'https://api-proyecto-5hms.onrender.com/api/auth/login';


function Login({ setIsLoggedIn, setToken, setRol, setUser_id, setDocumento }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!correo || !contrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío...',
        text: 'Querido usuario, todos los campos son obligatorios!',
        confirmButtonColor: ' #212F3D',
      });
      return;
    }

    setIsLoading(true);

    const login = {
      Correo: correo,
      Contrasena: contrasena,
    };

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        if (!data.usuario.Estado) {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Tu cuenta está deshabilitada. Por favor, contacta al administrador.',
            confirmButtonColor: '#212F3D',
          });
          return;
        }
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido al sistema',
          confirmButtonColor: '#212F3D',
        }).then(() => {
          setIsLoggedIn(true);
          setToken(data.token);
          setRol(data.usuario.Rol);
          setUser_id(data.usuario._id);
          setDocumento(data.usuario.Documento);
          console.log(data.usuario.Documento)
          localStorage.setItem('token', data.token);
          localStorage.setItem('Rol', data.usuario.Rol);
          localStorage.setItem('_id', data.usuario._id);
          localStorage.setItem('Documento', data.usuario.Documento);
          // Redirigir al usuario a la página de configuración de la cuenta con el _id como parámetro
          navigate("/");
          //navigate(`/ConfiguracionCuenta?id=${data.usuario._id}`);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: 'Correo o Contraseña incorrectos',
          confirmButtonColor: '#212F3D',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'correo') {
      setCorreo(value);
    } else if (name === 'contrasena') {
      setContrasena(value);
    }
  };



  return (
    <>
      <CustomerHeader />
      <div className="container_login">
        <div className="content-form d-flex justify-content-center align-items-center login">
          <div className='content-title-form'>
            <h2 className='title-login mb-4'>INICIO DE SESIÓN</h2>
            <form id="formulario" className="input-inicio" onSubmit={handleSubmit}>
              <input
                className="input_login"
                type="text"
                name="correo"
                placeholder="Correo"
                value={correo}
                onChange={handleInputChange}
              /> <br />
              <input
                className="input_login"
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={contrasena}
                onChange={handleInputChange}
              /><br />
              <p className='link-login'>¿No tienes cuenta? <Link className='link' to="/Registar">Regístrate</Link></p>
              <p className='link-login'>¿Has olvidado tu contraseña? <Link className='link' to="/Recuperar">Recuperar</Link></p>
              <div className='content-button-login'>
                <button className="bnt-loguear" type="submit" disabled={isLoading}>
                  {isLoading ? 'Cargando...' : 'Ingresar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Reemplaza el valor href con tu enlace de WhatsApp */}
      <a
        className="Link-whatsapp d-flex justify-content-center"
        href="https://wa.me/123456789" // Reemplaza con tu enlace de WhatsApp
        style={{ justifyContent: "center" }}
      >
        <img src={whatsapp} alt="Enlace de WhatsApp" style={{ width: "36px" }} />
      </a>

      <CustomerFooter />
    </>
  );
}

export default Login;
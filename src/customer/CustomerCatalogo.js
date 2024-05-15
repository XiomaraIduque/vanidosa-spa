import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import React, { useState, useEffect } from "react";
import whatsapp from '../assets/img/whatsapp.svg';
import { Link } from 'react-router-dom';
import '../assets/css/customer-catalogo.css'


function Catalogo() {

  const [Servicio, setServicio] = useState([]);

  useEffect(() => {
    const servicioUrl = 'https://api-proyecto-5hms.onrender.com/api/servicio';

    fetch(servicioUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.servicio;
        setServicio(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // ---------------------------------Código de redirección a Whatsapp con mensaje personalizado---------------------------------
  const phoneWhatsApp = '3117794075';
  const message = 'Bienvenido a Vanidosa SPA, ¿cómo podemos ayudarte?';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneWhatsApp}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      <CustomerHeader />
      <main className="main-catalogo">

        <p className="catalogo_l">NUESTRO CATÁLOGO</p>

        <div className="container-catalogo">

          <div className="body-catalogo">
            {Servicio.map((servicio) => (
              <div className="producto" key={servicio._id}>
                <img
                  src={
                    `https://api-proyecto-5hms.onrender.com/api/servicio/obtenerImagen/${servicio._id}`}
                  alt="" className="produto-img" />
                <div className="productDescription">
                  <h5 className="produto__title">Nombre: {servicio.Nombre}</h5>
                  <span className="produto__price">Precio: {`$${servicio.Precio}`}</span>
                  <br />
                  <span>Tiempo: {servicio.Tiempo} minutos</span>
                  <h6></h6>
                  <Link to={`/agendar?servicio=${encodeURIComponent(servicio.Nombre)}`}>
                    <button className="agregar_button">Agendar</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <a
        className="Link-whatsapp d-flex justify-content-center"
        onClick={handleWhatsAppClick}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src={whatsapp} alt="" style={{ width: "36px" }} />
      </a>
      <CustomerFooter />
    </>
  );
}

export default Catalogo;
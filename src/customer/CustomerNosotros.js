import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import logito from '../assets/img/image_about.png';
import whatsapp from '../assets/img/whatsapp.svg';
import '../assets/css/customer-nosotros.css'
import React from "react";




function NosotrosCl() {
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
      <main>
        <div className="container_nosotros">
          <div className="wave" style={{ height: "150px", overflow: "hidden" }}>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
              <path d="M0.00,49.99 C150.00,150.00 271.49,-49.99 500.00,49.99 L500.00,-0.00 L0.00,-0.00 Z" style={{ stroke: "none", fill: "#137B93" }}></path>
            </svg>
          </div>

          <div className="vanidosa-name">
            <h2>&reg; Vanidosa Spa</h2>
          </div>
          <div className="container-main">

            <div className="content-image-about element-1">
              <img className="image_about" src={logito} />
            </div>

            <div className="container-about element-2">
              <div className="content-about">
                <h4 className="title-us">VISIÓN GENERAL DE LA EMPRESA</h4>
                <p className="about-text">Vanidosa Spa, al comienzo de sus operaciones,
                  venderá una amplia gama de servicios y productos de belleza. Proporcionaremos
                  servicios de calidad para el cabello, las uñas, las pestañas y la piel,
                  junto con las mejores líneas de productos de belleza. Lo que diferenciará a
                  "Vanidosa Spa" de la competencia es nuestro compromiso de brindar todos
                  estos servicios en una ubicación conveniente en Turbo Antioquia
                  Ubicación: Veranillo calle: 101 Carrera:18-80.
                </p>
              </div>
            </div>

            <div className="container-about element-3">
              <div className="content-about">
                <h4 className="title-us">Nuestra Solución</h4>
                <p className="about-text">Vanidosa Spa:
                  Es un salón de belleza de servicio completo que se especializa
                  en peinados de moda de alta gama, manicuras, pedicuras y pestañas
                  dedicados a proporcionar constantemente una alta satisfacción al
                  cliente al brindar un excelente servicio, productos de calidad y
                  proporcionar un ambiente agradable a una relación razonable de precio
                  / valor. También mantendremos un ambiente de trabajo amigable, justo y creativo,
                  que respete la diversidad, las ideas y el trabajo duro.
                </p>
              </div>
            </div>

            <div className="content-image-about element-4">
              <img className="image_about" src={logito} />
            </div>

            <div className="content-image-about element-5">
              <img className="image_about" src={logito} />
            </div>

            <div className="container-about element-6">
              <div className="content-about">
                <h4 className="title-us">NUESTRAS VENTAJAS</h4>
                <p className="about-text">Vanidosa Spa
                  busca destacar en el mercado al ofrecer una gama
                  completa de servicios de belleza, superando las limitaciones de
                  los salones tradicionales. A diferencia de sus competidores, Vanidosa
                  Spa se esfuerza por brindar una solución integral, combinando servicios
                  de uñas y cabello en un solo espacio, satisfaciendo la demanda de sus clientes.
                  A pesar de compartir el enfoque en uñas y cabello, se distinguen de los lujosos "Day Spas",
                  apuntando a un público más amplio con un nivel de lujo asequible. El ambiente relajante y
                  los servicios personalizados reflejarán la filosofía del negocio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <a
        className="Link-whatsapp d-flex justify-content-center"
        onClick={handleWhatsAppClick}
      >
        <img
          src={whatsapp}
          alt=""
          style={{ width: "36px" }}
        />
      </a>
      <CustomerFooter />
    </>
  );
}


export default NosotrosCl;
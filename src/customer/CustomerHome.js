import imageSecondary2 from "../assets/img/imageSecondary2.png";
import imageSecondary1 from "../assets/img/imageSecondary1.png";
import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import imageMain from "../assets/img/imageMain.png";
import imageMainTwo from "../assets/img/imageMainDos.png";
import whatsapp from "../assets/img/whatsapp.svg";
import "../assets/css/customer-home.css"
import { Link } from "react-router-dom";
import React from "react";

function HomeCustomer() {
  // ---------------------------------Código de redirección a Whatsapp con mensaje personalizado---------------------------------
  const phoneWhatsApp = '3117794075';
  const message = 'Bienvenido a Vanidosa SPA, ¿cómo podemos ayudarte?';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneWhatsApp}&text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
  };

  return (
    <div className="root-customer">
      <CustomerHeader />
      <main className="main-customer">

        <div className="container-main-customer">

          <img className="image-main" src={imageMain} alt="" />
          <img className="image-main-two" src={imageMainTwo} alt="" />

          <div className="container-btn-main">

            <Link
              className="btn-main"
              to="/Agendar"
            >
              Agendar cita
            </Link>

            <Link
              className="btn-main"
              to="/catalogo"
            >
              Ver servicios
            </Link>

          </div>

        </div>

        <div className="section-customer">

          <p className="section-customer-title">PASIÓN POR LA BELLEZA</p>

          <p className="section-customer-text">
            En Vanidosa SPA y Belleza, somos profesionales apasiondos por el arte de la belleza y el cuidado personal, explora nuestra amplia gama de servicios diseñados para ti, estamos comprometidos y dispuestos a brindarte la mejor atención.
          </p>

        </div>

        <div className="section-customer-image">

          <div className="content-image-secondary-customer">
            <img className="image-secondary-customer" src={imageSecondary1} alt="" />
            <img className="image-secondary-customer" src={imageSecondary2} alt="" />
          </div>

        </div>

        <a className="Link-whatsapp d-flex justify-content-center" onClick={handleWhatsAppClick}>
          <img src={whatsapp} alt="" style={{ width: "36px" }} />
        </a>

      </main>
      <CustomerFooter />
    </div>
  );
}

export default HomeCustomer;
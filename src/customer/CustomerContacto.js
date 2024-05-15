
import whatsapp_contacto from "../assets/img/whatsapp_contacto.svg";
import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import whatsapp from "../assets/img/whatsapp.svg";
import correo from "../assets/img/email.svg";
import phone from "../assets/img/phone.svg";
import map from "../assets/img/map.svg";
import '../assets/css/customer-contacto.css'
import React from "react";

function Contacto() {

  // ---------------------------------Código de redirección a Whatsapp con mensaje personalizado---------------------------------
  const phoneWhatsApp = '3136871870';
  const message = 'Bienvenido a Vanidosa SPA, ¿cómo podemos ayudarte?';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneWhatsApp}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const email = 'autenticacionvanidosa@gmail.com';
  const subject = 'Consulta desde la aplicación';
  const body = 'Hola, ¿cómo puedo obtener más información?';

  const handleEmailClick = () => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoURL = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoURL;
  };

  const phoneNumber = '3136871870';

  const handleCallClick = () => {
    const telURL = `tel:${phoneNumber}`;
    window.location.href = telURL;
  };

  const latitude = 8.088137; // Latitud del destino
  const longitude = -76.74188; // Longitud del destino

  const handleMapsPress = () => {
    const query = `${latitude},${longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}&travelmode=driving`;
    window.location.href = url;
  };

  return (
    <>
      <CustomerHeader />
      <main className="contact-main">

        <div className="container-contact-main">


          <div className="content-contact-main">
            <p className="contact-main-title">CONTACTO VANIDOSA SPA</p>

            <div className="container-contact-item" onClick={handleMapsPress} >
              <img className="contact-icon" src={map} />
              <p className="contact-item-title">NUESTRA SEDE</p>
              <p className="contact-item-text">Calle 101 # 18 - 80</p>
              <p className="contact-item-text">Barrio Veranillo</p>
              <p className="contact-item-text">TURBO</p>
            </div>

            <div className="container-contact-item" onClick={handleCallClick} >
              <img className="contact-icon" src={phone}/>
              <p className="contact-item-title">TELÉFONO</p>
              <p className="contact-item-text">+57 3136871870</p>
            </div>

            <div className="container-contact-item" onClick={handleWhatsAppClick}>
              <img className="contact-icon" src={whatsapp_contacto} />
              <p className="contact-item-title">WHATSAPP</p>
              <p className="contact-item-text">+57 3136871870</p>
            </div>

            <div className="container-contact-item"  onClick={handleEmailClick} >
              <img className="contact-icon" src={correo}/>
              <p className="contact-item-title">CORREO</p>
              <p className="contact-item-text">vanidosapa@gmail.com</p>
            </div>

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

export default Contacto;

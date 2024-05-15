import playStore from "../assets/img/playStore.svg";
import '../assets/css/customer-footer.css'
import '../assets/css/customer-style.css'
import { Link } from "react-router-dom";
import React from "react";

function CustomerFooter() {
  return (
    <footer className="footer-customer">

      <div className="container-footer-customer">

        <article className="article-footer-customer">
          <div className='content-article-footer-customer'>
            <p className='footer-customer-title'>SOBRE VANIDOSA SPA</p>
            <Link className='footer-customer-link'>Sostenibilidad</Link>
            <Link className='footer-customer-link'>Quienes somos</Link>
            <Link className='footer-customer-link'>Contáctenos</Link>
          </div>
        </article>

        <article className="article-footer-customer">
          <div className='content-article-footer-customer'>
            <p className='footer-customer-title'>AYUDA</p>
            <Link className='footer-customer-link'>Encuentra Vanidosa SPA</Link>
            <Link className='footer-customer-link'>Ayuda y Contacto</Link>
            <Link className='footer-customer-link'>Te asesoramos</Link>
            <Link className='footer-customer-link'>Preguntas Frecuentes</Link>
          </div>
        </article>

        <article className="article-footer-customer">
          <div className='content-article-footer-customer'>
            <p className='footer-customer-title'>SOPORTE</p>
            <Link className='footer-customer-link'>Términos y Condiciones</Link>
            <Link className='footer-customer-link'>Políticas de Cookies</Link>
            <Link className='footer-customer-link'>Políticas de Privacidad</Link>
            <Link className='footer-customer-link'>Politica de Garantías</Link>
          </div>
        </article>

        <article className="article-footer-customer border border-0">
          <div className='content-article-footer-customer'>
            <p className='footer-customer-title'>APP VANIDOSA SPA</p>
            <p className='footer-customer-link-app text-start'>Agenda tus servicios</p>
            <p className='footer-customer-link-app text-start'>desde nuestra app</p>
            <Link><img className="image-playStore" src={playStore} alt="" /></Link>
          </div>
        </article>

      </div>

      <div className="container-copyright-customer">
        <p className="copyright-customer">Copyright © 2023 Vanidosa SPA y Belleza.</p>
        <p className="copyright-customer">Reservados todos los derechos </p>
      </div>

    </footer>
  );
}

export default CustomerFooter;
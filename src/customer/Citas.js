import CustomerHeader from "../components/CustomerHeader";
import React, { useState, useEffect } from "react";
import search from '../assets/img/search.svg';
import eye from "../assets/img/eye.svg";
import "../assets/css/CitasCliientes.css"

function extraccionFecha(fechaConFormato) {
  const fecha = new Date(fechaConFormato);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate() + 1).padStart(2, '0');

  const fechaEnFormatoNormal = `${año}-${mes}-${dia}`;
  return fechaEnFormatoNormal;
}

const Modal = ({ mostrarModal, cerrarModal, citaSeleccionada }) => {
  return mostrarModal ? (
    <div className="container_modal_servicio">
      <div className="content_modal_servicio">
        <div className="modal-usuario">
          <h4 className="text-center mb-3">Detalles de la cita</h4>
          {/* 
          <div className="content_info">
            <div className="content_hola">
              <text className="text_title ">Descripcion</text>
            </div>
            <div className="content_descripcion">
              <text className="text_info">{citaSeleccionada.Descripcion}</text>
            </div>
          </div> */}
          <div className="modal-compra">
            <table className="main-table table table-bordered">
              <thead>
                {/* <tr>
                  <th className="space text-center" colSpan="2">
                    <text className="text_title ">Descripcion</text>
                  </th>
                </tr> */}
                <tr>
                  <th className="space text-center">ID</th>
                  <th className="space text-center">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {citaSeleccionada &&
                  citaSeleccionada.Servicios.length > 0 &&
                  citaSeleccionada.Servicios.map((servicio, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{servicio.Nombre}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="container-compra">
            <div className="compra-modal d-flex align-items-center">
              <input
                type="submit"
                className="cerrar-modal"
                value="Cerrar"
                onClick={cerrarModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
function Citas() {
  const [citas, setCitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const Documento = localStorage.getItem('Documento') || null;

  useEffect(() => {
    if (Documento) {

      //Nos convierte el documento para que se lea como number
      const documentoAsNumber = Number(Documento);
      const url = `https://api-proyecto-5hms.onrender.com/api/cita`;

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          if (data && data.cita) {
            //filtra las citas con el documento que se esta recibiendo
            const citasUsuario = data.cita.filter(cita => cita.Documento === documentoAsNumber && cita.ConfirmarCita === false && cita.Estado === true);
            setCitas(citasUsuario);
            console.log(citasUsuario)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [Documento]);


  //Sirven para mostrar la modal del array de servicios
  const [mostrarModal, setMostrarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const abrirModal = (event) => {
    const id = event.currentTarget.getAttribute('data-id');
    const citaSeleccionada = citas.find(cita => cita._id === id);
    setCitaSeleccionada(citaSeleccionada);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setCitaSeleccionada(null);
    setMostrarModal(false);
  };


  return (
    <>
      <CustomerHeader />
      <div className="container-tabla-user">
        <div className="content-table-user">
          <h2 className="main-title text-center mt-5">MIS CITAS</h2>
          <div className="content-select-user d-flex justify-content-between">
            <div className="content-search">
              <input
                className="search_control"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <img className="search-icon" src={search} alt="" />
            </div>
          </div>

          <table className="main-table-user table table-bordered">
            <thead>
              <tr>
                <th className="space-user text-center">ID</th>
                <th className="space-user text-center">Fecha</th>
                <th className="space-user text-center">Hora</th>
                <th className="space-user text-center">Fin cita</th>
                <th className="space-user text-center">Servicios</th>
                <th className="space-user descripcion text-center">Descripcion</th>
                <th className="space-user text-center">Cita confirmada</th>
                <th className="space-user text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {citas
                .filter((cita) => {
                  const searchData = `${cita.Documento} ${cita.Nombre} ${cita.Apellidos} ${cita.FechaCita} ${cita.HoraCita} ${cita.Descripcion} ${cita.Estado}`.toLowerCase();
                  return searchData.includes(searchTerm.toLowerCase());
                })
                .map((cita, index) => (
                  <tr key={cita._id}>
                    <td className="td-user">{index + 1}</td>
                    <td className="td-user">{extraccionFecha(new Date(cita.FechaCita))}</td>
                    <td className="td-user">{cita.HoraCita}</td>
                    <td className="td-user">{cita.Fincita}</td>
                    <td className="td-user">
                      <button
                        className="ver-button"
                        type="submit"

                        data-id={cita._id}
                        onClick={abrirModal}
                      >Ver<img className="eye" src={eye}></img></button>
                      <Modal mostrarModal={mostrarModal} cerrarModal={cerrarModal} citaSeleccionada={citaSeleccionada} />
                    </td>
                    <td className="td-user td-descripcion">{cita.Descripcion}</td>
                    <td className="td-user">{cita.ConfirmarCita ? <>Confirmada</> : <>Pendiente</>}</td>
                    <td className="td-user">{cita.Estado ? <>Tomada</> : <>Cancelada</>}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Citas;

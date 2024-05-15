import toggleGreen from "../assets/img/toggle-on-green.svg";
import last from "../assets/img/chevrons-right-solid.svg";
import square_check from "../assets/img/square-check.svg";
import toggleRed from "../assets/img/toggle-off-red.svg";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import square from "../assets/img/square.svg";
import DashMenu from "../components/DashMenu";
import search from "../assets/img/search.svg";
import eye from "../assets/img/eye.svg";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { data } from "jquery";

const Modal = ({ mostrarModal, cerrarModal, citaSeleccionada }) => {
  const TruncateText = ({ text, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
      setIsTruncated(!isTruncated);
    };

    const displayText = isTruncated ? text.slice(0, maxLength) : text;

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: displayText }} />
        {text.length > maxLength && (
          <button className="ver-mas" onClick={toggleTruncate}>
            {isTruncated ? 'Ver más' : 'Ver menos'}
          </button>
        )}
      </div>
    );
  };
  return mostrarModal ? (
    <div className="container_modal_servicio">
      <div className="content_modal_servicio">
        <div className="modal-usuario">
          <h4 className="text-center mb-3">Detalles de la cita</h4>
          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Documento</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{citaSeleccionada.Documento}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Nombre y Apellidos</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{citaSeleccionada.Nombre} {citaSeleccionada.Apellidos}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Fecha</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{convertirFecha(citaSeleccionada.FechaCita)} </text>
            </div>
          </div>
          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Hora</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{citaSeleccionada.HoraCita} </text>
            </div>
          </div>
          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Hora fin</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{citaSeleccionada.Fincita} </text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_hola">
              <text className="text_title ">Descripcion</text>
            </div>
            <div className="content_descripcion">
              <TruncateText text={citaSeleccionada.Descripcion} maxLength={100} />
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Estado</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{citaSeleccionada.Estado ? <p>Activo</p> : <p>Inactivo</p>}</text>
            </div>
          </div>

          <div className="modal-servicio">
            <table className="main-table table table-bordered">
              <thead>
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

function convertirFecha(fechaConFormato) {
  const fecha = new Date(fechaConFormato);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate() + 1).padStart(2, '0');

  const fechaEnFormatoNormal = `${año}-${mes}-${dia}`;
  return fechaEnFormatoNormal;
}


function ListarCita() {
  const [Citas, setCita] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/cita";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.cita;
        setCita(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const abrirModal = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    const citaSeleccionada = Citas.find((cita) => cita._id === id);
    setCitaSeleccionada(citaSeleccionada);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setCitaSeleccionada(null);
    setMostrarModal(false);
  };

  const handleToggleClick = (cita) => {
    const updatedEstado = !cita.Estado;

    // Si el estado actual es "false", no permitir cambiar a "true" nuevamente
    if (cita.ConfirmarCita) {
      Swal.fire({
        title: "No se puede cancelar",
        text: "La cita ya esta confirmada, no se puede cancelar.",
        icon: "warning",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return; // No realizar la actualización
    }

    // Si el estado actual es "false", no permitir cambiar a "true" nuevamente
    if (!cita.Estado && updatedEstado) {
      Swal.fire({
        title: "No se puede cambiar el estado",
        text: "La cita ya está cancelada y no se puede volver a activar.",
        icon: "warning",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return; // No realizar la actualización
    }

    Swal.fire({
      title: "¿Quieres cambiar el estado?",
      text: "¿Estás seguro de que quieres cambiar el estado de la cita?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#212F3D",
      cancelButtonColor: "#D46146",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://api-proyecto-5hms.onrender.com/api/cita?_id=${cita._id}`,
          {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...cita, Estado: updatedEstado }),
          }
          )
          
          .then((response) => response.json())
          .then((data) => {
            // Update the cita state
            console.log("Cita actualizada:", data); 
            setCita((prevCita) =>
              prevCita.map((item) =>
                item._id === cita._id
                  ? { ...item, Estado: updatedEstado }
                  : item
              )
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
  //Nos hace la gestion para confirmar la cita
  const confirCita = (cita) => {
    const updatedEstado = !cita.Estado;

    if (!cita.Estado && updatedEstado) {
      Swal.fire({
        title: "No se puede confirmar la cita",
        text: "La cita ya está cancelada y no se puede confirmar que fue tomada.",
        icon: "warning",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (cita.ConfirmarCita) {
      Swal.fire({
        title: "Esta acción no se puede realizar",
        text: "La cita ya fue confirmada.",
        icon: "warning",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return; // No realizar la actualización
    }

    Swal.fire({
      title: "¿Quieres confirmar la cita?",
      text: "¿Seguro que la cita fue tomada por el cliente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#212F3D",
      cancelButtonColor: "#D46146",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Stock de insumos",
          text: "Desea descontar algun insumo que se haya terminado.",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#212F3D",
          cancelButtonColor: "#D46146",
          confirmButtonText: "Sí, descontar insumo",
          cancelButtonText: "No, cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/listarInsumos");
            console.log("Redirigir a listarInsumos");
          } else {
            // No hacer nada, simplemente cerrar la alerta
          }
        });
        fetch(
          `https://api-proyecto-5hms.onrender.com/api/cita?_id=${cita._id}`,
          {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...cita, ConfirmarCita: true }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCita((prevCita) =>
              prevCita.map((item) =>
                item._id === cita._id ? { ...item, ConfirmarCita: true } : item
              )
            );
            // Mostrar confirmación para descontar insumo

          })
          .catch((error) => {
            console.error(error);
            // Manejar el error si ocurre
          });
      }
    });
  };

  // Generador del excel
  const generateExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      Citas.filter((cita) => cita.Estado === true).map((cita) => {
        return {
          Documento: cita.Documento,
          Nombre: cita.Nombre,
          Apellidos: cita.Apellidos,
          Servicios: cita.Servicios.map((servicio) => servicio.Nombre).join(
            ", "
          ), // Combine service names into a string
          "Fecha Cita": cita.FechaCita,
          "Hora Cita": cita.HoraCita,
          "Cita Tomada": cita.ConfirmarCita,
          Descripción: cita.Descripcion,
        };
      })
    );

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Citas");

    // Generate the binary data of the excel file
    const excelFile = XLSX.write(workbook, {
      type: "binary",
      bookType: "xlsx",
    });

    // Convert the binary data to a Blob
    const blob = new Blob([s2ab(excelFile)], {
      type: "application/octet-stream",
    });

    // Create a download link for the Blob and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Cita_Reporte.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleGenerateExcel = () => {
    generateExcel();
  };

  // Helper function to convert string to ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredCita = Citas.filter((cita) => {
    const searchData = `${cita.Documento} ${cita.Nombre} ${cita.Apellidos} ${cita.FechaCita} ${cita.HoraCita}
    ${cita.Estado}`.toLowerCase();
    return searchData.includes(searchTerm.toLowerCase());
  });
  const totalPages = Math.ceil(filteredCita.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const citaToShow = filteredCita.slice(startIndex, endIndex);
  const pagesToShow = 10;
  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredCita.length / itemsPerPage);
    const currentGroup = Math.ceil(currentPage / pagesToShow);
    const startPage = (currentGroup - 1) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };



  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view-list">
              <p className="main-title">LISTA DE CITAS</p>
              <div className="main-view" action="">
                <div className="container-list">
                  <div className="content-create-search">

                    <input
                      type="submit"
                      className="general-button register-button box1"
                      value="Registrar cita"
                      onClick={() => {
                        navigate("/crearCita");
                      }}
                    />

                    <div className="container-input-search box2">
                      <input
                        className="input-search form-control"
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                      <img className="search-icon" src={search} alt="" />
                    </div>

                  </div>

                  <div className="container-table">
                    <div className="content-table">
                      <table className="main-table table table-bordered">
                        <thead>
                          <tr>
                            <th className="th-style text-center">ID</th>
                            <th className="th-style text-center">Nombre yApellidos</th>
                            <th className="th-style text-center">Fecha</th>
                            <th className="th-style text-center">Hora</th>
                            <th className="th-style text-center">Estado</th>
                            <th className="th-style text-center">Confirmar</th>
                            <th className="th-style th-actions text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {citaToShow.map((cita, index) => (
                            <tr key={cita.id}>
                              <td className="td-style" label-item='Id'>
                                <input type="hidden" id={cita._id} value={cita._id} />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='Nombre'>{cita.Nombre} {cita.Apellidos}</td>
                              <td className="td-style" label-item='Fecha cita'>{convertirFecha(cita.FechaCita)}</td>
                              <td className="td-style" label-item='Hora cita'>{cita.HoraCita}</td>
                              <td className="td-style" label-item='Estado'>
                                {cita.Estado ? <p>Activo </p> : <p>cancelada </p>}
                              </td>
                              <td className="td-style text-center" label-item='Confirmar cita'>
                                {cita.ConfirmarCita ? (
                                  <img
                                    className="check_box"
                                    src={square_check}
                                    alt=""
                                    onClick={() => confirCita(cita)}
                                    title="Hacer clic para confirmar la cita"
                                  />
                                ) : (
                                  <img
                                    className="check_box"
                                    src={square}
                                    alt=""
                                    onClick={() => confirCita(cita)}
                                  />
                                )}
                              </td>
                              <td className="td-style td-actions" label-item='Acciones'>
                                <img
                                  className="eye"
                                  src={eye}
                                  title="Hacer clic para ver detalles"
                                  data-id={cita._id}
                                  onClick={abrirModal}
                                />
                                {cita.Estado ? (
                                  <img
                                    className="toggle"
                                    src={toggleGreen}
                                    alt=""
                                    onClick={() => handleToggleClick(cita)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                ) : (
                                  <img
                                    className="toggle"
                                    src={toggleRed}
                                    alt=""
                                    onClick={() => handleToggleClick(cita)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                )}
                                <Modal
                                  mostrarModal={mostrarModal}
                                  cerrarModal={cerrarModal}
                                  citaSeleccionada={citaSeleccionada}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {!mostrarModal && (
                      <div className="container-pagination-report">
                        <div className="container-pagination">
                          <div className="content-pagination">

                            <button
                              className="item-pagination"
                              type="button"
                              disabled={currentPage === 1}
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              Anterior
                            </button>

                            {getPageNumbers().map((pageNumber) => (
                              <button
                                className={`item-pagination ${currentPage === pageNumber ? 'active' : ''}`}
                                key={pageNumber}
                                type="button"
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            ))}

                            <button
                              className="item-pagination"
                              type="button"
                              disabled={endIndex >= filteredCita.length}
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              Siguiente
                            </button>

                            <button
                              className="item-pagination"
                              type="button"
                              disabled={currentPage === totalPages}
                              onClick={() => handlePageChange(totalPages)}
                            >
                              <img className="arrow-right-icon" src={last} alt="" />
                            </button>

                          </div>
                        </div>

                        <div className="content-generate-report">
                          <input
                            className="general-button report-button"
                            type="button"
                            value="Generar reporte"
                            onClick={handleGenerateExcel}
                          />
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarCita;

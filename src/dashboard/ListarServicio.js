import toggleGreen from "../assets/img/toggle-on-green.svg";
import last from "../assets/img/chevrons-right-solid.svg";
import toggleRed from "../assets/img/toggle-off-red.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import DashMenu from "../components/DashMenu";
import search from "../assets/img/search.svg";
import edit from "../assets/img/edit.svg";
import eye from "../assets/img/eye.svg";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const Modal = ({ mostrarModal, cerrarModal, servicioSeleccionado }) => {
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
          <h4 className="text-center mb-3">Detalles del servicio</h4>
          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Nombre</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{servicioSeleccionado.Nombre}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Tiempo minutos</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{servicioSeleccionado.Tiempo}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Precio</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{servicioSeleccionado.Precio.toLocaleString()} </text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_hola">
              <text className="text_title ">Imagen</text>
            </div>
            <div className="content_descripcion"
            >
              <img className="content_imagen" src={
                `https://api-proyecto-5hms.onrender.com/api/servicio/obtenerImagen/${servicioSeleccionado._id}`} />
            </div>
          </div>
          <div className="content_info">
            <div className="content_hola">
              <text className="text_title ">Descripcion</text>
            </div>
            <div className="content_descripcion">
            <TruncateText text={servicioSeleccionado.Descripcion} maxLength={100} />

            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Estado</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{servicioSeleccionado.Estado ? <p>Activo</p> : <p>Inactivo</p>}</text>
            </div>
          </div>
          {/* <div className="modal-servicio">
            <table className="main-table table table-bordered border border-1 ">
              <thead>
                <tr>
                  <th className="space text-center" colSpan="2">
                    <h5 className="table-title">Insumos</h5>
                  </th>
                </tr>
                <tr>
                  <th className="space text-center">Nombre</th>
                  <th className="space text-center">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {servicioSeleccionado &&
                  servicioSeleccionado.Productos &&
                  servicioSeleccionado.Productos.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.Nombre}</td>
                      <td>{producto.Cantidad}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div> */}

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

function ListarServicio() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const abrirModal = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    const servicioSeleccionado = Servicio.find((producto) => producto._id === id);
    setServicioSeleccionado(servicioSeleccionado);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setServicioSeleccionado(null);
    setMostrarModal(false);
  };

  const [Servicio, setServicio] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Citas, setCita] = useState([]);

  useEffect(() => {
    const servicioUrl = "https://api-proyecto-5hms.onrender.com/api/servicio";

    fetch(servicioUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.servicio;
        setServicio(authors);
      })
      .catch(function (error) {
        console.log(error);
      });

    const citaUrl = "https://api-proyecto-5hms.onrender.com/api/cita";

    fetch(citaUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.cita;
        setCita(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const isServicioInCitas = (servicio) => {
    return Citas.some((cita) =>
      cita.Servicios.some(
        (servicioCita) => servicioCita.Nombre === servicio.Nombre
      )
    );
  };

  const handleToggleClick = (servicio) => {
    const servicioEnCitas = isServicioInCitas(servicio);
    const citaEnEstadoTrue = Citas.some(
      (cita) =>
        cita.Estado === true &&
        cita.Servicios.some(
          (servicioCita) => servicioCita.Nombre === servicio.Nombre
        )
    );

    if (servicioEnCitas && citaEnEstadoTrue) {
      Swal.fire({
        title: "No se puede desactivar el servicio",
        text: "El servicio está asociado a una cita registrada.",
        icon: "error",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    Swal.fire({
      title: "¿Quieres cambiar el estado?",
      text: "¿Estás seguro de que quieres cambiar el estado del servicio?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#212F3D",
      cancelButtonColor: "#D46146",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEstado = !servicio.Estado;

        fetch(
          `https://api-proyecto-5hms.onrender.com/api/servicio?_id=${servicio._id}`,
          {
            // ... fetch sin cambios
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Actualizar el estado de la lista de servicios con el nuevo estado del servicio
            setServicio((prevServicios) =>
              prevServicios.map((item) =>
                item._id === servicio._id
                  ? { ...item, Estado: updatedEstado }
                  : item
              )
            );
          })
          .catch((error) => {
            console.error(error);
            // Manejar el error si ocurre
          });
      }
    });
  };

  //Generador del Excel

  const generatePDF = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(Servicio);

    // Add header row
    const header = ["Nombre", "Tiempo", "Precio", "Descripción"];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    // Generate Excel data from the array of services
    const servicesData = Servicio.filter((servicio) => servicio === true).map((servicio) => [
      servicio.Nombre,
      servicio.Tiempo,
      servicio.Precio,
      servicio.Descripcion,
    ]);
    XLSX.utils.sheet_add_aoa(worksheet, servicesData, { origin: "A2" });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Servicio_Reporte");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelBlob, "Servicio_Reporte.xlsx");
  };

  const handleGenerateReport = () => {
    generatePDF();
  };

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredServicio = Servicio.filter((servicio) => {
    const searchData = `${servicio.Nombre} ${servicio.Tiempo} ${servicio.Precio} ${servicio.Descripcion} ${servicio.Estado}`.toLowerCase();
    return searchData.includes(searchTerm.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const servicioToShow = filteredServicio.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredServicio.length / itemsPerPage)
  const pagesToShow = 10;
  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredServicio.length / itemsPerPage);
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
              <p class="main-title">LISTAR SERVICIOS </p>
              <div class="main-view" action="">
                <div className="container-list">
                  <div className="content-create-search">

                    <input
                      type="submit"
                      className="general-button register-button box1"
                      value="Registrar servicio"
                      onClick={() => {
                        navigate("/servicios");
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
                      <table class="main-table table table-bordered">
                        <thead>
                          <tr>
                            <th class="th-style text-center">ID</th>
                            <th class="th-style text-center">Nombre</th>
                            <th class="th-style text-center">Tiempo Min</th>
                            <th class="th-style text-center">Precio</th>
                            <th class="th-style text-center">Estado</th>
                            <th class="th-style th-actions text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {servicioToShow.map((servicio, index) => (
                            <tr key={servicio._id}>
                              <td className="td-style" label-item='Id'>
                                <input
                                  type="hidden"
                                  id={servicio._id}
                                  value={servicio._id}
                                />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='Nombre'>{servicio.Nombre}</td>
                              <td className="td-style" label-item='Tiempo'>{servicio.Tiempo} </td>
                              <td className="td-style" label-item='Precio'>{servicio.Precio.toLocaleString()}</td>
                              <td className="td-style" label-item='Estado'>
                                {servicio.Estado ? <p>Activo</p> : <p>Inactivo</p>}
                              </td>
                              <td className="td-style td-actions" label-item='Acciones' id="table__element__update">
                                <img
                                  className="eye"
                                  src={eye}
                                  title="Hacer clic para ver detalles"
                                  data-id={servicio._id}
                                  onClick={abrirModal}
                                />
                                {servicio.Estado ? (
                                  <Link to={`/modificarServicio?id=${servicio._id}`}>
                                    <img className="edit" src={edit} alt=""
                                      title="Hacer clic para modificar la información"
                                    />
                                  </Link>
                                ) : null}

                                {servicio.Estado ? (
                                  <img
                                    className="toggle"
                                    src={toggleGreen}
                                    alt=""
                                    onClick={() => handleToggleClick(servicio)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                ) : (
                                  <img
                                    className="toggle"
                                    src={toggleRed}
                                    alt=""
                                    onClick={() => handleToggleClick(servicio)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                )}
                                <Modal
                                  mostrarModal={mostrarModal}
                                  cerrarModal={cerrarModal}
                                  servicioSeleccionado={servicioSeleccionado}
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
                                key={pageNumber}
                                type="button"
                                className={`item-pagination ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            ))}

                            <button
                              className="item-pagination"
                              type="button"
                              disabled={endIndex >= filteredServicio.length}
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
                            onClick={handleGenerateReport}
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
      <script src="../assets/js/funcionesClientes.js"></script>
    </div>
  );
}

export default ListarServicio;

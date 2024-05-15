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

const Modal = ({ mostrarModal, cerrarModal, usuarioSeleccionado }) => {
  return mostrarModal ? (
    <div className="container_modal_usuario">

      <div className="content_modal_usuario">

        <div className="modal-usuario">
          <h4 className="text-center mb-5">{usuarioSeleccionado.Nombre}</h4>
          <div className="content_info">
            <div className="content_title">
              <text className="text_title ">Tipo Documento</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Tipo_Documento}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title">
              <text className="text_title ">Documento</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Documento}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title">
              <text className="text_title ">Nombre y Apellidos</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Nombre} {usuarioSeleccionado.Apellido}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title">
              <text className="text_title ">Telefono</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Telefono}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title">
              <text className="text_title ">Correo</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Correo}</text>
            </div>
          </div>
          <div className="content_info">
            <div className="content_title">
              <text className="text_title ">Direccion</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Direccion}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title">
              <text className="text_title">Rol</text>
            </div>

            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Rol}</text>
            </div>
          </div>
          <div className="content_info">
            <div className="content_title">
              <text className="text_title">Estado</text>
            </div>

            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Estado ? <p>Activo</p> : <p>Inactivo</p>}</text>
            </div>
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



function ListarUsu() {
  const [Usuarios, setUsuarios] = useState([]);
  const [Citas, setCitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleMostrarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  useEffect(() => {
    const urlUsuarios = "https://api-proyecto-5hms.onrender.com/api/usuario";
    const urlCitas = "https://api-proyecto-5hms.onrender.com/api/cita";

    fetch(urlUsuarios)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        setUsuarios(authors);
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(urlCitas)
      .then((resp) => resp.json())
      .then(function (data) {
        let citas = data.cita;
        setCitas(citas);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const validarCitaAgendada = (documento) => {
    const citaEncontrada = Citas.find((cita) => cita.Documento === documento);

    if (citaEncontrada && citaEncontrada.Estado === true) {
      Swal.fire({
        title: "Error",
        text: "No puedes modificar el estado porque tienes una cita agendada",
        icon: "error",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    return true;
  };

  const handleToggleClick = (usuario) => {
    const tieneCitaAgendada = validarCitaAgendada(usuario.Documento);

    if (usuario.Rol === 'Administrador') {
      Swal.fire({
        icon: "error",
        title: "Administrador",
        text: "Querido usuario, esta funcion no se puede realizar ya que no se puede cambiar el estado de un Administrador!",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    if (tieneCitaAgendada) {
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
          const updatedEstado = !usuario.Estado;

          fetch(
            `https://api-proyecto-5hms.onrender.com/api/usuario?_id=${usuario._id}`,
            {
              method: "PATCH",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...usuario, Estado: updatedEstado }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // Actualizar el estado del usuario en la lista de usuarios
              setUsuarios((prevUsuarios) =>
                prevUsuarios.map((item) =>
                  item._id === usuario._id
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
    }
  };

  //Generador de pdf

  const generatePDF = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(Usuarios);

    // Add header row
    const header = [
      "Rol",
      "Nombre",
      "Apellidos",
      "Tipo_Documento",
      "Documento",
      "Dirección",
      "Telefono",
      "Correo",
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    // Generate Excel data from the array of services
    const servicesData = Usuarios.filter((usuario) => usuario.Estado === true).map((usuario) => [
      usuario.Rol,
      usuario.Nombre,
      usuario.Apellido,
      usuario.Tipo_Documento,
      usuario.Documento,
      usuario.Direccion,
      usuario.Telefono,
      usuario.Correo,
    ]);
    XLSX.utils.sheet_add_aoa(worksheet, servicesData, { origin: "A2" });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios_Reporte");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelBlob, "Usuarios_Reporte.xlsx");
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

  const filteredInsumos = Usuarios.filter((usuario) => {
    const searchData = `${usuario.Rol} ${usuario.Nombre} ${usuario.Apellido} ${usuario.Tipo_Documento} ${usuario.Documento}
    ${usuario.Direccion} ${usuario.Telefono} ${usuario.Correo} ${usuario.Estado}`.toLowerCase();;
    return searchData.includes(searchTerm.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usuarioToShow = filteredInsumos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInsumos.length / itemsPerPage)
  const pagesToShow = 10
  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredInsumos.length / itemsPerPage);
    const currentGroup = Math.ceil(currentPage / pagesToShow);
    const startPage = (currentGroup - 1) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };
  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main">
          <DashHeader />
          <div className="container-view">
            <div className="content-view-list">
              <p className="main-title">LISTA DE USUARIOS</p>
              <div className="main-view" action="">
                <div className="container-list">
                  <div className="content-create-search">

                    <input
                      type="submit"
                      className="general-button register-button box1"
                      value="Registrar usuario"
                      onClick={() => {
                        navigate("/crearusuario");
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
                            <th className="th-style text-center">Nombre y Apellidos</th>
                            <th className="th-style text-center">Tipo_Documento</th>
                            <th className="th-style text-center">Documento</th>
                            <th className="th-style text-center">Telefono</th>
                            <th className="th-style text-center">Estado</th>
                            <th className="th-style th-actions text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarioToShow.map((usuario, index) => (
                            <tr key={usuario._id}>
                              <td className="td-style" label-item='Id'>
                                <input
                                  type="hidden"
                                  id={usuario._id}
                                  value={usuario._id}
                                />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='Nombre'>{usuario.Nombre} {usuario.Apellido}</td>
                              <td className="td-style" label-item='T. documento'  >{usuario.Tipo_Documento}</td>
                              <td className="td-style" label-item='Documento' >{usuario.Documento}</td>
                              <td className="td-style" label-item='Telefono'>{usuario.Telefono}</td>
                              <td className="td-style" label-item='Estado'>
                                {usuario.Estado ? <p>Activo</p> : <p>Inactivo</p>}
                              </td>

                              <td className="td-style td-actions" label-item='Acciones' >
                                <img
                                  className="eye"
                                  src={eye}
                                  title="Hacer clic para ver detalles"
                                  onClick={() => handleMostrarModal(usuario)}  // Aquí se actualiza al hacer clic en el icono de ojo
                                />
                                {usuario.Rol !== 'Administrador' && usuario.Estado ? (
                                  <Link to={`/modificarUsuario?id=${usuario._id}`}>
                                    <img className="edit" src={edit} alt=""
                                      title="Hacer clic para modificar la información"
                                    />
                                  </Link>
                                ) : null}

                                {usuario.Estado ? (
                                  <img
                                    className="toggle"
                                    src={toggleGreen}
                                    alt=""
                                    onClick={() => handleToggleClick(usuario)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                ) : (
                                  <img
                                    className="toggle"
                                    src={toggleRed}
                                    alt=""
                                    onClick={() => handleToggleClick(usuario)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                          <Modal
                            mostrarModal={mostrarModal ? "modal-active" : ""}
                            cerrarModal={() => setMostrarModal(false)}
                            usuarioSeleccionado={usuarioSeleccionado}
                          />
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
                              disabled={endIndex >= filteredInsumos.length}
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

export default ListarUsu;

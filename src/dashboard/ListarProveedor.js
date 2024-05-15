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
              <text className="text_title ">Nit</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Nit}</text>
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
              <text className="text_title ">Ciudad</text>
            </div>
            <div className="content_text">
              <text className="text_info">{usuarioSeleccionado.Ciudad}</text>
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


function ListarProveedor() {
  const [Proveedor, setProveedor] = useState([]); // Estado para almacenar la lista de usuarios
  const [searchTerm, setSearchTerm] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleMostrarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/proveedor";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.proveedor;
        setProveedor(authors); // Actualiza el estado con los usuarios obtenidos
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleToggleClick = (proveedor) => {
    Swal.fire({
      title: "¿Quieres cambiar el estado?",
      text: "¿Estás seguro que quieres cambiar el estado del proveedor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#212F3D",
      cancelButtonColor: "#D46146",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEstado = !proveedor.Estado;

        fetch(
          `https://api-proyecto-5hms.onrender.com/api/proveedor?_id=${proveedor._id}`,
          {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...proveedor, Estado: updatedEstado }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Actualizar el estado de la lista de proveedores
            setProveedor((prevProveedores) =>
              prevProveedores.map((item) =>
                item._id === proveedor._id
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

  //Generador de pdf

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(Proveedor);

    // Add header row
    const header = [
      "Nombre",
      "Apellido",
      "Correo",
      "Ciudad",
      "Dirección",
      "Telefono",
      "Nit",
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    // Generate Excel data from the array of services
    const servicesData = Proveedor.filter((proveedor) => proveedor.Estado === true).map((proveedor) => [
      proveedor.Nombre,
      proveedor.Apellido,
      proveedor.Correo,
      proveedor.Ciudad,
      proveedor.Dirección,
      proveedor.Telefono,
      proveedor.Nit,
    ]);
    XLSX.utils.sheet_add_aoa(worksheet, servicesData, { origin: "A2" });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Proveedor_Reporte");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelBlob, "Proveedor_Reporte.xlsx");
  };

  const handleGenerateReport = () => {
    generateExcel();
  };

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredProveedor = Proveedor.filter((proveedor) => {
    const searchData = `${proveedor.Nombre} ${proveedor.Apellido}${proveedor.Correo} ${proveedor.Ciudad}
    ${proveedor.Direccion} ${proveedor.Telefono} ${proveedor.Nit} ${proveedor.Estado}`.toLowerCase();
    return searchData.includes(searchTerm.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const proveedorToShow = filteredProveedor.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProveedor.length / itemsPerPage);
  const pagesToShow = 10;
  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredProveedor.length / itemsPerPage);
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
              <p class="main-title">LISTA DE PROVEEDORES</p>
              <div class="main-view" action="">
                <div className="container-list">
                  <div className="content-create-search">

                    <input
                      type="submit"
                      className="general-button register-button box1"
                      value="Registrar proveedor"
                      onClick={() => {
                        navigate("/proveedores");
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

                  <div class="container-table">
                    <div className="content-table">
                      <table class="main-table table table-bordered">
                        <thead>
                          <tr>
                            <th class="th-style text-center">ID</th>
                            <th class="th-style text-center">Nombre y Apellidos</th>
                            <th class="th-style text-center">Teléfono</th>
                            <th class="th-style text-center">Correo</th>
                            <th class="th-style text-center">Estado</th>
                            <th class="th-style th-actions text-center action">Acciones</th>
                          </tr>
                        </thead>

                        <tbody>
                          {proveedorToShow.map((proveedor, index) => (
                            <tr key={proveedor.id}>
                              <td className="td-style" label-item='Id'>
                                <input
                                  type="hidden"
                                  id={proveedor._id}
                                  value={proveedor._id}
                                />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='Nombre'>{proveedor.Nombre} {proveedor.Apellido}</td>
                              <td className="td-style" label-item='Telefono'>{proveedor.Telefono}</td>
                              <td className="td-style" label-item='Correo'>{proveedor.Correo}</td>
                              <td className="td-style" label-item='Estado'>
                                {proveedor.Estado ? <p>Activo </p> : <p>Inactivo </p>}
                              </td>
                              <td className="td-style td-actions" label-item='Acciones'>
                                <img
                                  className="eye"
                                  src={eye}
                                  title="Hacer clic para ver detalles"
                                  onClick={() => handleMostrarModal(proveedor)}  // Aquí se actualiza al hacer clic en el icono de ojo
                                />
                                {proveedor.Estado ? (
                                  <Link
                                    to={`/modificarProveedores?id=${proveedor._id}`}
                                  >
                                    <img className="edit" src={edit} alt=""
                                      title="Hacer clic para modificar la información"
                                    />
                                  </Link>
                                ) : null}

                                {proveedor.Estado ? (
                                  <img
                                    className="toggle"
                                    src={toggleGreen}
                                    alt=""
                                    onClick={() => handleToggleClick(proveedor)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                ) : (
                                  <img
                                    className="toggle"
                                    src={toggleRed}
                                    alt=""
                                    onClick={() => handleToggleClick(proveedor)}
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
                              disabled={endIndex >= filteredProveedor.length}
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
                            onClick={handleGenerateReport} />
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

export default ListarProveedor;

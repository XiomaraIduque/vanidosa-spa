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
import "../assets/css/modalCompras.css";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const Modal = ({ mostrarModal, cerrarModal, compraSeleccionada }) => {
  return mostrarModal ? (
    <div className="container_modal_servicio">
      <div className="content_modal_servicio">
        <div className="modal-usuario">
          <h4 className="text-center mb-3">Detalles de la compra</h4>
          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Num Factura</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{compraSeleccionada.N_factura}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Proveedor</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{compraSeleccionada.Proveedor}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Medio Pago</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{compraSeleccionada.M_pago} </text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Fecha</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{compraSeleccionada.Fecha}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Total Factura</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{compraSeleccionada.Total_factura.toLocaleString()}</text>
            </div>
          </div>

          <div className="content_info">
            <div className="content_title_descripcion">
              <text className="text_title ">Estado</text>
            </div>
            <div className="content_text_descripcion">
              <text className="text_info">{compraSeleccionada.Estado ? <p>Activo</p> : <p>Inactivo</p>}</text>
            </div>
          </div>
          <div className="modal-servicio">

            <table className="main-table table table-bordered border border-1">
              <thead>
                <tr>
                  <th className="space text-center">Nombre</th>
                  <th className="space text-center">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {compraSeleccionada &&
                  compraSeleccionada.Productos &&
                  compraSeleccionada.Productos.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.Nombre}</td>
                      <td>{producto.Cantidad}</td>
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


function ListarCompra() {
  const [Compra, setCompra] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/compra";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.compra.map((item) => ({
          ...item,
          registrationTimestamp: new Date(item.Fecha).getTime(), // Ensure this is in milliseconds
        }));
        setCompra(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const abrirModal = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    const compraSeleccionada = Compra.find((compra) => compra._id === id);
    setCompraSeleccionada(compraSeleccionada);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setCompraSeleccionada(null);
    setMostrarModal(false);
  };

  const handleToggleClick = (compra) => {
    const currentTime = Date.now();
    const registrationTime = compra.registrationTimestamp;
    const timeDifference = currentTime - registrationTime;
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

    const updatedEstado = !compra.Estado;
    if (!compra.Estado && updatedEstado) {
      Swal.fire({
        title: "No se puede cambiar el estado",
        text: "La compra ya está cancelada y no se puede volver a activar.",
        icon: "warning",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "Aceptar",
      });
      return; // No realizar la actualización
    }

    if (timeDifference < threeDaysInMilliseconds) {
      Swal.fire({
        title: "¿Quieres cambiar el estado?",
        text: "¿Estás seguro de que quieres cambiar el estado de la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#212F3D",
        cancelButtonColor: "#D46146",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedEstado = !compra.Estado;

          fetch(
            `https://api-proyecto-5hms.onrender.com/api/compra?_id=${compra._id}`,
            {
              method: "PATCH",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...compra, Estado: updatedEstado }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // Actualizar el estado de la lista de compras
              setCompra((prevCompras) =>
                prevCompras.map((item) =>
                  item._id === compra._id
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
    } else {
      // Show an error message indicating that the purchase can't be deactivated
      Swal.fire({
        title: "Error",
        text: "La compra solo se puede desactivar dentro de los 3 días de registrada.",
        icon: "error",
        confirmButtonColor: "#212F3D",
      });
    }
  };


  //Generador del pdf
  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = Compra.filter((compra) => compra.Estado === true).map((compra) => ({
      "Numero de Factura": compra.N_factura,
      "Medio de Pago": compra.M_pago,
      Fecha: compra.Fecha,
      Proveedor: compra.Proveedor,
      "Total de Compra": compra.Total_factura,
      Productos: compra.Productos.map(
        (producto) =>
          `${producto.Nombre} || Cantidad: ${producto.Cantidad} || Precio: ${producto.Precio}`
      ).join("\n"), // Concatenate multiple services with line breaks
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    const excelBuffer = XLSX.write(workbook, { type: "buffer" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Compras_Reporte.xlsx";
    link.click();
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

  const filteredCompra = Compra.filter((compra) => {
    const searchData = `${compra.N_factura} ${compra.M_pago} ${compra.Fecha} ${compra.Proveedor} ${compra.Total_factura} ${compra.Estado}`.toLowerCase();
    return searchData.includes(searchTerm.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usuarioToShow = filteredCompra.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCompra.length / itemsPerPage)
  const pagesToShow = 10;
  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredCompra.length / itemsPerPage);
    const currentGroup = Math.ceil(currentPage / pagesToShow);
    const startPage = (currentGroup - 1) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const puedeEditarCompra = (fechaCompra) => {
    const fechaRegistro = new Date(fechaCompra);
    const fechaActual = new Date();
    const diferenciaDias = (fechaActual - fechaRegistro) / (1000 * 3600 * 24);
    const puedeEditar = diferenciaDias <= 4;
    return puedeEditar;
  };

  const handleIconoEdicionClick = (compra) => {
    if (!puedeEditarCompra(compra.Fecha)) {
      Swal.fire({
        title: "Error",
        text: "No se puede modificar despues de 3 dias de la fecha de registro.",
        icon: "error",
        confirmButtonColor: "#212F3D",
      });
    } else {
      // Aquí redirige a la página de edición si es posible editar
      navigate(`/compra?id=${compra._id}`);
    }
  };


  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view-list">
              <p className="main-title">LISTA DE COMPRAS</p>
              <div className="main-view" action="">
                <div className="container-list">
                  <div className="content-create-search">

                    <input
                      type="submit"
                      className="general-button register-button box1"
                      value="Registrar compra"
                      onClick={() => {
                        navigate("/compras");
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
                            <th className="th-style text-center">N_Factura</th>
                            <th className="th-style text-center">Medio Pago</th>
                            <th className="th-style text-center">Fecha</th>
                            <th className="th-style text-center">Proveedor</th>
                            <th className="th-style text-center">Total Factura</th>
                            <th className="th-style text-center">Estado</th>
                            <th className="th-style th-actions text-center action">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarioToShow.map((compra, index) => (
                            <tr key={compra._id}>
                              <td className="td-style" label-item='Id'>
                                <input
                                  type="hidden"
                                  id={compra._id}
                                  value={compra._id}
                                />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='N_factura'>{compra.N_factura}</td>
                              <td className="td-style" label-item='M_pago'>{compra.M_pago}</td>
                              <td className="td-style" label-item='Fecha'>{compra.Fecha}</td>
                              <td className="td-style" label-item='Proveedor'>{compra.Proveedor}</td>
                              <td className="td-style" label-item='Total_factura'>{compra.Total_factura.toLocaleString()}</td>
                              <td className="td-style" label-item='Estado'>{compra.Estado ? <p>Activo</p> : <p>Inactivo</p>}</td>

                              <td className="td-style td-actions" label-item='Acciones' id="table__element__update">

                                <img
                                  className="eye"
                                  src={eye}
                                  title="Hacer clic para ver detalles"
                                  data-id={compra._id}
                                  onClick={abrirModal}
                                // onClick={() => handleMostrarModal(usuario)}  // Aquí se actualiza al hacer clic en el icono de ojo
                                />
                                {compra.Estado ? (
                                  <img
                                    className="edit"
                                    src={edit}
                                    alt=""
                                    title="Hacer clic para modificar la información"
                                    onClick={() => handleIconoEdicionClick(compra)}
                                  />
                                ) : null}

                                {compra.Estado ? (
                                  <img
                                    className="toggle"
                                    src={toggleGreen}
                                    alt=""
                                    onClick={() => handleToggleClick(compra)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                ) : (
                                  <img
                                    className="toggle"
                                    src={toggleRed}
                                    alt=""
                                    onClick={() => handleToggleClick(compra)}
                                    title="Hacer clic para cambiar el estado"
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                          <Modal
                            mostrarModal={mostrarModal}
                            cerrarModal={cerrarModal}
                            compraSeleccionada={compraSeleccionada}
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
                              disabled={endIndex >= filteredCompra.length}
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
    </div>
  );
}

export default ListarCompra;

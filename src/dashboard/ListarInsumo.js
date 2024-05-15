import toggleGreen from "../assets/img/toggle-on-green.svg";
import last from "../assets/img/chevrons-right-solid.svg";
import toggleRed from "../assets/img/toggle-off-red.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import discount from "../assets/img/discount.svg";
import DashHeader from "../components/DashHeader";
import "../assets/css/header-modal-account.css";
import DashMenu from "../components/DashMenu";
import search from "../assets/img/search.svg";
import edit from "../assets/img/edit.svg";
import "../assets/css/dash-style.css";
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const Modal = ({ mostrarModal, cerrarModal, usuarioSeleccionado }) => {
  const [cantidad, setCantidad] = useState("");
  const [cantidadValido, setCantidadValido] = useState(true);

  const url = "https://api-proyecto-5hms.onrender.com/api/insumo/descontar";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cantidad) {
      Swal.fire({
        icon: "error",
        title: "Campo vacío...",
        text: "Querido usuario, todos los campos son obligatorios.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    const cantidadADescontar = parseInt(cantidad, 10);
    const cantidadActual = parseInt(usuarioSeleccionado.Cantidad, 10);

    if (cantidadADescontar > cantidadActual) {
      Swal.fire({
        icon: "error",
        title: "Error al cantidad a descontar",
        text: "La cantidad a descontar no puede ser mayor que la cantidad actual.",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de descontar?",
      text: "Esta acción descontará insumos. ¿Deseas continuar?",
      showCancelButton: true,
      confirmButtonText: "Sí, descontar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#273746",
      cancelButtonColor: "#d46146",
    }).then((result) => {
      if (result.isConfirmed) {
        const insumo = {
          _id: usuarioSeleccionado._id,
          Cantidad: cantidad,
        };

        fetch(url, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(insumo),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Descontado con éxito",
              text: "El insumo se ha descontado correctamente.",
              // confirmButtonColor: "#28a745",
            });
            cerrarModal();
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Error al descontar",
              text: "Ocurrió un error al descontar el insumo.",
              confirmButtonColor: "#dc3545",
            });
          });
      }
    });
  };


  return mostrarModal ? (
    <div className="container_modal_usuario">

      <div className="content_modal_usuario">

        <div>
          <h4 className="text-center">Descontar Insumos</h4>
          <h5 className="text-center mb-3">{usuarioSeleccionado.Nombre}</h5>

          <div>
            <input
              className={` form-control ${cantidadValido ? "" : "campo_invalido"}`}
              type="text"
              id="cantidad"
              placeholder="Cantidad a descontar"
              min="1"
              value={cantidad || ""}
              onChange={(event) => {
                const inputValue = event.target.value;
                const numbersOnly = inputValue.replace(/\D/g, "");
                setCantidad(numbersOnly.trim() === "" ? null : numbersOnly);
                setCantidadValido(numbersOnly.trim() !== "");
              }}
            />
            {!cantidadValido && (
              <p className="error-message">La cantidad es obligatoria*</p>
            )}
          </div>

          <div className="container-compra mt-5">
            <div>
              <input
                className="btn-descontar"
                type="submit"
                value="Descontar"
                id="btnRegistrar"
                onClick={handleSubmit}
              />
            </div>
            <div>
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

function ListarInsumo() {
  const [Insumos, setInsumos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setGenerateReport] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleMostrarModal = (insumo) => {
    setUsuarioSeleccionado(insumo);
    setMostrarModal(true);
  };

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.insumo;
        setInsumos(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleToggleClick = (insumo) => {
    Swal.fire({
      title: "¿Quieres Cambiar el estado?",
      text: "¿Estás seguro de que quieres cambiar el estado del insumo?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#D46146",
      confirmButtonColor: "#212F3D",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEstado = !insumo.Estado;
        fetch(
          `https://api-proyecto-5hms.onrender.com/api/insumo?_id=${insumo._id}`,
          {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...insumo, Estado: updatedEstado }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Actualizar el estado de la lista de insumos
            setInsumos((prevInsumos) =>
              prevInsumos.map((item) =>
                item._id === insumo._id
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

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(Insumos);
  
    // Add header row
    const header = ["Nombre", "Cantidad", "Unidad de Medida"];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
  
    // Generate Excel data from the array of services
    const servicesData = Insumos.filter((insumo) => insumo.Estado === true)
      .map((insumo) => [insumo.Nombre, insumo.Cantidad, insumo.Unidad_Medida]);
    
    XLSX.utils.sheet_add_aoa(worksheet, servicesData, { origin: "A2" });
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Insumo_Reporte");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelBlob, "Insumo_Reporte.xlsx");
  };
  
 

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setGenerateReport(true);
    generateExcel();
  };

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredInsumos = Insumos.filter((insumo) => {
    const searchData = `${insumo.Nombre} ${insumo.Cantidad} ${insumo.Unidad_Medida} ${insumo.Estado}`.toLowerCase();
    return searchData.includes(searchTerm.toLowerCase());
  });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const insumosToShow = filteredInsumos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInsumos.length / itemsPerPage);

  const pagesToShow = 10;
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
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view-list">
              <p className="main-title">LISTA DE INSUMOS</p>
              <div className="main-view" action="">
                <div className="container-list">
                  <div className="content-create-search">
                    <input
                      type="submit"
                      className="general-button register-button box1"
                      value="Registrar insumo"
                      onClick={() => {
                        navigate("/insumos");
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
                            <th className="th-style text-center">Nombre</th>
                            <th className="th-style text-center">Cantidad</th>
                            <th className="th-style text-center">Unidad de Medida</th>
                            <th className="th-style text-center">Estado</th>
                            <th className="th-style th-actions text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {insumosToShow.map((insumo, index) => (
                            <tr key={insumo._id}>
                              <td className="td-style" label-item='Id'>
                                <input
                                  type="hidden"
                                  id={insumo._id}
                                  value={insumo._id}
                                />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='Nombre'>{insumo.Nombre}</td>
                              <td className="td-style" label-item='Cantidad'>{insumo.Cantidad.toLocaleString()}</td>
                              <td className="td-style" label-item='Unidad_Medida'>{insumo.Unidad_Medida}</td>
                              <td className="td-style" label-item='Estado'>
                                {insumo.Estado ? <p>Activo </p> : <p>Inactivo </p>}
                              </td>
                              <td className="td-style td-actions" label-item='Acciones'>
                                <img className="discount" src={discount} title="Clic para descontar insumo " onClick={() => handleMostrarModal(insumo)} />
                                {insumo.Estado ? (
                                  <Link to={`/modificarInsumo?id=${insumo._id}`}>
                                    <img className="edit" src={edit} alt="" title="Clic para editar" />
                                  </Link>
                                ) : null}

                                {insumo.Estado ? (
                                  <img className="toggle" src={toggleGreen} alt="" onClick={() => handleToggleClick(insumo)} title="Clic para cambiar el estado" />
                                ) : (
                                  <img className="toggle" src={toggleRed} alt="" onClick={() => handleToggleClick(insumo)} title="Clic para cambiar el estado" />
                                )}
                                <Modal
                                  mostrarModal={mostrarModal ? "modal-active" : ""}
                                  cerrarModal={() => setMostrarModal(false)}
                                  usuarioSeleccionado={usuarioSeleccionado}
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
    </div >
  );
}

export default ListarInsumo;

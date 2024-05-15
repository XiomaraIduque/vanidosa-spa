import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import DashMenu from "../components/DashMenu";
import search from "../assets/img/search.svg";
import "../assets/css/modalCompras.css";
import eye from "../assets/img/eye.svg";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const Modal = ({ mostrarModal, cerrarModal, rolSeleccionada }) => {
  return mostrarModal ? (
    <div className="container_modal_servicio">
      <div className="content_modal_servicio">
        <div className="modal-usuario">
          <h4 className="text-center mb-3">Detalles de la cita</h4>
          <h5 className="text-center mb-3">{rolSeleccionada.Nombre}</h5>

          <div className="modal-servicio">
            <table className="main-table table table-bordered">
              <thead>
                <tr>
                  <th className="space text-center">ID</th>
                  <th className="space text-center">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {rolSeleccionada &&
                  rolSeleccionada.Permisos.length > 0 &&
                  rolSeleccionada.Permisos.map((servicio, index) => (
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

function ListaRol() {
  const [Rol, setRol] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const rolUrl = "https://api-proyecto-5hms.onrender.com/api/rol";
    const usuarioUrl = "https://api-proyecto-5hms.onrender.com/api/usuario";

    fetch(rolUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.rol;
        setRol(authors);
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(usuarioUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        setUsuarios(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleToggleClick = (rol) => {
    const hasAssignedUsers = Usuarios.some(
      (usuario) => usuario.Rol === rol.Nombre && usuario.Estado === true
    );

    if (hasAssignedUsers) {
      // Si el nombre del rol está siendo utilizado por algún usuario, mostrar una alerta
      Swal.fire({
        title: "Error",
        text: "El rol no se puede desactivar porque está siendo utilizado por algún usuario",
        icon: "error",
        confirmButtonColor: "#212F3D",
        confirmButtonText: "OK",
      });
      return;
    }

    const updatedEstado = !rol.Estado;

    Swal.fire({
      title: "¿Quieres cambiar el estado?",
      text: "¿Estás seguro de que quieres cambiar el estado del rol?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#212F3D",
      cancelButtonColor: "#D46146",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://api-proyecto-5hms.onrender.com/api/rol?_id=${rol._id}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...rol, Estado: updatedEstado }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Actualizar el estado de la lista de roles
            setRol((prevRoles) =>
              prevRoles.map((item) =>
                item._id === rol._id ? { ...item, Estado: updatedEstado } : item
              )
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const [mostrarModal, setMostrarModal] = useState(false);
  const [rolSeleccionada, setRolSeleccionada] = useState(null);

  const abrirModal = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    const rolSeleccionada = Rol.find((rol) => rol._id === id);
    setRolSeleccionada(rolSeleccionada);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setRolSeleccionada(null);
    setMostrarModal(false);
  };

  //Generador del pdf
  //Generador del pdf
  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = Rol.map((rol) => ({
      "Numero de Factura": rol.Nombre,
      Permisos: rol.Permisos.map((permiso) => `${permiso.Nombre},`).join("\n"), // Concatenate multiple services with line breaks
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Permiso");

    const excelBuffer = XLSX.write(workbook, { type: "buffer" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Permiso_Reporte.xlsx";
    link.click();
  };

  const handleGenerateReport = () => {
    if (!mostrarModal) {
      generateExcel();
    }
  };


  //const navigate = useNavigate();
  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <h2 className="main-title">LISTA DE ROLES</h2>
              <div className="main-view" action="">
                <div className="container-list">
                  <div className="content-search">
                    <input
                      className="input-search form-control"
                      type="text"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <img className="search-icon" src={search} alt="" />
                  </div>

                  <div className="container-table">
                    <div className="content-table">
                      <table className="main-table table table-bordered">
                        <thead>
                          <tr>
                            <th className="th-style text-center">ID</th>
                            <th className="th-style text-center">Nombre de Rol</th>
                            <th className="th-style text-center">Permisos</th>
                            <th className="th-style text-center">Estado</th>
                            {/* {isAdminOrEmployee && (
                      <th className="space text-center">Acciones</th>
                      )} */}
                          </tr>
                        </thead>
                        <tbody>
                          {Rol.filter((rol) => {
                            const searchData =
                              `${rol.Nombre} ${rol.Estado}`.toLowerCase();
                            return searchData.includes(searchTerm.toLowerCase());
                          }).map((rol, index) => (
                            <tr key={rol._id}>
                              <td className="td-style" label-item='Id'>
                                <input type="hidden" id={rol._id} value={rol._id} />
                                {index + 1}
                              </td>
                              <td className="td-style" label-item='Nombre'>{rol.Nombre}</td>
                              <td className="td-style" label-item='Permisos'>
                                <div className="container-icon-action">
                                  <button className="show-permissions" type="reset" data-id={rol._id} onClick={abrirModal}>
                                    Ver <img className="eye" src={eye} title="Hacer clic para ver detalles" />
                                  </button>
                                  <Modal
                                    mostrarModal={mostrarModal}
                                    cerrarModal={cerrarModal}
                                    rolSeleccionada={rolSeleccionada}
                                  />
                                </div>
                              </td>
                              <td className="td-style" label-item='Estado'>{rol.Estado ? <p>Activo </p> : <p>Inactivo </p>}</td>
                              {/* {isAdminOrEmployee && !['Administrador', 'Cliente'].includes(rol.Nombre) && (
                    <td className="space text-center action">
                      {rol.Estado ? (
                        <Link to={`/modificarRol?id=${rol._id}`}>
                          <img className="edit" src={edit} alt="" />
                        </Link>
                      ) : null}
                      {rol.Estado ? (
                        <img className="toggle" src={toggleGreen} alt="" onClick={() => handleToggleClick(rol)} />
                      ) : (
                        <img className="toggle" src={toggleRed} alt="" onClick={() => handleToggleClick(rol)} />
                      )}
                    </td>
                  )} */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="container-report">
                      <div className="content-generate-report">
                        {!mostrarModal && (
                        <input
                          className="general-button report-button"
                          type="button"
                          value="Generar reporte"
                          onClick={handleGenerateReport}
                        />
                        )}
                      </div>
                    </div>

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

export default ListaRol;

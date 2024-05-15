//import CitaRegistrada from "../assets/alertas/cita/CitaRegistrada";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import delet from "../assets/img/delete.svg";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";
import Select from "react-select";

// -----------------------------------FUNCIÓN PARA EXTRAER LA FECHA--------------------------------------------------------------
function extraccionFecha() {
  const dateStr = "2023-07-30T00:00:00.000Z";
  const fecha = new Date(dateStr);

  // Obtener el año, mes y día de la fecha
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");

  // Formar la fecha en el formato 'AAAA-MM-DD'
  const fechaRecortada = `${year}-${month}-${day}`;

  return fechaRecortada;
}

function CrearCita() {


  const [Documento, setDocumento] = useState(null);
  const handleDocumentoChange = (selectedOption) => {
    if (selectedOption) {
      const usuarioEncontrado = Usuarios.find(usuario => usuario.Documento === selectedOption.value);
  
      if (usuarioEncontrado) {
        setDocumento(selectedOption.value);
        setNombre(usuarioEncontrado.Nombre);
        setApellidos(usuarioEncontrado.Apellido);
      } else {
        setDocumento("");
        setNombre("");
        setApellidos("");
      }
    }
  };
  




  const [Nombre, setNombre] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [FechaCita, setFechaCita] = useState("");
  const [HoraCita, setHoraCita] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [servicios, setServicios] = useState([]);
  const [Servicio, setServicio] = useState([]);
  const [Usuarios, setUsuarios] = useState([]);
  const [citasExistentes, setCitasExistentes] = useState([]);
  const [cantidadEmpleados, setCantidadEmpleados] = useState(0);
  const url = "https://api-proyecto-5hms.onrender.com/api/cita";

  // Declara un conjunto para almacenar servicios agregados

  //------------------------------LLAMAR LA FUNCIÓN QUE EXTRAE LA FECHA-----------------------------------------------------------------
  const fechaRecortada = extraccionFecha();

  useEffect(() => {
    const url = 'https://api-proyecto-5hms.onrender.com/api/cita';

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {

        // Recortar la fecha antes de almacenarla en el estado citasExistentes
        const formattedCitas = data.cita.map((cita) => {
          const fechaCita = cita.FechaCita.substring(0, 10); // Recorta la fecha para obtener "YYYY-MM-DD"
          return { ...cita, FechaCita: fechaCita };
        });

        setCitasExistentes(formattedCitas);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const usuarioUrl = "https://api-proyecto-5hms.onrender.com/api/usuario";

    fetch(usuarioUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        let filtrarEmpleados = authors.filter((usuario) => usuario.Estado === true && usuario.Rol === 'Empleado');
        setCantidadEmpleados(filtrarEmpleados.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [totalTiempo, setTotalTiempo] = useState(0);

  const sumarTiemposServicios = (servicios) => {
    let totalTiempo = 0;
    for (const servicio of servicios) {
      totalTiempo += servicio.Tiempo || 0;
    }
    return totalTiempo;
  };

  //------------------------------------------------- AGG SERVICIOS -----------------------------------------------------------//
  const agregarServicio = () => {
    if (!selectedServicio) {
      Swal.fire({
        icon: 'error',
        title: 'Campo tipo de servicio...',
        text: 'Querido usuario, debes seleccionar un tipo de servicio válido!',
        confirmButtonColor: '#212F3D',
      });
      return;
    }
    const nuevoTiempoTotal = totalTiempo + (selectedServicio.Tiempo || 0);
    if (servicios.some((servi) => servi.Nombre === selectedServicio.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Servicio duplicado...',
        text: 'Querido usuario, este servicio ya está en la lista!',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    const nuevaServicio = {
      Id: selectedServicio.value,
      Nombre: selectedServicio.label,
      Tiempo: selectedServicio.Tiempo,
    };

    const nuevoServicios = [...servicios, nuevaServicio];
    setServicios(nuevoServicios);
    setTotalTiempo(nuevoTiempoTotal);
    console.log(nuevaServicio);
    setSelectedServicio(null);
  };

  const opcionesServicio = Servicio.map((servicio, index) => ({
    value: servicio.Nombre,
    label: servicio.Nombre,
    Tiempo: servicio.Tiempo || 0,  // Incluye el tiempo del servicio
  }));

  //------------------------------VALIDAR CITA EXISTENTE-----------------------------------------------------------------------
  const verificarDisponibilidadCita = () => {
    // Obtener la hora de inicio y fin de la cita actual
    const horaCitaDate = new Date(`${FechaCita}T${HoraCita}`);
    const totalTiempoServicios = sumarTiemposServicios(servicios);
    const horaFinCitaDate = new Date(horaCitaDate.getTime() + totalTiempoServicios * 60000);

    // Verificar si hay citas en el rango de horaCita y horaFinCita
    const citasEnRango = citasExistentes.filter(cita =>
      cita.FechaCita === FechaCita && cita.Estado === true &&
      (
        (horaCitaDate >= new Date(`${cita.FechaCita}T${cita.HoraCita}`) &&
          horaCitaDate <= new Date(`${cita.FechaCita}T${cita.Fincita}`)) ||
        (horaFinCitaDate >= new Date(`${cita.FechaCita}T${cita.HoraCita}`) &&
          horaFinCitaDate <= new Date(`${cita.FechaCita}T${cita.Fincita}`)) ||
        (horaCitaDate <= new Date(`${cita.FechaCita}T${cita.HoraCita}`) &&
          horaFinCitaDate >= new Date(`${cita.FechaCita}T${cita.Fincita}`))
      )

    );

    if (citasEnRango.length >= cantidadEmpleados) {
      return 'noEmpleados'; // No hay empleados disponibles para este horario
    }

    return 'disponible'; // El horario está disponible
  };

  const maximoCitas = () => {
    // Verificar si hay una cita existente con la misma fecha y hora
    const cantidadCitasMismaHora = citasExistentes.filter(cita =>
      cita.FechaCita === FechaCita && cita.HoraCita === HoraCita && cita.Documento === Documento && cita.Estado === true
    ).length;

    return cantidadCitasMismaHora > 0;
  };

  const clienteTieneCitaActiva = (documento, fecha) => {
    const horaActual = new Date();

    return citasExistentes.some(cita =>
      cita.Documento === documento &&
      cita.FechaCita === fecha &&
      new Date(`${fecha}T${cita.Fincita}`) > horaActual
    );
  };



  const verificarHorariosValidos = () => {
    const horaCita = new Date(`${FechaCita}T${HoraCita}`);
    const tiempoTotalServicios = sumarTiemposServicios(servicios);
    const horaFinCita = new Date(horaCita.getTime() + tiempoTotalServicios * 60000);

    // Comparar horarios con las restricciones
    if (
      horaCita.getHours() < 8 || // Antes de las 8 AM
      horaFinCita.getHours() > 22 || // Después de las 10 PM
      horaFinCita.getHours() === 22 && horaFinCita.getMinutes() > 0 // Finalización después de las 10 PM
    ) {
      return false;
    }
    return true;
  };

  //--------------------------------------------------------------------------------------------------------------//

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!Documento || !Nombre || !Apellidos || !FechaCita || !HoraCita || !Descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío...',
        text: 'Querido usuario, todos los campos son obligatorios.',
        confirmButtonColor: '#212F3D'
      });
      return;
    }

    
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);
  
    if (FechaCita < formattedCurrentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Fecha inválida...',
        text: 'No se puede agendar una cita en una fecha anterior a la actual.',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    // Verificar disponibilidad de cita
    const isCitaExistente = verificarDisponibilidadCita();


    if (isCitaExistente === 'noEmpleados') {
      Swal.fire({
        icon: "error",
        title: "Cita no disponible...",
        text: "No hay empleados disponibles en esa hora. Por favor, elige otra hora.",
        confirmButtonColor: "#212F3D",
      });
      return;

    } else if (isCitaExistente === 'enRangoOcupado') {
      Swal.fire({
        icon: "error",
        title: "Hora no disponible...",
        text: "La hora que has elegido se encuentra ocupada por otra cita. Por favor, elige otra hora.",
        confirmButtonColor: "#212F3D",
      });
      return;
    }


    const tieneCitaActiva = clienteTieneCitaActiva(Documento, FechaCita);
    if (tieneCitaActiva) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede agendar otra cita...',
        text: 'Ya tiene una cita agendada para este día y la hora aún no ha pasado.',
        confirmButtonColor: '#212F3D',
      });
      return;
    }



    if (!verificarHorariosValidos()) {
      Swal.fire({
        icon: 'error',
        title: 'Horario inválido...',
        text: 'El horario seleccionado está fuera del horario permitido (8 AM - 10 PM).',
        confirmButtonColor: '#212F3D',
      });
      return;
    }


    if (servicios.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Servicio nulo...",
        text: "Querido usuario debe agregar al menos un servicio!",
        confirmButtonColor: "#212F3D",
      });
      return;
    }
    const isCitaMaximo = maximoCitas();


    if (isCitaMaximo) {
      Swal.fire({
        icon: "error",
        title: "Maximo de citas...",
        text: "Solo se puede registrar una cita el mismo dia y a la misma hora",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    const totalTiempoServicios = sumarTiemposServicios(servicios);

    const horaCitaDate = new Date(`${FechaCita}T${HoraCita}`);
    const horaFinCitaDate = new Date(horaCitaDate.getTime() + totalTiempoServicios * 60000);

    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    const finCita = horaFinCitaDate.toLocaleTimeString('es-ES', options);

    const cita = {
      Documento: Documento,
      Nombre: Nombre,
      Apellidos: Apellidos,
      Servicios: servicios, // Aquí se asigna el array de servicios seleccionados
      FechaCita: FechaCita,
      HoraCita: HoraCita,
      Fincita: finCita,
      Descripcion: Descripcion,
    };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cita),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hacer algo con la respuesta del servidor
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita registrada con exito!',
          showConfirmButton: false,
          timer: 1500
      }).then(() => {
          navigate('/listaCita');
      })
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error("Error:", error);
      });
  };

  // --------------------------------------------------- ARRAY SERVICIOS -------------------------------------------------------//

  useEffect(() => {
    const servicioUrl = "https://api-proyecto-5hms.onrender.com/api/servicio";
    const usuarioUrl = "https://api-proyecto-5hms.onrender.com/api/usuario";

    fetch(servicioUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.servicio;
        let filtrarInsumos = authors.filter((servicio) => servicio.Estado === true);
        setServicio(filtrarInsumos);
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(usuarioUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.Usuarios;
        let filtrarUsuarios = authors.filter((usuario) => usuario.Estado === true && usuario.Rol === 'Cliente');;
        setUsuarios(filtrarUsuarios);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //------------------------------------------------------ELIMINAR SERVICIO ---------------------------------------------------------------//

  const eliminarServicio = (index) => {
    const nuevoServicios = [...servicios];
    nuevoServicios.splice(index, 1);
    setServicios(nuevoServicios);

  };

  //Funciona para que no se elija una fecha anterio al día en el que esta y para que no la pueda elejir con mas de 15 dias
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15)
    .toISOString()
    .split('T')[0];




  const navigate = useNavigate()
  // const mostrarAlerta = CitaRegistrada();

  const [selectedServicio, setSelectedServicio] = useState(null);


  const handleServicioChange = (selectedServicio) => {
    setSelectedServicio(selectedServicio);

  };

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p className="main-title">AGENDAR CITA</p>
              <form className="main-view" id="formulario">
                <div className="container-fields">
                  <div className="content-label-input">
                    <Select
                      value={Documento ? { value: Documento, label: Documento } : null}
                      onChange={handleDocumentoChange}
                      options={Usuarios.map((usuario, index) => ({
                        value: usuario.Documento,
                        label: usuario.Documento,
                      }))}
                      placeholder="Documento"
                    />
                  </div>
                  <div className="content-label-input">
                    <input
                      className="general-input form-control"
                      type="text"
                      id="nombre"
                      placeholder="Nombre"
                      value={Nombre}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const onlyLetters = inputValue.replace(
                          /[^A-Za-zñÑ\s]/g,
                          ""
                        );
                        setNombre(onlyLetters);
                      }}
                      disabled
                    />
                    {/* <input  type="text" id="nombre" /> */}
                  </div>
                  <div className="content-label-input">
                    <input
                      className="general-input form-control"
                      type="text"
                      id="apellido"
                      placeholder="Apellido"
                      value={Apellidos}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const onlyLetters = inputValue.replace(
                          /[^A-Za-zñÑ\s]/g,
                          ""
                        );
                        setApellidos(onlyLetters);
                      }}
                      disabled
                    />
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Fecha</label>
                    <input
                      className="general-input form-control"
                      type="date"
                      placeholder="Fecha de Cita"
                      id="fechaCita"
                      value={FechaCita}
                      min={formattedToday}
                      max={maxDate}
                      // min={fechaRecortada} // Agregar el atributo min
                      onChange={(event) => setFechaCita(event.target.value)}
                    />
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Hora</label>
                    <input
                      className="general-input form-control"
                      id="horaCita"
                      type="time"
                      placeholder="Hora"
                      onChange={(event) => setHoraCita(event.target.value)}
                    />
                  </div>

                  <div className="content-label-input">
                    <Select
                      className='input_select input_agendar custom-select'
                      value={selectedServicio}
                      onChange={handleServicioChange}
                      options={opcionesServicio}  // Aquí se utiliza opcionesServicio
                      placeholder="Selecciona un servicio"
                    />

                  </div>

                  <div className="content-observations">
                    <label className="label-description">Descripción</label>
                    <textarea
                      className="observations form-control"
                      name=""
                      id="descripcion"
                      cols="30"
                      rows="10"
                      value={Descripcion || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const onlyLetters = inputValue.replace(
                          /[^A-Za-zñÑ\s]/g,
                          ""
                        );
                        setDescripcion(
                          onlyLetters.trim() === "" ? null : onlyLetters
                        );
                      }}
                    ></textarea>
                  </div>

                </div>

                <div class="container-button pb-4">
                  <div className="content-button">
                    <input
                      className="general-button add-button"
                      type="button"
                      onClick={agregarServicio}
                      id="btnRegistrar"
                      value="Agregar servicio"
                    />
                  </div>
                </div>

                <div className="container-table-item">
                  <div className="content-table">
                    <table class="main-table table table-bordered">
                      <thead>
                        <tr>
                          <th className="th-style text-center">ID</th>
                          <th className="th-style text-center">Servicios de la cita</th>
                          <th className="th-style text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicios.map((servi, index) => (
                          <tr key={index}>
                            <td className="td-style" >{index + 1}</td>
                            <td className="td-style" >{servi.Nombre}</td>
                            <td className="td-style" >
                              <div className="container-delete-icon">
                                <button className="delete-button" onClick={() => eliminarServicio(index)}>
                                  <img className="delete-icon" src={delet} alt="" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="container-button">
                  <div className="content-button">
                    <input
                      type="submit"
                      className="general-button cancel-button"
                      value="Cancelar"
                      onClick={() => {
                        navigate("/listaCita");
                      }}
                    />
                    <input
                      className="general-button clean-button"
                      type="reset"
                      value="Limpiar"
                    />
                    <input
                      id="registrar"
                      className="general-button submit-button"
                      type="submit"
                      onClick={handleSubmit}
                      value="Agendar"
                    // disabled={maximoCitas()}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearCita;

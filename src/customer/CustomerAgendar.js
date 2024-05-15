//import AgendarExito from '../assets/alertas/agendar/exitoAgendar'
import CustomerHeader from "../components/CustomerHeader";
import CustomerFooter from "../components/CustomerFooter";
import React, { useState, useEffect } from "react";
import whatsapp from '../assets/img/whatsapp.svg';
import { useLocation } from "react-router-dom";
import '../assets/css/customer-citas.css'
import Swal from "sweetalert2";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
function Agendar() {

  const location = useLocation();
  const [addedServices, setAddedServices] = useState(new Set());
  const [rol, setRol] = useState('');
  const [Documento, setDocumento] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [FechaCita, setFechaCita] = useState('');
  const [HoraCita, setHoraCita] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [servicios, setServicios] = useState([]);
  const [Servicio, setServicio] = useState([]);
  const [Usuarios, setUsuarios] = useState([]);
  const [citasExistentes, setCitasExistentes] = useState([]);
  const [cantidadEmpleados, setCantidadEmpleados] = useState(0);
  const url = 'https://api-proyecto-5hms.onrender.com/api/cita';



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

  useEffect(() => {
    const usuarioId = localStorage.getItem('_id') || null;
    const usuarioUrl = 'https://api-proyecto-5hms.onrender.com/api/usuario';
    const servicioUrl = 'https://api-proyecto-5hms.onrender.com/api/servicio';

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
        let filtrarUsuarios = authors.filter((usuario) => usuario.Estado === true && usuario.Rol === 'Cliente');
        setUsuarios(filtrarUsuarios);

        let filteredUsuario = authors.find((usuario) => usuario._id === usuarioId);
        if (filteredUsuario && filteredUsuario.Rol === 'Cliente') {
          setRol(filteredUsuario.Rol);
          setNombre(filteredUsuario.Nombre);
          setApellidos(filteredUsuario.Apellido);
          setDocumento(filteredUsuario.Documento);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [selectedServicio, setSelectedServicio] = useState(null);


  const handleServicioChange = (selectedServicio) => {
    setSelectedServicio(selectedServicio);

  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const servicioParam = searchParams.get('servicio');

    if (servicioParam) {
      const selectedServicio = Servicio.find((servicio) => servicio.Nombre === servicioParam);

      if (selectedServicio) {
        const serviceAdded = addedServices.has(servicioParam);

        if (!serviceAdded) {
          const nuevoTiempoTotal = totalTiempo + (selectedServicio.Tiempo || 0);
          setServicios((prevServicios) => [
            ...prevServicios,
            { Nombre: servicioParam, Tiempo: selectedServicio.Tiempo || 0 },
          ]);
          setTotalTiempo(nuevoTiempoTotal);  // Agrega esta línea para actualizar el tiempo total
          setAddedServices(new Set([...addedServices, servicioParam]));
        }
      }
    }
  }, [location, Servicio, addedServices]);


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

  const [totalTiempo, setTotalTiempo] = useState(0);

  const sumarTiemposServicios = (servicios) => {
    let totalTiempo = 0;
    for (const servicio of servicios) {
      totalTiempo += servicio.Tiempo || 0;
    }
    return totalTiempo;
  };


  const agregarServicio = () => {
    if (!selectedServicio || !selectedServicio.value) {
      Swal.fire({
        icon: 'error',
        title: 'Campo tipo de servicio...',
        text: 'Por favor, selecciona un tipo de servicio válido.',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    if (servicios.some((servi) => servi.Nombre === selectedServicio.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Servicio duplicado...',
        text: 'El servicio seleccionado ya está en la lista.',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    const nuevoTiempoTotal = totalTiempo + (selectedServicio.Tiempo || 0);

    const nuevaServicio = {
      Id: selectedServicio.value,
      Nombre: selectedServicio.value,
      Tiempo: selectedServicio.Tiempo || 0,  // Incluye el tiempo del servicio
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

  const [citaRegistrada, setCitaRegistrada] = useState(false);

  const clienteTieneCitaActiva = (documento, fecha) => {
    const horaActual = new Date();

    return citasExistentes.some(cita =>
      cita.Documento === documento &&
      cita.FechaCita === fecha &&
      new Date(`${fecha}T${cita.Fincita}`) > horaActual
    );
  };


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!Documento || !Nombre || !Apellidos || !FechaCita || !HoraCita || !Descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío...',
        text: 'Querido usuario, todos los campos son obligatorios.',
        confirmButtonColor: '#212F3D',
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


    if (citaRegistrada) {
      Swal.fire({
        icon: "info",
        title: "Cita ya registrada",
        text: "La cita ya ha sido registrada anteriormente.",
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

    // Verificar disponibilidad de cita

    const isCitaMaximo = maximoCitas();


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

    if (isCitaMaximo) {
      Swal.fire({
        icon: "error",
        title: "Maximo de citas...",
        text: "Solo se puede registrar una cita el mismo dia y a la misma hora",
        confirmButtonColor: "#212F3D",
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
        icon: 'error',
        title: 'Servicio nulo...',
        text: 'Querido usuario debe agregar al menos un servicio!',
        confirmButtonColor: '#212F3D',
      });
      return;
    }

    const totalTiempoServicios = sumarTiemposServicios(servicios);
    const horaCitaDate = new Date(`${FechaCita}T${HoraCita}`);
    const horaFinCitaDate = new Date(horaCitaDate.getTime() + totalTiempoServicios * 60000);
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    const finCita = horaFinCitaDate.toLocaleTimeString('es-ES', options);

    const cita = {
      Rol: rol,
      Documento: Documento,
      Nombre: Nombre,
      Apellidos: Apellidos,
      Servicios: servicios,
      FechaCita: FechaCita,
      HoraCita: HoraCita,
      Fincita: finCita,
      Descripcion: Descripcion,
    };

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cita),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita registrada con exito!',
          showConfirmButton: false,
          timer: 1500
      }).then(() => {
          navigate('/Citas');
      })

      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setCitaRegistrada(true);
  };

  const eliminarServicio = (index) => {
    const nuevoServicios = [...servicios];
    nuevoServicios.splice(index, 1);
    setServicios(nuevoServicios);
  };

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 15
  )
    .toISOString()
    .split("T")[0];

  // const mostrarAlerta = AgendarExito();

  // ---------------------------------Código de redirección a Whatsapp con mensaje personalizado---------------------------------
  const phoneWhatsApp = '3117794075';
  const message = 'Bienvenido a Vanidosa SPA, ¿cómo podemos ayudarte?';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneWhatsApp}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      <CustomerHeader />
      <main>
        <div className='container_agendar'>
          <div className="cuadro_citas">
            <h2>AGENDA TU CITA</h2>
            <form id="formulario" className="input-inicio">
              <select type="number" placeholder="Documento Usuario"
                className='input_agendar'
                id="Documento"
                value={Documento || ""}
                onChange={(event) => setDocumento(event.target.value)}
                disabled
              >
                <option defaultValue>Documento Cliente</option>
                {Usuarios.length > 0 &&
                  Usuarios.map((usuario, index) => {
                    return (
                      <option key={index}>{usuario.Documento}</option>
                    );
                  })}
              </select><br />

              <input type="text" className='input_agendar' placeholder="Nombre"
                id="nombre"
                value={Nombre || ""}
                readOnly
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const onlyLetters = inputValue.replace(/[^A-Za-zñÑ\s]/g, '');
                  setNombre(onlyLetters)
                }}
              /> <br />
              <input type="text" className='input_agendar' placeholder="Apellidos"
                id="apellidos"
                value={Apellidos || ""}
                readOnly
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const onlyLetters = inputValue.replace(/[^A-Za-zñÑ\s]/g, '');
                  setApellidos(onlyLetters)
                }}
              /> <br />
              <input type="date" className='input_agendar' placeholder="Fecha de Cita"
                id="fechaCita"
                value={FechaCita || ""}
                min={formattedToday}
                max={maxDate}
                onChange={(event) => setFechaCita(event.target.value)}
              /><br />

              <input type="time" className='input_agendar' placeholder="Hora Cita"
                id="horaCita"
                onChange={(event) => setHoraCita(event.target.value)}
              /><br />

              <input type="text" className='input_agendar' id="observaciones" placeholder=" Observaciones: Ej     Soy alergica a la base vogue"
                value={Descripcion || ""}
                onChange={(event) => setDescripcion(event.target.value)}
              /><br />


              <Select
                className='input_select input_agendar custom-select'
                value={selectedServicio}
                onChange={handleServicioChange}
                options={opcionesServicio}  // Aquí se utiliza opcionesServicio
                placeholder="Selecciona un servicio"
              />
              <br />

              <div>
                <div className="content_agregar">
                  <input className="bnt-agregar" type="button" onClick={agregarServicio} id="btnRegistrar" value="Agregar producto" />
                </div>
              </div>

              <div className="boton-citas">
                <h5>Servicios seleccionados</h5>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <table className="main-table-cita table table-bordered" style={{ fontSize: "14px", width: "50%" }}>
                    <thead>
                      <tr>
                        <th className="space text-center">ID</th>
                        <th className="space text-center">Servicio</th>
                        <th className="space text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicios.map((servi, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{servi.Nombre}</td>
                          <td>
                            <button className="btn_eliminar" onClick={() => eliminarServicio(index)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='content_registar'>
                  <button className="bnt-loguear" id="registrar" type="submit" value="Registrar" onClick={handleSubmit}>
                    AGENDAR
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <a className="Link-whatsapp d-flex justify-content-center" onClick={handleWhatsAppClick}>
          <img src={whatsapp} alt="" style={{ width: "36px" }} />
        </a>
      </main>
      <CustomerFooter />
    </>
  );
}


export default Agendar;
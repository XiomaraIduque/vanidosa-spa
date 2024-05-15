import cancelacionEditar from "../assets/alertas/servicio/cancelacionEditar";
import modificarExito from "../assets/alertas/servicio/modificarExito";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import FormData from "form-data";
import Swal from "sweetalert2";


function ModificarServicio() {
  const urlParams = new URLSearchParams(window.location.search);
  const servicioId = urlParams.get("id");

  const [Nombre, setNombre] = useState("");
  const [Tiempo, setTiempo] = useState("");
  const [Precio, setPrecio] = useState(15000);
  const [Descripcion, setDescripcion] = useState("");

  // const [Insumos, setInsumos] = useState([]);
  // const [productos, setProductos] = useState([]);

  // useEffect(() => {
  //   const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then(function (data) {
  //       let authors = data.insumo;
  //       let filtrarInsumos = authors.filter((insumo) => insumo.Estado === true);
  //       setInsumos(filtrarInsumos);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // const agregarCompra = (e) => {
  //   e.preventDefault();
  //   const productoElement = document.getElementById("producto");
  //   const cantidadElement = document.getElementById("cantidad");

  //   const Nombre = productoElement.value;
  //   const Cantidad = parseInt(cantidadElement.value);

  //   if (!Nombre) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Campo insumo...",
  //       text: "Querido usuario el campo Insumo es obligatorio!",
  //       confirmButtonColor: "#212F3D",
  //     });
  //     return;
  //   } else if (Cantidad <= 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Numero invalido...",
  //       text: 'Querido usuario los campos de "Cantidad" y "Precio" tienen que ser valores positivos!',
  //       confirmButtonColor: " #212F3D",
  //     });
  //     return;
  //   }

  //   const nuevoProducto = {
  //     Nombre,
  //     Cantidad,
  //   };

  //   const nuevosProductos = [...productos, nuevoProducto];
  //   setProductos(nuevosProductos);
  //   productoElement.selectedIndex = 0;
  //   cantidadElement.value = "";
  //   console.log("Los productos que hay en el array", productos);
  // };

  // const eliminarProducto = (_id) => {
  //   const nuevosProductos = productos.map((producto) => {
  //     if (producto._id === _id) {
  //       return {
  //         ...producto,
  //         eliminar: true,
  //       };
  //     }
  //     return producto;
  //   });
  //   setProductos(nuevosProductos);
  // };

  const handleChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!Nombre || !Descripcion || !Tiempo) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario todos los campos son obligatorios!",
        confirmButtonColor: " #212F3D",
      });
      return;
    }

    const data = new FormData();
    data.append("_id", servicioId);
    data.append("Nombre", Nombre);
    data.append("Tiempo", Tiempo);
    data.append("Precio", Precio);
    data.append("Descripcion", Descripcion);
    data.append("imagen", Imagen);
    // data.append("Productos", JSON.stringify(productos));


    const url = "https://api-proyecto-5hms.onrender.com/api/servicio";

    fetch(url, {
      method: "PUT",
      mode: "cors",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // Hacer algo con la respuesta del servidor
        console.log(data);
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error("Error:", error);
      });
  };

  const [ServicioInicial, setServicioInicial] = useState(null);
  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/servicio";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.servicio;
        let filteredServicio = authors.filter(
          (servicio) => servicio._id === servicioId
        );
        setServicioInicial(filteredServicio[0]); // Establecer los valores iniciales de Servicios
        setNombre(filteredServicio[0].Nombre);
        setTiempo(filteredServicio[0].Tiempo);
        setPrecio(filteredServicio[0].Precio);
        setDescripcion(filteredServicio[0].Descripcion);
        // setProductos(filteredServicio[0].Productos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  // ---------------------Función "Input tipo file" para cargar imagen---------------------
  const [Imagen, setImagen] = useState(null);

  const [nombreArchivo, setNombreArchivo] = useState('Ningún archivo seleccionado');

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImagen(selectedFile);
      setNombreArchivo(selectedFile.name); // Actualiza el nombre del archivo
    } else {
      setImagen(null);
      setNombreArchivo('Ningún archivo seleccionado'); // Si se deselecciona el archivo
    }
  };
  // --------------------------------------------------------------------------------------

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p class="main-title">MODIFICAR SERVICIO</p>
              <form className="main-view" id="formulario" onSubmit={handleSubmit} action="" oninput="resultado.value=rango.value">
                {ServicioInicial && (
                  <div className="container-fields">
                    <div className="content-label-input">
                      <label htmlFor="nombre">Nombre del servicio</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="nombre"
                        value={Nombre || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const onlyLetters = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setNombre(onlyLetters.trim() === "" ? null : onlyLetters);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="tiempo">Tiempo del Servicio</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="tiempo"
                        placeholder="En minutos"
                        value={Tiempo || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const numbersOnly = inputValue.replace(/\D/g, "");
                          setTiempo(numbersOnly.trim() === "" ? null : numbersOnly);
                        }}
                      />

                    </div>

                    <div className="content-label-input">
                      <label htmlFor="">Precio</label>
                      <label htmlFor="rango">15.000</label>
                      <input
                        type="range"
                        id="rango"
                        name="rango"
                        value={Precio}
                        min={15000}
                        max={450000}
                        onChange={handleChange}
                      />
                      {/* <label htmlFor="rango">450.000</label> */}

                      <p>Precio seleccionado: ${Precio}</p>
                    </div>

                    {/* -------------------------Contenedor "Input tipo file" para seleccionar imagen------------------------- */}
                    <div className="container-input-image">
                      <label className="label-image">Imagen</label>
                      <input className="input-image" type="file" id="archivo" accept="image/*" onChange={handleImageChange} />
                      <label className="replace-input-image" htmlFor="archivo">
                        <span className="select-file" accept="image/*">Seleccione archivo</span>
                        <span className="any-file">{nombreArchivo}</span>
                      </label>
                    </div>
                    {/* ------------------------------------------------------------------------------------------------------ */}


                    <div className="content-observations mb-3">
                      <label htmlFor="descripcion">Descripción</label>
                      <textarea
                        className="observations form-control"
                        id="descripcion"
                        value={Descripcion || ""}
                        onChange={(event) => setDescripcion(event.target.value)}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </div>


                    {/* <div className="content-label-input">
                  <label htmlFor="">Insumo</label>
                  <input
                    className="general-input-compras form-select"
                    id="producto"
                    placeholder="Producto"
                    list="list_productos"
                  />

                  <datalist id="list_productos">
                    {Insumos.length > 0 &&
                      Insumos.map((insumo, index) => (
                        <option key={index}>{insumo.Nombre}</option>
                      ))}
                  </datalist>
                </div>

                <div className="content-label-input">
                  <label htmlFor="">Cantidad</label>
                  <input
                    className="general-input-compras form-control"
                    type="number"
                    id="cantidad"
                    min="1"
                  />
                </div> */}
                  </div>
                )}
                {/* <div className="content-button d-flex justify-content-center">
              <div className="content-send-clear">
                <button className="add-product" onClick={agregarCompra}>
                  Agregar insumo
                </button>
              </div>
            </div> */}

                {/* <div className="content-table">
              <table className="main-table table table-bordered">
                <thead>
                  <tr>
                    <th className="space text-center">ID</th>
                    <th className="space text-center">Insumos</th>
                    <th className="space text-center">Cantidad</th>
                    <th className="space text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(
                    (producto, index) =>
                      !producto.eliminar && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{producto.Nombre}</td>
                          <td>{producto.Cantidad}</td>
                          <td>
                            <button
                              className="clear-button"
                              onClick={() => eliminarProducto(producto._id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table> */}
                {/* </div> */}

                <div class="container-button">
                  <div className="content-button">
                    <input
                      className="general-button cancel-button"
                      onClick={cancelacionEditar}
                      type="reset"
                      value="Cancelar"
                    />
                    <input
                      id="registrar"
                      onClick={modificarExito}
                      className="general-button submit-button"
                      type="submit"
                      value="Modificar"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <script src="../assets/js/funcionesClientes.js"></script>
      <script src="../assets/js/ValidarServicios.js"></script>
    </div>
  );
}

export default ModificarServicio;

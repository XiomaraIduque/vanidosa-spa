import alertasServicio from "../assets/alertas/servicio/alertaServicio";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function CrearServicio() {
  const [, setServicio] = useState([]);
  const [Nombre, setNombre] = useState('');
  const [NombreValido, setNombreValido] = useState(true);
  const [Tiempo, setTiempo] = useState('');
  const [TiempoValido, setTiempoValido] = useState(true);
  const [Precio, setPrecio] = useState(15000);
  const [Descripcion, setDescripcion] = useState('');
  const [DescripcionValido, setDescripcionValido] = useState(true);

  useEffect(() => {
    const url = 'https://api-proyecto-5hms.onrender.com/api/servicio';

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.servicio;
        setServicio(authors);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   const url = 'https://api-proyecto-5hms.onrender.com/api/insumo';

  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then(function (data) {
  //       let authors = data.insumo;
  //       let filtrarInsumos = authors.filter((insumo) => insumo.Estado === true && insumo.Cantidad >= 1);
  //       setInsumos(filtrarInsumos);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const handleChange = (event) => {
    setPrecio(event.target.value);
  };

  // const agregarCompra = (e) => {
  //   e.preventDefault();
  //   const productoElement = document.getElementById("producto");
  //   const cantidadElement = document.getElementById("cantidad");

  //   const Nombre = productoElement.value;
  //   const Cantidad = parseInt(cantidadElement.value);

  //   if (!Nombre) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Campo insumo...',
  //       text: 'Querido usuario el campo Insumo es obligatorio!',
  //       confirmButtonColor: '#212F3D'
  //     });
  //     return;
  //   }

  //   if (Cantidad <= 0) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Numero invalido...',
  //       text: 'Querido usuario los campos de "Cantidad"  tienen que ser valores superior a 0!',
  //       confirmButtonColor: ' #212F3D'
  //     });
  //     return;
  //   }

  //   const nuevaCompra = {
  //     Nombre,
  //     Cantidad
  //   };

  //   const nuevasCompras = [...compras, nuevaCompra];
  //   setCompras(nuevasCompras);
  //   productoElement.selectedIndex = 0;
  //   cantidadElement.value = "";
  // };

  // const eliminarCompra = (index) => {
  //   const nuevasCompras = [...compras];
  //   nuevasCompras.splice(index, 1);
  //   setCompras(nuevasCompras);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!Nombre || !Descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Campo vacio...',
        text: 'Querido usuario todos los campos son obligatorios!',
        confirmButtonColor: ' #212F3D'
      })
      return;
    }

    // const servicio = {
    //   Nombre: Nombre,
    //   Tiempo: Tiempo,
    //   Precio : Precio,
    //   Descripcion: Descripcion,
    //   Imagen : Imagen,
    //   Productos : compras,
    // }

    const formData = new FormData();
    formData.append('Nombre', Nombre);
    formData.append('Tiempo', Tiempo);
    formData.append('Precio', Precio);
    formData.append('Descripcion', Descripcion);
    formData.append('imagen', Imagen);

    // compras.forEach((compra, index) => {
    //   formData.append(`Productos[${index}].Nombre`, compra.Nombre);
    //   formData.append(`Productos[${index}].Cantidad`, compra.Cantidad);
    // });
    // const comprasString = JSON.stringify(compras);
    // formData.append('compras', comprasString);


    const url = 'https://api-proyecto-5hms.onrender.com/api/servicio';

    fetch(url, {
      method: 'POST',
      mode: "cors",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const resetFields = () => {
    setNombre('');
    setTiempo('');
    setPrecio(15000);
    setDescripcion('');
  };

  const handleClear = () => {
    resetFields();
  };

  const navigate = useNavigate();
  const mostrarAlerta = alertasServicio();

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
              <p className="main-title">CREAR SERVICIO</p>
              <form className="main-view" id="formulario" onSubmit={handleSubmit}>
                <div className="container-fields">
                  <div className="content-label-input">
                    <label htmlFor="nombre">Nombre del servicio</label>
                    <input
                      className={`general-input form-control ${NombreValido ? "" : "campo_invalido"}`}
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
                        setNombreValido(onlyLetters.trim() !== "");
                      }}
                    />
                    {!NombreValido && (
                      <p className="error-message">El nombre es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="tiempo">Tiempo del Servicio</label>
                    <input
                      className={`general-input form-control  ${NombreValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="tiempo"
                      placeholder="En minutos"
                      value={Tiempo || ""}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const numbersOnly = inputValue.replace(/\D/g, "");
                        const trimmedInput = numbersOnly.substring(0, 3); // Limitar a tres caracteres
                        setTiempo(trimmedInput.trim() === "" ? null : trimmedInput);
                        setTiempoValido(trimmedInput.trim() !== "");
                      }}
                    />
                    {!TiempoValido && (
                      <p className="error-message">El tiempo es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="rango">Precio</label>
                    <input
                      type="range"
                      id="rango"
                      name="rango"
                      value={Precio}
                      min={15000}
                      max={450000}
                      onChange={handleChange}
                    />
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
                      className={`observations form-control ${DescripcionValido ? " " : "campo_invalido"}`}
                      id="descripcion"
                      value={Descripcion || ""}
                      onChange={(event) => {
                        setDescripcion(event.target.value);
                        setDescripcionValido(event.target.value.trim() !== "");
                      }}
                      cols="30"
                      rows="10"
                    ></textarea>
                    {!DescripcionValido && (
                      <p className="error-message">La descripción es obligatoria*</p>
                    )}
                  </div>

                  {/* <div className="content-label-input">
                <label htmlFor="producto">Insumo</label>
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
                <label htmlFor="cantidad">Cantidad</label>
                <input
                  className="general-input-compras form-control"
                  type="number"
                  id="cantidad"
                  min="1"
                />
              </div> */}
                </div>

                {/* <div className="content-table">
              <div className="content-button d-flex justify-content-center">
                <div className="content-send-clear">
                  <button className="add-product" onClick={agregarCompra}>
                    Agregar insumo
                  </button>
                </div>
              </div>
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
                  {compras.map((compra, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{compra.Nombre}</td>
                      <td>{compra.Cantidad}</td>
                      <td>
                        <button
                          className="clear-button"
                          onClick={() => eliminarCompra(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
                <div class="container-button">
                  <div className="content-button">
                    <input
                      type="submit"
                      className="general-button cancel-button"
                      value="Cancelar"
                      onClick={() => {
                        navigate("/listarServicio");
                      }}
                    />
                    <input
                      className="general-button clean-button"
                      type="reset"
                      value="Limpiar"
                      onClick={handleClear}
                    />
                    <input
                      id="registrar"
                      className="general-button submit-button"
                      type="submit"
                      value="Registrar"
                      onClick={mostrarAlerta}
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

export default CrearServicio;

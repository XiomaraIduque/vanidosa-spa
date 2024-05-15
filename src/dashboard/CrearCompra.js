import alertasCompra from "../assets/alertas/compra/alertasCompra";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import delet from "../assets/img/delete.svg";
import '../assets/css/dash-board.css';
import '../assets/css/dash-style.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";
import Select from "react-select";

function CrearCompra() {
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleProveedorChange = (selectedProveedor) => {
    setSelectedProveedor(selectedProveedor);
    setProveedorValido(selectedProveedor !== null);
  };
  

  const handleInsumoChange = (selectedInsumo) => {
    setSelectedInsumo(selectedInsumo);
  };


  const [factura, setFactura] = useState("");
  const [facturaValido, setFacturaValido] = useState(true);

  const [pago, setPago] = useState("");
  const [pagoValido, setPagoValido] = useState(true);

  const [fecha, setFecha] = useState("");
  const [fechaValido, setFechaValido] = useState(true);


  const [proveedorValido, setProveedorValido] = useState(true);
  //const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState(0);

  const url = "https://api-proyecto-5hms.onrender.com/api/compra";

  const handleSubmit = (event) => {
    event.preventDefault();


    if (compras.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Compra nula...",
        text: "Querido usuario debe agregar al menos una compra!",
        confirmButtonColor: " #212F3D",
      });
      return;
    } else if (!factura || !pago || !fecha || !compras) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario todos los campos son obligatorios!",
        confirmButtonColor: " #212F3D",
      });
      return;
    }

    const compra = {
      N_factura: factura,
      M_pago: pago,
      Fecha: fecha,
      Proveedor: selectedProveedor.value,
      Productos: compras,
      Total_factura: total,
    };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compra),
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

  // Obtén la fecha actual
  const today = new Date();

  // Calcula la fecha límite una semana antes
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  )
    .toISOString()
    .split("T")[0];

  const [, setCompra] = useState({
    Nombre: "",
    Cantidad: "",
    Precio: "",
  });

  const [compras, setCompras] = useState([]);

  const agregarCompra = (e) => {
    e.preventDefault();

    // Check if an insumo is selected
    if (!selectedInsumo || !selectedInsumo.value) {
      Swal.fire({
        icon: "error",
        title: "Insumo no seleccionado...",
        text: "Querido usuario, debe seleccionar un insumo!",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    // Check if a quantity is provided
    const cantidadInput = document.getElementById("cantidad");
    const cantidad = parseInt(cantidadInput.value);
    if (isNaN(cantidad) || cantidad <= 0) {
      Swal.fire({
        icon: "error",
        title: "Cantidad no válida...",
        text: "Querido usuario, la cantidad debe ser un número positivo mayor que cero!",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    // Check if a price is provided
    const precioInput = document.getElementById("precio");
    const precio = parseFloat(precioInput.value);
    if (isNaN(precio) || precio <= 0) {
      Swal.fire({
        icon: "error",
        title: "Precio no válido...",
        text: "Querido usuario, el precio debe ser un número positivo mayor que cero!",
        confirmButtonColor: "#212F3D",
      });
      return;
    }

    // Create a new compra with the selected insumo, quantity, and price
    const nuevaCompra = {
      Nombre: selectedInsumo.value,
      Cantidad: cantidad,
      Precio: precio,
    };

    // Update the compras state
    const nuevasCompras = [...compras, nuevaCompra];
    setCompras(nuevasCompras);

    // Clear input values and selectedInsumo
    cantidadInput.value = "";
    precioInput.value = "";
    setSelectedInsumo(null);

    // Calculate and update total
    calcularTotal(nuevasCompras);
  };


  const eliminarCompra = (index) => {
    const nuevasCompras = [...compras];
    nuevasCompras.splice(index, 1);
    setCompras(nuevasCompras);
    calcularTotal(nuevasCompras);
  };

  const calcularTotal = (compras) => {
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
      const producto = compras[i];
      const Cantidad = parseInt(producto.Cantidad);
      const Precio = parseFloat(producto.Precio);
      const subtotal = Cantidad * Precio;
      total += subtotal;
    }
    setTotal(total);
  };

  const [Insumos, setInsumos] = useState([]); // Estado para almacenar la lista de usuarios
  //const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.insumo;
        let filtrarInsumos = authors.filter((insumo) => insumo.Estado === true);
        setInsumos(filtrarInsumos); // Actualiza el estado con los usuarios obtenidos
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [Proveedores, setProveedores] = useState([]); // Estado para almacenar la lista de usuarios
  //const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/proveedor";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.proveedor;
        let filtrarProveedores = authors.filter(
          (proveedor) => proveedor.Estado === true
        );
        setProveedores(filtrarProveedores); // Actualiza el estado con los usuarios obtenidos
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const mostrarAlerta = alertasCompra();

  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda


  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p class="main-title">REGISTRAR COMPRAS</p>
              <form class="main-view" onSubmit={handleSubmit}>
                <div class="container-fields">
                  <div class="content-label-input">
                    <label htmlFor="">Número de factura</label>
                    <input
                      className={`general-input form-control ${facturaValido ? "" : "campo_invalido"}`}
                      type="number"
                      id="factura"
                      value={factura || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]\d*$/.test(value)) {
                          setFactura(value);
                        }
                        setFacturaValido(value.trim() !== "");
                      }}
                    />
                    {!facturaValido && (
                      <p className="error-message">El numero es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Medio de Pago</label>
                    <select
                      className={`general-input form-select ${pagoValido ? "" : "campo_invalido"}`}
                      id="pago"
                      value={pago || ""}
                      onChange={(e) => {
                        setPago(e.target.value)
                        setPagoValido(e.target.value.trim() !== "")
                      }}
                    >
                      <option value="">Seleccione</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Credito">Crédito</option>
                    </select>
                    {!pagoValido && (
                      <p className="error-message">El medio de pago es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Cantidad</label>
                    <input
                      className="general-input form-control"
                      type="number"
                      id="cantidad"
                      min="1"
                    />
                  </div>


                  <div className="content-label-input">
                    <label htmlFor="">Proveedor</label>
                    <Select
                      value={selectedProveedor}
                      onChange={handleProveedorChange}
                      options={Proveedores.map((proveedor, index) => ({
                        value: proveedor.Nombre,
                        label: proveedor.Nombre
                      }))}
                      placeholder="Selecciona un proveedor"
                    />
                    {!proveedorValido && (
                      <p className="error-message">El proveedor es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Insumo</label>
                    <Select
                      value={selectedInsumo}
                      onChange={handleInsumoChange}
                      options={Insumos.map((insumo, index) => ({
                        value: insumo.Nombre,
                        label: insumo.Nombre
                      }))}
                      placeholder="Selecciona un insumo"
                    />
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Precio</label>
                    <input
                      className="general-input form-control"
                      type="number"
                      id="precio"
                      min="500"
                    />
                  </div>

                  <div class="content-label-input">
                    <label for="">Fecha</label>
                    <input
                      class={`general-input form-control ${fechaValido ? "" : "campo_invalido"}`}
                      type="date"
                      id="fecha"
                      min={minDate || ""}
                      max={today.toISOString().split("T")[0]}
                      value={fecha}
                      onChange={(e) => {
                        setFecha(e.target.value)
                        setFechaValido(e.target.value.trim() !== "")
                      }}
                    />
                    {!fechaValido && (
                      <p className="error-message">La fecha es obligatoria*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="">Total factura</label>
                    <input
                      className="general-input form-control"
                      type="number"
                      id="total"
                      value={total.toLocaleString()}
                      readOnly
                    />
                  </div>
                </div>

                <div class="container-button pb-4">
                  <div className="content-button">
                    <input
                      class="general-button add-button"
                      type="submit"
                      onClick={agregarCompra}
                      id="btnRegistrar"
                      value="Agregar producto"
                    />
                  </div>
                </div>

                <div className="container-table-item">
                  <div className="content-table">
                    <table class="main-table table table-bordered">
                      <thead>
                        <tr>
                          <th className="th-style text-center">ID</th>
                          <th className="th-style text-center">Producto</th>
                          <th className="th-style text-center">Cantidad</th>
                          <th className="th-style text-center">Precio</th>
                          <th className="th-style text-center">Subtotal</th>
                          <th className="th-style text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {compras.map((compra, index) => (
                          <tr key={index}>
                            <td className="td-style">{index + 1}</td>
                            <td className="td-style">{compra.Nombre}</td>
                            <td className="td-style">{compra.Cantidad}</td>
                            <td className="td-style">{compra.Precio.toLocaleString()}</td>
                            <td className="td-style">{(compra.Cantidad * compra.Precio).toLocaleString()}</td>
                            <td className="td-style text-center">
                              <button class="button-create-delete" onClick={() => eliminarCompra(index)}>
                                <img className="search-icon-create" src={delet} alt="" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div class="container-button">
                    <div className="content-button">
                      {/* <input class="clear-button" type="reset" value="Limpiar" onClick={handleClear} /> */}
                      <input
                        type="submit"
                        className="general-button cancel-button"
                        value="Cancelar"
                        onClick={() => {
                          navigate("/listarCompra");
                        }}
                      />
                      <input
                        class="general-button submit-button"
                        type="submit"
                        id="btnRegistrar"
                        value="Registrar"
                        onClick={mostrarAlerta}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <script src="../assets/js/funcionesClientes.js"></script>
      <script src="../assets/js/ValidarCompras.js"></script>
    </div>
  );
}

export default CrearCompra;

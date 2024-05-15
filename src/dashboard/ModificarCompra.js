import compraModiCoreacta from "../assets/alertas/compra/compraModiCoreacta";
import compraModificar from "../assets/alertas/compra/compraModificar";
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


function ModificarCompra() {
  const urlParams = new URLSearchParams(window.location.search);
  const compraId = urlParams.get("id");
  const [compraInicial, setCompraInicial] = useState(null);
  const [factura, setFactura] = useState("");
  const [pago, setPago] = useState("");
  const [fecha, setFecha] = useState("");
  const [proveedor, setProveedor] = useState("");
  //const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleProveedorChange = (selectedProveedor) => {
    setSelectedProveedor(selectedProveedor);
  };

  const handleInsumoChange = (selectedInsumo) => {
    setSelectedInsumo(selectedInsumo);
  };
  const url = "https://api-proyecto-5hms.onrender.com/api/compra";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!factura || !pago || !fecha || !proveedor || !compras) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario todos los campos son obligatorios!",
        confirmButtonColor: " #212F3D",
      });
      return;
    }

    const compra = {
      _id: compraId,
      N_factura: factura,
      M_pago: pago,
      Fecha: fecha,
      Proveedor: proveedor,
      Productos: compras,
      Total_factura: total,
    };

    fetch(url, {
      method: "PUT",
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


  useEffect(() => {
    console.log("Updated compras array:", compras);
  }, [compras]);

  const eliminarCompra = (_id) => {
    const nuevasCompras = compras.map((compra) => {
      if (compra._id === _id) {
        return {
          ...compra,
          eliminar: true,
        };
      }
      return compra;
    });
    setCompras(nuevasCompras);
    calcularTotal(nuevasCompras);
  };

  const calcularTotal = (compras) => {
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
      const producto = compras[i];
      if (!producto.eliminar) {
        const Cantidad = parseInt(producto.Cantidad);
        const Precio = parseFloat(producto.Precio);
        const subtotal = Cantidad * Precio;
        total += subtotal;
      }
    }
    setTotal(total);
    console.log("Total de la factura:", total);
  };

  const [Insumos, setInsumos] = useState([]); // Estado para almacenar la lista de usuarios
  //const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.insumo;
        setInsumos(authors); // Actualiza el estado con los usuarios obtenidos
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
        setProveedores(authors); // Actualiza el estado con los usuarios obtenidos
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  
  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/compra";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.compra;
        // Filtrar los insumos basados en el ID
        let filteredCompra = authors.filter(
          (compra) => compra._id === compraId
        );
        setCompraInicial(filteredCompra[0]); // Establecer los valores iniciales del insumo
        setFactura(filteredCompra[0].N_factura);
        setPago(filteredCompra[0].M_pago);
        setFecha(filteredCompra[0].Fecha);
        setProveedor(filteredCompra[0].Proveedor);
        setCompras(filteredCompra[0].Productos);
        setTotal(filteredCompra[0].Total_factura);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p class="main-title">MODIFICAR COMPRAS</p>
              <form class="main-view" onSubmit={handleSubmit}>
                {compraInicial && (
                  <div className="container-fields">
                    <div className="content-label-input">
                      <label htmlFor="">Número de factura</label>
                      <input
                        className="general-input form-control"
                        type="number"
                        id="factura"
                        value={factura}
                        onChange={(e) => setFactura(e.target.value)}
                        disabled
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="">Medio de Pago</label>
                      <select
                        className="general-input form-select"
                        id="pago"
                        value={pago}
                        onChange={(e) => setPago(e.target.value)}
                        disabled
                      >
                        <option value="">Seleccione</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Credito">Crédito</option>
                      </select>
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
                      <select
                        className="general-input form-select"
                        id="proveedor"
                        value={proveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                        disabled
                      >
                        <option value="">Seleccione</option>
                        {Proveedores.length > 0 &&
                          Proveedores.map((proveedor, index) => (
                            <option key={index}>{proveedor.Nombre}</option>
                          ))}
                      </select>
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

                    <div className="content-label-input">
                      <label htmlFor="">Fecha</label>
                      <input
                        className="general-input form-control"
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        disabled
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="">Total factura</label>
                      <input
                        className="general-input form-control bg-tf"
                        type="number"
                        id="total"
                        value={total}
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <div class="container-button mb-4">
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

                <div class="content-table-create">
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
                        {compras.map(
                          (compra, index) =>
                            !compra.eliminar && (
                              <tr key={compra._id}>
                                <td className="td-style">{index + 1}</td>
                                <td className="td-style"> {compra.Nombre} </td>
                                <td className="td-style">{compra.Cantidad} </td>
                                <td className="td-style">{compra.Precio} </td>
                                <td className="td-style">{compra.Cantidad * compra.Precio}</td>
                                <td className="td-style text-center">
                                  <button className="delete-button" onClick={() => eliminarCompra(compra._id)} >
                                    <img className="delete-icon" src={delet} alt="" />
                                  </button>
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div class="container-button">
                    <div className="content-button">
                      <input
                        class="general-button cancel-button"
                        type="reset"
                        value="Cancelar"
                        onClick={compraModificar}
                      />
                      <input
                        class="general-button submit-button"
                        type="submit"
                        id="btnRegistrar"
                        value="Actualizar"
                        onClick={compraModiCoreacta}
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

export default ModificarCompra;

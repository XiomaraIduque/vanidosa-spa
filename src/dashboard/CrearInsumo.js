import alertasInsumos from "../assets/alertas/insumo/alertasInsumos";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-board.css';
import '../assets/css/dash-style.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function CrearInsumo() {
  const [Insumos, setInsumos] = useState([]);

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

  const [nombre, setNombre] = useState("");
  const [nombreValido, setNombreValido] = useState(true);

  const [cantidad, setCantidad] = useState("");
  const [cantidadValido, setCantidadValido] = useState(true);

  const [udMedida, setUnidadMedida] = useState("");
  const [udMedidaValido, setUnidadMedidaValido] = useState(true);

  const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !udMedida) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario todos los campos son obligatorios!",
        confirmButtonColor: " #212F3D",
      });
      return;
    }

    const nombreExistente = Insumos.some((insumo) => insumo.Nombre === nombre);
    if (nombreExistente) {
      Swal.fire({
        icon: "error",
        title: "Nombre de insumo Existente...",
        text: "Querido usuario, el nombre del insumo ya existe!",
        confirmButtonColor: "#212F3D",
      });
      return;
    }
    
    const cantidadEnviar = cantidad || 0;

    const insumo = {
      Nombre: nombre,
      Cantidad: cantidadEnviar,
      Unidad_Medida: udMedida,
    };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insumo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetFields = () => {
    setNombre("");
    setCantidad("");
    setUnidadMedida("");
  };

  const handleClear = () => {
    resetFields();
  };

  const navigate = useNavigate();
  const mostrarAlerta = alertasInsumos();

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main" >
        <div className="content-main" >
          <DashHeader />
          <div className="container-view">
            <div className="content-view">
              <p className="main-title">CREAR INSUMO</p>
              <form className="main-view" onSubmit={handleSubmit}>
                <div className="container-fields">
                  <div className="content-label-input">
                    <label htmlFor="Nombre">Nombre</label>
                    <input
                      className={`general-input form-control ${nombreValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="nombre"
                      value={nombre || ""}
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
                    {!nombreValido && (
                      <p className="error-message">El nombre es obligatorio*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="Cantidad">Cantidad</label>
                    <input
                      className={`general-input form-control ${cantidadValido ? "" : "campo_invalido"}`}
                      type="text"
                      id="cantidad"
                      min="1"
                      value={cantidad || "0"}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const numbersOnly = inputValue.replace(/\D/g, "");
                        setCantidad(numbersOnly.trim() === "" ? null : numbersOnly);
                        setCantidadValido(numbersOnly.trim() !== "");
                      }}
                      disabled
                    />
                    {!cantidadValido && (
                      <p className="error-message">La cantidad es obligatoria*</p>
                    )}
                  </div>

                  <div className="content-label-input">
                    <label htmlFor="Ud_medida">Unidad de Medida</label>
                    <select
                      id="Ud_medida"
                      className={`general-input form-select ${udMedidaValido}`}
                      value={udMedida || ""}
                      onChange={(e) => {
                        setUnidadMedida(e.target.value)
                        setUnidadMedidaValido(e.target.value.trim() !== "")
                      }}
                    >
                      <option className="general-input-select" value="">Seleccione...</option>
                      {/* <option value="Litros">Litros</option> */}
                      <option value="Unidades">Unidades</option>
                      <option value="Cajas">Cajas</option>
                      <option value="Pares">Pares</option>
                    </select>
                    {!udMedidaValido && (
                      <p className="error-message">La unidadde medida es obligatoria*</p>
                    )}
                  </div>
                </div>

                <div class="container-button">
                  <div className="content-button">
                    <input
                      type="submit"
                      className="general-button cancel-button"
                      value="Cancelar"
                      onClick={() => {
                        navigate("/listarInsumos");
                      }}
                    />
                    <input
                      className="general-button clean-button"
                      type="reset"
                      value="Limpiar"
                      onClick={handleClear}
                    />
                    <input
                      className="general-button submit-button"
                      type="submit"
                      value="Registrar"
                      id="btnRegistrar"
                      onClick={mostrarAlerta}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <script src="../assets/js/funcionesClientes.js"></script>
      <script src="../assets/js/ValidarInsumos.js"></script>
    </div>
  );
}

export default CrearInsumo;

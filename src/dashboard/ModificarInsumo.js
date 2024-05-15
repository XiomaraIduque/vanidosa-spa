import alertaModiCoreacta from "../assets/alertas/insumo/insumoModiCoreacta";
import alertaModificar from "../assets/alertas/insumo/InsumoModificar";
import React, { useState, useEffect } from "react";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import DashMenu from "../components/DashMenu";
import '../assets/css/dash-style.css';
import '../assets/css/dash-board.css';
import '../assets/css/dash-view.css';
import Swal from "sweetalert2";

function ModificarInsumo() {
  const urlParams = new URLSearchParams(window.location.search);
  const insumoId = urlParams.get("id");

  const [insumoInicial, setInsumoInicial] = useState(null); // Estado para almacenar los valores iniciales del insumo
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [udMedida, setUnidadMedida] = useState("");

  //// Modificar
  const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !cantidad || !udMedida) {
      Swal.fire({
        icon: "error",
        title: "Campo vacio...",
        text: "Querido usuario todos los campos son obligatorios!",
        confirmButtonColor: " #212F3D",
      });
      return;
    }

    const insumo = {
      _id: insumoId,
      Nombre: nombre,
      Cantidad: cantidad,
      Unidad_Medida: udMedida,
    };

    fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insumo),
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

  useEffect(() => {
    const url = "https://api-proyecto-5hms.onrender.com/api/insumo";

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let authors = data.insumo;
        // Filtrar los insumos basados en el ID
        let filteredInsumo = authors.filter(
          (insumo) => insumo._id === insumoId
        );
        setInsumoInicial(filteredInsumo[0]); // Establecer los valores iniciales del insumo
        setNombre(filteredInsumo[0].Nombre);
        setCantidad(filteredInsumo[0].Cantidad);
        setUnidadMedida(filteredInsumo[0].Unidad_Medida);
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
              <p class="main-title">MODIFICAR INSUMO</p>
              <form className="main-view" onSubmit={handleSubmit}>
                {insumoInicial && (
                  <div className="container-fields">
                    <div className="content-label-input">
                      <label htmlFor="Nombre">Nombre</label>
                      <input
                        className="general-input form-control"
                        type="text"
                        id="Nombre"
                        value={nombre || ""}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const onlyLetters = inputValue.replace(
                            /[^A-Za-zñÑ\s]/g,
                            ""
                          );
                          setNombre(onlyLetters);
                        }}
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="Cantidad">Cantidad</label>
                      <input
                        className="general-input form-control"
                        type="number"
                        id="Cantidad"
                        min="1"
                        value={cantidad || ""}
                        onChange={(event) => setCantidad(event.target.value)}
                        disabled
                      />
                    </div>

                    <div className="content-label-input">
                      <label htmlFor="Ud_medida">Unidad de Medida</label>
                      <select
                        id="Ud_medida"
                        className="general-input form-select"
                        value={udMedida}
                        onChange={(event) => setUnidadMedida(event.target.value)}
                      >
                        <option value="">Seleccione...</option>
                        <option value="Unidades">Unidades</option>
                        <option value="Cajas">Cajas</option>
                        <option value="Pares">Pares</option>
                      </select>
                    </div>
                  </div>
                )}

                <div class="container-button">
                  <div className="content-button">
                    <input
                      className="general-button cancel-button"
                      type="reset"
                      value="Cancelar"
                      onClick={alertaModificar}
                    />
                    <input
                      className="general-button submit-button"
                      type="submit"
                      value="Guardar"
                      id="btnRegistrar"
                      onClick={alertaModiCoreacta}
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

export default ModificarInsumo;

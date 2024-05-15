const registrarInsumos = () => {

    const Nombre = document.querySelector('#Nombre');
    const Cantidad = document.querySelector('#Cantidad');
    const Ud_medida= document.querySelector('#Ud_medida');

    if (Nombre.value.length == 0 || Cantidad.value.length == 0 || Ud_medida.value.length == 0) {
        alert('Todos Los campos deben de estar diligenciados ')
        // Nombre.value='Este campo debe de ser diligenciado'
    } else {
        alert('Registro Exitoso')
    }

}

const btnRegistrar = document.querySelector('#btnRegistrar')
btnRegistrar.addEventListener('click', registrarInsumos)

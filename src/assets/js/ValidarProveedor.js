const proveedores = () => {
    const Nombre = document.querySelector('#nombre');
    const Apellido = document.querySelector('#apellido');
    const Correo = document.querySelector('#correo');
    const Ciudad = document.querySelector('#ciudad');
    const Direccion = document.querySelector('#direccion');
    const Telefono = document.querySelector('#telefono');
    const Nit = document.querySelector('#nit');
    const Estado = document.querySelector('#estado');

    if (Nombre.value.length == 0 || Apellido.value.length == 0 || Correo.value.length == 0 || Ciudad.value.length== 0 ||Direccion.value.length == 0 
        || Telefono.value.length == 0 || Nit.value.length == 0 || Estado.value.length == 0) {
        alert('Todos Los campos deben de estar diligenciados ')
    } else {
        alert("Registro exitoso")
    }

}

const btnRegistrar = document.querySelector('#btnRegistrar')
btnRegistrar.addEventListener('click', proveedores)



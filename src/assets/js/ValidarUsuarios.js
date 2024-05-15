const usuarios = () => {
    const Nombre = document.querySelector('#nombre');
    const Apellido = document.querySelector('#apellido');
    const Tipo = document.querySelector('#Tipodocumento')
    const Documento = document.querySelector('#documento');
    const Direccion = document.querySelector('#direccion');
    const Telefono = document.querySelector('#telefono');
    const Correo = document.querySelector('#correo');
    const Rol = document.querySelector('#rol');
    const Observaciones = document.querySelector('#observaciones');

    if (Nombre.value.length == 0 || Apellido.value.length == 0 || Documento.value.length == 0 || Tipo.value.length== 0|| Direccion.value.length == 0
        || Telefono.value.length == 0 || Correo.value.length == 0 || Rol.value.length == 0 || Observaciones.value.length == 0) {
            alert('Todos Los campos deben de estar diligenciados ')
    } else {
        alert("Registro exitoso")
    }

}

const btnRegistrar = document.querySelector('#btnRegistrar')
btnRegistrar.addEventListener('click',usuarios)
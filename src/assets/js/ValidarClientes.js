const crearCliente = (event) => {
    event.preventDefault()
      const nombre = document.querySelector('#nombre');
      const apellido = document.querySelector('#apellido');
      const tipo    = document.querySelector('#tipo');
      const documento = document.querySelector('#documento');
      const nacimiento = document.querySelector('#nacimiento');
      const correo = document.querySelector('#correo');
      const telefono = document.querySelector('#telefono');
      const direccion = document.querySelector('#direccion');
  
      if (nombre.value.length == 0 || apellido.value.length == 0 || tipo.value.length == 0 || documento.value.length == 0 || nacimiento.value.length == 0 || correo.value.length == 0 || telefono.value.length == 0  || direccion.value.length == 0  ) {
  
         alert('Todos Los campos deben de estar diligenciados ')
        //   document.getElementById('respuesta').innerHTML = 'Todos Los campos deben de estar diligenciados  ';
          
       
      } else {
          document.getElementById('respuesta').innerHTML = 'Registro exitoso';
      }
  
  }
  
  const registrar = document.querySelector('#formulario')
  registrar.addEventListener('submit', crearCliente)
  

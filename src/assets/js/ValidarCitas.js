const registrarCita = (event) => {
    event.preventDefault()
      const nombre = document.querySelector('#nombre');
      const apellido = document.querySelector('#apellido');
      const tipo    = document.querySelector('#tipo');
      const servicio = document.querySelector('#servicio');
      const fecha = document.querySelector('#fecha');
      const hora = document.querySelector('#hora');
  
      if (nombre.value.length == 0 || apellido.value.length == 0 || tipo.value.length == 0 || servicio.value.length == 0 || fecha.value.length == 0 || hora.value.length == 0) {
  
        alert('Todos Los campos deben de estar diligenciados ')
        //   document.getElementById('respuesta').innerHTML = 'Todos Los campos deben de estar diligenciados';
          
       
      } else {
            alert('Registro exitoso')
            // document.getElementById('respuesta').innerHTML = 'Registro exitoso';
      }
  
  }
  
  const registrar = document.querySelector('#formulario')
  registrar.addEventListener('submit', registrarCita)
  
  
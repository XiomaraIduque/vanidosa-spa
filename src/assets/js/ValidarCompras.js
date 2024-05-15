const registrarCompra = ()=>{
    const factura = document.querySelector('#factura')
    const pago = document.querySelector('#pago')
    const fecha = document.querySelector('#fecha')
    const proveedor = document.querySelector('#proveedor')
    const producto = document.querySelector('#producto')
    const cantidad = document.querySelector('#cantidad')
    const precio = document.querySelector('#precio')

    if(factura.value.length == 0 ||pago.value.length == 0 ||fecha.value.length == 0||
        proveedor.value.length == 0 ||producto.value.length == 0 ||cantidad.value.length == 0||
        precio.value.length == 0){
            
        alert('Todos Los campos deben de estar diligenciados ')
        }
    else{
        alert('Registro exitoso')

    }
}

const btnRegistrar = document.querySelector('#btnRegistrar')
btnRegistrar.addEventListener('click',registrarCompra)
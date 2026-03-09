let carrito = {}
let mesaActual = null


/* detectar mesa desde QR */

window.onload = function(){

let params = new URLSearchParams(window.location.search)

let mesa = params.get("mesa")

if(mesa){

mesaActual = mesa

let mesaInput = document.getElementById("mesa")

if(mesaInput){
mesaInput.value = mesa
}

let carritoGuardado = localStorage.getItem("carrito")

if(carritoGuardado){
carrito = JSON.parse(carritoGuardado)
actualizarPedido()
}


}

}


/* cambiar cantidad de platos */

function cambiarCantidad(nombre, precio, cambio){

if(!carrito[nombre]){
carrito[nombre] = {cantidad:0, precio:precio}
}

carrito[nombre].cantidad += cambio

if(carrito[nombre].cantidad < 0){
carrito[nombre].cantidad = 0
}

document.getElementById(nombre+"-cantidad").innerText = carrito[nombre].cantidad

actualizarPedido()

}


/* actualizar carrito */

function actualizarPedido(){

let lista = document.getElementById("listaPedido")

let total = 0

lista.innerHTML = ""

for(let producto in carrito){

let item = carrito[producto]

if(item.cantidad > 0){

lista.innerHTML += item.cantidad + " " + producto + "<br>"

total += item.cantidad * item.precio

}

}

document.getElementById("total").innerText = total
localStorage.setItem("carrito", JSON.stringify(carrito))


}


/* enviar pedido */

function enviarPedido(){

let nombreInput = document.getElementById("nombre")
let mesaInput = document.getElementById("mesa")
let pagoSelect = document.getElementById("pago")

let nombre = nombreInput.value.trim()

let mesa = mesaActual || mesaInput.value.trim()

let pago = pagoSelect.value


/* limpiar errores */

nombreInput.classList.remove("error")
mesaInput.classList.remove("error")
pagoSelect.classList.remove("error")

let error = false


/* validaciones */

if(nombre === ""){
nombreInput.classList.add("error")
error = true
}

if(mesa === ""){
mesaInput.classList.add("error")
error = true
}

if(pago === "Elija opcion"){
pagoSelect.classList.add("error")
error = true
}


/* verificar carrito */

let hayProductos = false

for(let producto in carrito){
if(carrito[producto].cantidad > 0){
hayProductos = true
break
}
}

if(!hayProductos){
alert("No agregaste ningún plato")
return
}

if(error){
return
}


/* crear mensaje */

let mensaje = "Pedido nuevo\n\n"

mensaje += "Cliente: " + nombre + "\n"
mensaje += "Mesa: " + mesa + "\n"
mensaje += "Pago: " + pago + "\n\n"

mensaje += "Pedido:\n"

let total = 0

for(let producto in carrito){

let item = carrito[producto]

if(item.cantidad > 0){

mensaje += item.cantidad + " " + producto + "\n"

total += item.cantidad * item.precio

}

}

mensaje += "\nTotal: $" + total


let telefono = "5491173687967"

let url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje)

window.open(url)

}


/* pedir mozo */

function pedirMozo(){

let mesa = mesaActual || document.getElementById("mesa").value.trim()

if(!mesa){
alert("Ingresá número de mesa")
return
}

let mensaje = "La mesa " + mesa + " solicita un mozo."

let telefono = "5491173687967"

let url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje)

window.open(url)

}


/* pedir cuenta */

function pedirCuenta(){

let mesa = mesaActual || document.getElementById("mesa").value.trim()

if(!mesa){
alert("Ingresá número de mesa")
return
}

let mensaje = "La mesa " + mesa + " solicita la cuenta."

let telefono = "5491173687967"

let url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje)

window.open(url)

}





function scrollPedido(){
document.getElementById("pedido").scrollIntoView({behavior:"smooth"})
}

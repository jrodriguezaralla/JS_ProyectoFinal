/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE VARIABLES *************************************************************/
/*********************************************************************************************************************************************************/
// Contenedor de listado de productos
const listado = document.querySelector("#listado") 
const contenedorCarrito = document.querySelector("#contenedorCarrito")
const contadorCarrito = document.querySelector("#contadorCarrito")
const totalCarrito = document.querySelector("#totalCarrito")
//const inputForm = document.querySelector("#inputForm")
const btnBuscar = document.querySelector("#btnBuscar")
btnBuscar.addEventListener('click', buscarProducto())


/*********************************************************************************************************************************************************/
/******************************************************************** DECLARACIÓN DE ARRAYS **************************************************************/
/*********************************************************************************************************************************************************/

const carrito = []


/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE FUNCIONES *************************************************************/
/*********************************************************************************************************************************************************/
function mostrarProductos () {
    productos.forEach(producto =>{
        let div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
                        <div class="card-header">
                            <h5 class="m-0 fw-semibold fs-5">${producto.modelo}</h5>
                        </div>
                        <div class="d-flex flex-column justify-content-between align-items-center p-2">    
                            <img class="card-img" src="./imagenes/${producto.imagen}" alt="img_${producto.modelo}">
                            <p class="fw-lighter">${producto.descripcion}</p>
                            <p class="fw-bold fst-italic fs-5">${producto.precio} USD</p>
                            <div class="d-flex justify-content-center">
                                <button id="${producto.id}" class="btnAgregarCarrito btn btn-dark" type="submit">Agregar al carrito</button>
                            </div>
                        </div>
                        `
        listado.append(div)
    })

    let btnAgregarCarrito = document.querySelectorAll('.btnAgregarCarrito') // NodeList = [button#1, button#2 .... , button#n]
    btnAgregarCarrito.forEach(el =>{
        el.addEventListener('click',(e) => {
            agregarProductoCarrito (e.target.id)
            e.preventDefault()
        })
    })
}

function agregarProductoCarrito (id) {
    const productoSelecionado = productos.find(elemento => elemento.id === parseInt(id)) // busco por el id el producto que el usuario eligio agregar
    carrito.push(productoSelecionado) // lo pusheo al carrito
    agregarElmentoCarrito (productoSelecionado)
    contadorCarrito.innerText = `${carrito.length}`
    sumarTotal()
}

function agregarElmentoCarrito (dato){
    let div = document.createElement("div")
    if(carrito.length == 1){
        contenedorCarrito.innerText = "" // Borro leyenda "Agregue productos al carrito"
    }
    div.className = "card mb-2"
    div.innerHTML = `
                    <div class="row w-100 align-items-center">
                        <div class="col-md-4 ms-auto d-flex justify-content-center">
                            <img src="./imagenes/${dato.imagen}" class="img-fluid rounded-start px-1 " alt="img_${dato.modelo}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body p-0 px-1">
                                <h5 class="card-title m-0 fs-6">${dato.marca} - ${dato.modelo}</h5>
                                <p class="card-text m-0 fs-6">${dato.descripcion}</p>
                                <div class="d-flex flex-row py-2 justify-content-between">
                                    <div class="btn-group btn-group-sm container-num">
                                        <button type="button" class="btn btn-dark btnWidth">-</button>
                                        <input type="number" class="btn-outline-dark num-input" min="1" value ="1">
                                        <button type="button" class="btn btn-dark btnWidth">+</button>
                                    </div>
                                    <p class="fw-bold fst-italic fs-5 m-0">${dato.precio} USD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
    
    contenedorCarrito.append(div)
}

function sumarTotal (){
    let auxiliar = carrito.map((el) => el.precio) 
    let total = auxiliar.reduce((acumulador, elemento)=> acumulador + elemento,0)
    mostrarTotal(total)
}

function mostrarTotal (valor){
    let div = document.createElement("div")
    totalCarrito.innerHTML = ""
    div.className = "d-flex justify-content-around p-2"
    div.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center">
                    <a class="btn btn-dark" href="../html/compra.html" role="button" target="_blank">Comprar</a>
                    </div>
                    <div class="d-flex justify-content-center align-items-center fs-4 fw-bold">
                        <p class="m-0">Total: ${valor} USD</p>
                    </div>
                    `
    totalCarrito.append(div)
}

function buscarProducto (){
    console.log("hola")
}

/*********************************************************************************************************************************************************/
/********************************************************************* PRUEBA DE FUNCIONES ***************************************************************/
/*********************************************************************************************************************************************************/
mostrarProductos();
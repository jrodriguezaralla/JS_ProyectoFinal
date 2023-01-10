/*********************************************************************************************************************************************************/
/******************************************************************** DECLARACIÓN DE ARRAYS **************************************************************/
/*********************************************************************************************************************************************************/

let carrito = JSON.parse(localStorage.getItem('carrito')) || [] // si tengo guardado un carrito en Local Storage lo asigno a carrito, sino le asigno un array vacio
//arrays auxiliarers con copia de productos para no modificar el original al ordenarlos
//const productosMayor = [...productos]
//const productosMenor = [...productos]

/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE VARIABLES *************************************************************/
/*********************************************************************************************************************************************************/

const listado = document.querySelector("#listado") // Contenedor de listado de productos
const contenedorCarrito = document.querySelector("#contenedorCarrito") // contenedor donde se muestran los productos en la venta de carrito
const contadorCarrito = document.querySelector("#contadorCarrito") // Contador de productos dentro del carrito, aparece en rojo indicando cantidades
const totalCarrito = document.querySelector("#totalCarrito") // contenedor para mostrar el precio total dentro del carrito

const linkCarrito = document.querySelector("#linkCarrito") // al presionar sobre el logo del carrito llamo a la función para mostrar los elementos en el carrito
linkCarrito.addEventListener('click',() => {
    agregarElmentoCarrito (carrito)
})

let inputBuscar = document.querySelector("#inputBuscar") // barra de busqueda
// se agrega evento para busqueda en tiempo real
inputBuscar.addEventListener('keyup', (e)=>{ 
    if (e.key === "Escape") e.target.value = ""
    if(e.target.matches("#inputBuscar")){
        document.querySelectorAll(".card_producto").forEach(producto => {
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
        })
    }
    e.preventDefault()
})

//eventos para filtrar por marcas
const btnFiltroMarcas = document.querySelector("#btnFiltroMarcas")
btnFiltroMarcas.addEventListener('click',() => {
    filtroMarcas()
})

//eventos para filtrar por tecnologia
const btnFiltroTecnologias = document.querySelector("#btnFiltroTecnologias")
btnFiltroTecnologias.addEventListener('click',() => {
    filtroTecnologias()
})

//limpio los filtros seleccionados
const btnLimpiarFiltros = document.querySelector("#btnLimpiarFiltros")
btnLimpiarFiltros.addEventListener('click',() => {
    fetch('../datos.json')
    .then(res => res.json())
    .then(data => mostrarElementos(data)) //muestro productos de forma dinamica
})

//Filtro para ordenar de mayor a menor precio
const mayorPrecio = document.querySelector("#mayorPrecio")
mayorPrecio.addEventListener('click',() => {
    fetch('../datos.json')
    .then(res => res.json())
    .then(data => mostrarElementos(data.sort(((a, b) => b.precio - a.precio))))
})

//Filtro para ordenar de menor a mayor precio
const menorPrecio = document.querySelector("#menorPrecio")
menorPrecio.addEventListener('click',() => {
    fetch('../datos.json')
    .then(res => res.json())
    .then(data => mostrarElementos(data.sort(((a, b) => a.precio - b.precio)))) 
})



/*********************************************************************************************************************************************************/
/********************************************************************** MOSTRAR PRODUCTOS ****************************************************************/
/*********************************************************************************************************************************************************/

contadorCarrito.innerText = `${carrito.length}` // actualizo contador de carrito con los items que tenga guardados
fetch('../datos.json')
.then(res => res.json())
.then(data => mostrarElementos(data)) //muestro productos de forma dinamica


/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE FUNCIONES *************************************************************/
/*********************************************************************************************************************************************************/
//Funcion para mostrar en pantalla los productos que recibe por parametros
function mostrarElementos (array){
    listado.innerHTML = ""
    array.forEach(producto =>{
        let div = document.createElement("div")
        div.className = "card card_producto"
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
    
    btnAgregarCarrito.forEach(el => {
        el.addEventListener('click',(e) => {
            agregarProductoCarrito (parseInt(e.target.id), array)
        })
    })
}

//Función para agregar prodcutos al carrito de compras
function agregarProductoCarrito (id, data) {
    const existe = carrito.some( (prod) => prod.id === id)
    const index = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    if(existe){   
        carrito[index].cantidad++
        localStorage.setItem('carrito',JSON.stringify(carrito))
    } else{
        
        const productoSelecionado = data.find(elemento => elemento.id === id) // busco por el id el producto que el usuario eligio agregar
        carrito.push(productoSelecionado) // lo pusheo al carrito
        localStorage.setItem('carrito',JSON.stringify(carrito))
        contadorCarrito.innerText = `${carrito.length}`
    }
    
}

//Función para mostrar en pantalla los productos que van siendo agregados al carrito
function agregarElmentoCarrito (dato){ 
    if(carrito.length >= 1){
        contenedorCarrito.innerText = "" // Borro leyenda "Agregue productos al carrito"
        dato.forEach((elemento)=>{
            let div = document.createElement("div")
            div.className = "card mb-2 position-relative"
            div.innerHTML = `
                            <div class="row w-100 align-items-center ms-1">
                                <div class="col-md-4 ms-auto d-flex justify-content-center">
                                    <img src="./imagenes/${elemento.imagen}" class="img-fluid rounded-start px-1 " alt="img_${elemento.modelo}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body p-0 px-1 position-relative">
                                        <h5 class="card-title m-0 fs-6 pe-4">${elemento.marca} - ${elemento.modelo}</h5>
                                        <p class="card-text m-0 fs-6 pe-3">${elemento.descripcion}</p>
                                        <div class="d-flex flex-row py-2 justify-content-between">
                                            <div class="btn-group btn-group-sm container-num">
                                                <button type="button" class="btn btn-dark btnWidth btnMenos" id="btnMenos${elemento.id}">-</button>
                                                <input type="number" class="btn-outline-dark num-input inputCantidad" id="inputCantidad${elemento.id}" min="1" value="${elemento.cantidad}">
                                                <button type="button" class="btn btn-dark btnWidth btnMas" id="btnMas${elemento.id}">+</button>
                                            </div>
                                            <p class="fw-bold fst-italic fs-5 m-0">${elemento.precio} USD</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button id="eliminar${elemento.id}" type="button" class="position-absolute top-0 end-0 btn btn-outline-danger btn-sm me-1 mt-1 btnEliminarProd"><i class="bi bi-trash"></i></button>
                            `
            contenedorCarrito.append(div)
            //asigno funcionalidad a cada boton de eliminar producto
            let btnEliminarProd = document.querySelector(`#eliminar${elemento.id}`) // NodeList = [button#1, button#2 .... , button#n]
            btnEliminarProd.addEventListener('click',() => {
                eliminarDelCarrito(elemento.id)
            })

            //asigno funcionalidad a cada boton de decrementar cantidad
            let btnMenos = document.querySelector(`#btnMenos${elemento.id}`)
            btnMenos.addEventListener('click',() => {
                decrementarCantidad(elemento.id)
            })

            //asigno funcionalidad a cada boton de incrementar cantidad
            let btnMas = document.querySelector(`#btnMas${elemento.id}`)
            btnMas.addEventListener('click',() => {
                incrementarCantidad(elemento.id)
            })

            //asigno funcionalidad a cada input cantidad
            let inputCantidad = document.querySelector(`#inputCantidad${elemento.id}`)
            inputCantidad.addEventListener('input',() => {
                setearCantidad(elemento.id, parseInt(inputCantidad.value))
            })

        })
    }
    sumarTotal() // actualizo el total del carrito

    // Si no hay productos limpio el contenedor
    if (carrito.length === 0){
        limpiarPantallaCarrito()
    }
}

//Función para sumar el total del carrito
function sumarTotal (){
    let auxiliar = carrito.map((el) => el.precio*el.cantidad) 
    let total = auxiliar.reduce((acumulador, elemento) => acumulador + elemento,0)
    mostrarTotal(total)
}

//Función para mostrar en pantalla el total del carrito y el boton de comprar
function mostrarTotal (valor){
    let div = document.createElement("div")
    totalCarrito.innerHTML = ""
    div.className = "d-flex justify-content-around p-2"
    div.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center">
                    <a class="btn btn-dark" role="button" id="btnComprar">Comprar</a>
                    </div>
                    <div class="d-flex justify-content-center align-items-center fs-4 fw-bold">
                        <p class="m-0">Total: ${valor} USD</p>
                    </div>
                    `
    totalCarrito.append(div)
    const btnComprar = document.querySelector("#btnComprar")
    btnComprar.addEventListener('click',() => {
        limpiarPantallaCarrito()
        limpiarCarrtio()
    Swal.fire({
        title: '¡Gracias por su compra!'
    })      
})
}

//Función para eliminar los productos del carrito
function eliminarDelCarrito (id){
    const productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito.splice(productoSelecionado,1)
    localStorage.setItem('carrito',JSON.stringify(carrito))
    contadorCarrito.innerText = `${carrito.length}`
    agregarElmentoCarrito (carrito)
}

//Funcion para decrementar las cantidades del producto seleccionado
function decrementarCantidad (id){
    let productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito[productoSelecionado].cantidad--
    carrito[productoSelecionado].cantidad <= 1 ? carrito[productoSelecionado].cantidad = 1 : carrito[productoSelecionado].cantidad 
    
    localStorage.setItem('carrito',JSON.stringify(carrito))
    agregarElmentoCarrito (carrito)
}

//Funcion para incrementar las cantidades del producto seleccionado
function incrementarCantidad (id){
    const productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito[productoSelecionado].cantidad++

    localStorage.setItem('carrito',JSON.stringify(carrito))
    agregarElmentoCarrito (carrito)
}

//Función para caputrar la cantidad de productos ingresados manualmente
function setearCantidad(id, valor){
    const productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito[productoSelecionado].cantidad = valor
    localStorage.setItem('carrito',JSON.stringify(carrito))
    sumarTotal ()
}

//Funcion para filtrar por marca
function filtroMarcas (){
    const filtroMarca = document.querySelectorAll(".filtro_marca")
    filtroMarca.forEach((e)=>{
        if (e.checked == true){
            fetch('../datos.json')
            .then(res => res.json())
            .then(data => {
                const productosFiltrados = data.filter(elemento => elemento.marca.toLowerCase() == e.value.toLowerCase()) // busco por el id el producto que el usuario eligio agregar
                mostrarElementos(productosFiltrados)
            }) //muestro productos de forma dinamica
            
        }
    })
}

//Funcion para filtrar por Tecnología
function filtroTecnologias(){
    const filtroTecnologia = document.querySelectorAll(".filtro_tecnologia")
    filtroTecnologia.forEach((e)=>{
        if (e.checked == true){
            const productosFiltrados = productos.filter(elemento => elemento.descripcion.includes(e.value.toUpperCase())) // busco si en descripcion esta la palabra PURO o CALCIO
            mostrarElementos(productosFiltrados)
        }
    })
}

//Funcion para borrar los elementos del carrito
function limpiarPantallaCarrito (){
    contenedorCarrito.innerHTML = ""
    contenedorCarrito.innerText = "Agregue productos al carrito"
    totalCarrito.innerText = ""
}

//Funcion para resetear carrito
function limpiarCarrtio(){
    contadorCarrito.innerText = "0"
    carrito = []
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

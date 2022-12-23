/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE VARIABLES *************************************************************/
/*********************************************************************************************************************************************************/
// Contenedor de listado de productos
const listado = document.querySelector("#listado") 

const contenedorCarrito = document.querySelector("#contenedorCarrito")
const contadorCarrito = document.querySelector("#contadorCarrito")
const totalCarrito = document.querySelector("#totalCarrito")

const linkCarrito = document.querySelector("#linkCarrito")
linkCarrito.addEventListener('click',() => {
    agregarElmentoCarrito (carrito)
})

const formBuscar = document.querySelector("#formBuscar")
let inputBuscar = document.querySelector("#inputBuscar")
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

const filtroMarca = document.querySelectorAll(".filtro_marca")
const btnFiltroMarcas = document.querySelector("#btnFiltroMarcas")
btnFiltroMarcas.addEventListener('click',() => {
    filtroMarcas()
})

const filtroTecnologia = document.querySelectorAll(".filtro_tecnologia")
const btnFiltroTecnologias = document.querySelector("#btnFiltroTecnologias")
btnFiltroTecnologias.addEventListener('click',() => {
    filtroTecnologias()
})

const btnLimpiarFiltros = document.querySelector("#btnLimpiarFiltros")
btnLimpiarFiltros.addEventListener('click',() => {
    mostrarElementos(productos)
})

let precioMinimo = document.querySelector("#precioMinimo")
let RangePrecioMinimo = document.querySelector("#RangePrecioMinimo").oninput = function(){
    this.max = Math.max(...productos.map((el)=> el.precio))
    let x = (this.value-this.min)/(this.max-this.min)*100
    let color = 'linear-gradient(to right, #fff 0%, #404040 ' + x +'%, #fff '+ x + '%, #fff 100%)'
    this.style.background = color
    precioMinimo.innerText = `USD ${this.value}`
}

let precioMaximo = document.querySelector("#precioMaximo")
let RangePrecioMaximo = document.querySelector("#RangePrecioMaximo").oninput = function(){
    this.max = Math.max(...productos.map((el)=> el.precio))
    let x = (this.value-this.min)/(this.max-this.min)*100
    let color = 'linear-gradient(to right, #fff 0%, #404040 ' + x +'%, #fff '+ x + '%, #fff 100%)'
    this.style.background = color
    precioMaximo.innerText = `USD ${this.value}`
}




/*********************************************************************************************************************************************************/
/******************************************************************** DECLARACIÓN DE ARRAYS **************************************************************/
/*********************************************************************************************************************************************************/

let carrito = JSON.parse(localStorage.getItem('carrito')) || [] // si tengo guardado un carrito en Local Storage lo asigno a carrito, sino le asigno un array vacio
const productosMayor = [...productos]
const productosMenor = [...productos]



productosMayor.sort(((a, b) => b.precio - a.precio));
productosMenor.sort(((a, b) => a.precio - b.precio));

console.log(productosMayor)
console.log(productosMenor)
/*********************************************************************************************************************************************************/
/********************************************************************** MOSTRAR PRODUCTOS ****************************************************************/
/*********************************************************************************************************************************************************/

contadorCarrito.innerText = `${carrito.length}` // actualizo contador de carrito con los items que tenga guardados
mostrarElementos(productos)


/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE FUNCIONES *************************************************************/
/*********************************************************************************************************************************************************/

function agregarProductoCarrito (id) {
    const existe = carrito.some( (prod) => prod.id === id)

    if(existe){
        carrito[id].cantidad++
        console.log(carrito[id].cantidad)
        localStorage.setItem('carrito',JSON.stringify(carrito))
    } else{
        
        const productoSelecionado = productos.find(elemento => elemento.id === id) // busco por el id el producto que el usuario eligio agregar
        carrito.push(productoSelecionado) // lo pusheo al carrito
        localStorage.setItem('carrito',JSON.stringify(carrito))
        contadorCarrito.innerText = `${carrito.length}`
    }
    
}

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
                                        <h5 class="card-title m-0 fs-6">${elemento.marca} - ${elemento.modelo}</h5>
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
            //asigno funcionalidad a boton de eliminar producto
            let btnEliminarProd = document.querySelector(`#eliminar${elemento.id}`) // NodeList = [button#1, button#2 .... , button#n]
            btnEliminarProd.addEventListener('click',() => {
                eliminarDelCarrito(elemento.id)
            })

            

            //asigno funcionalidad a boton de decrementar cantidad
            let btnMenos = document.querySelector(`#btnMenos${elemento.id}`)
            btnMenos.addEventListener('click',() => {
                decrementarCantidad(elemento.id)
            })

            //asigno funcionalidad a boton de incrementar cantidad
            let btnMas = document.querySelector(`#btnMas${elemento.id}`)
            btnMas.addEventListener('click',() => {
                incrementarCantidad(elemento.id)
            })

            //asigno funcionalidad a input cantidad
            let inputCantidad = document.querySelector(`#inputCantidad${elemento.id}`)
            inputCantidad.addEventListener('input',() => {
                setearCantidad(elemento.id, inputCantidad.value)
            })

        })
    }
    sumarTotal()

    //limpio el contenedor
    if (carrito.length === 0){
        contenedorCarrito.innerHTML = ""
        contenedorCarrito.innerText = "Agregue productos al carrito"
        totalCarrito.innerText = ""
    }
}

function sumarTotal (){
    let auxiliar = carrito.map((el) => el.precio*el.cantidad) 
    let total = auxiliar.reduce((acumulador, elemento) => acumulador + elemento,0)
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

function buscarProducto (valor){
    console.log(`${valor}`)
}

function eliminarDelCarrito (id){
    const productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito.splice(productoSelecionado,1)
    localStorage.setItem('carrito',JSON.stringify(carrito))
    contadorCarrito.innerText = `${carrito.length}`
    agregarElmentoCarrito (carrito)
}

function decrementarCantidad (id){
    let productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito[productoSelecionado].cantidad--
    carrito[productoSelecionado].cantidad <= 1 ? carrito[productoSelecionado].cantidad = 1 : carrito[productoSelecionado].cantidad 
    
    localStorage.setItem('carrito',JSON.stringify(carrito))
    agregarElmentoCarrito (carrito)
}

function incrementarCantidad (id){
    const productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito[productoSelecionado].cantidad++

    localStorage.setItem('carrito',JSON.stringify(carrito))
    agregarElmentoCarrito (carrito)
}

function setearCantidad(id, valor){
    const productoSelecionado = carrito.indexOf(carrito.find( (elemento) => elemento.id === id ))
    carrito[productoSelecionado].cantidad = valor
    localStorage.setItem('carrito',JSON.stringify(carrito))
    sumarTotal ()
}

function filtroMarcas (){
    filtroMarca.forEach((e)=>{
        if (e.checked == true){
            const productosFiltrados = productos.filter(elemento => elemento.marca.toLowerCase() == e.value.toLowerCase()) // busco por el id el producto que el usuario eligio agregar
            mostrarElementos(productosFiltrados)
        }
    })
}

function filtroTecnologias(){
    filtroTecnologia.forEach((e)=>{
        if (e.checked == true){
            const productosFiltrados = productos.filter(elemento => elemento.descripcion.includes(e.value.toUpperCase())) // busco si en descripcion esta la palabra PURO o CALCIO
            mostrarElementos(productosFiltrados)
        }
    })
}

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
                                <button id="agregar${producto.id}" class="btnAgregarCarrito btn btn-dark" type="submit">Agregar al carrito</button>
                            </div>
                        </div>
                        `
        listado.append(div)
        let btnAgregarCarrito = document.querySelector(`#agregar${producto.id}`) // NodeList = [button#1, button#2 .... , button#n]
    
        btnAgregarCarrito.addEventListener('click',() => {
                agregarProductoCarrito (producto.id)
        })
    })
}
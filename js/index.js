/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE VARIABLES *************************************************************/
/*********************************************************************************************************************************************************/
// Contenedor de listado de productos
let listado = document.querySelector("#listado") 

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
        div.innerHTML = `<div class="card-header">
                            <h5 class="m-0 fw-semibold fs-5">${producto.modelo}</h5>
                        </div>
                        <div class="d-flex flex-column justify-content-between align-items-center p-2">    
                            <img class="card-img" src="./imagenes/${producto.imagen}" alt="img_${producto.modelo}">
                            <p class="fw-lighter">${producto.descripcion}</p>
                            <p class="fw-bold fst-italic fs-5">${producto.precio} USD</p>
                            <div class="d-flex justify-content-center">
                                <button id="${producto.id}" class="btnAgregarCarrito btn btn-dark" type="submit">Agregar al carrito</button>
                            </div>
                        </div>`
        listado.append(div)
    })

    let btnAgregarCarrito = document.querySelectorAll('.btnAgregarCarrito') // NodeList = [button#1, button#2 .... , button#n]
    btnAgregarCarrito.forEach(el =>{
        el.addEventListener('click',(e) => {
            agregarProductoCarrito (e.target.id)
        })
    })
}

function agregarProductoCarrito (id) {
    const productoSelecionado = productos.find(elemento => elemento.id === parseInt(id)) // busco por el id el producto que el usuario eligio agregar
    carrito.push(productoSelecionado) // lo pusheo al carrito
}




/*********************************************************************************************************************************************************/
/********************************************************************* PRUEBA DE FUNCIONES ***************************************************************/
/*********************************************************************************************************************************************************/
mostrarProductos();
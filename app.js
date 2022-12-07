/*********************************************************************************************************************************************************/
/**************************************************************** DECLARACIÓN DE CONSTRUCTORES ***********************************************************/
/*********************************************************************************************************************************************************/

//constructor de objetos producto
class crearProducto {
    constructor(marca, modelo, precio, disponible) {
        this.marca = marca.toUpperCase()
        this.modelo = modelo.toUpperCase()
        this.precio = parseFloat(precio)
        this.disponible = disponible
    }
}

/*********************************************************************************************************************************************************/
/******************************************************************** DECLARACIÓN DE ARRAYS **************************************************************/
/*********************************************************************************************************************************************************/

const carrito = [];


/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE FUNCIONES *************************************************************/
/*********************************************************************************************************************************************************/
function agregarProductoCarrito () {
    let marca = ""
    let modelo = ""
    let precio = 0
    let disponible = true
    let continuar = ""

    do {
        marca = prompt("Ingrese marca de batería")
        modelo = prompt ("Ingrese modelo de batería")
        precio = parseFloat(prompt("Ingrese monto de producto"))
        carrito.push (new crearProducto (marca, modelo, precio, disponible))
        
        continuar = prompt ("¿Desea seguir agregando productos? si/no")  
        continuar = continuar.toUpperCase()
        while (true){           
            if(continuar === "SI"){
                break;
            } else if (continuar === "NO") {
                break;
                } else{
                    alert("Opción no válida, vuelva a intentarlo")
                    continuar = prompt ("¿Desea seguir agregando productos? si/no") 
                    continuar = continuar.toUpperCase()
                }
        }
    } while (continuar === "SI");
    console.log("Carrito de compras:")
    carrito.forEach((elemento)=>{
        console.log(elemento)
    })
}

/*********************************************************************************************************************************************************/
/********************************************************************* PRUEBA DE FUNCIONES ***************************************************************/
/*********************************************************************************************************************************************************/
agregarProductoCarrito () 
const precios = carrito.map (producto => producto.precio)


const ofertas = carrito.filter(producto => producto.precio < 50)
console.log("productos en oferta:")
console.log(ofertas)

/*
//Otra alternativa para sumar los precios dentro del array
let total = 0
for (let index=0; index < precios.length; index++){
    total += precios[index]
}
*/
const total = precios.reduce((acumulador, elemento)=> acumulador + elemento, 0)
alert(`Total: ${total}$ - Gracias por su compra!`)
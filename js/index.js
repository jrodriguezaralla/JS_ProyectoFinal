/*********************************************************************************************************************************************************/
/**************************************************************** DECLARACIÓN DE CONSTRUCTORES ***********************************************************/
/*********************************************************************************************************************************************************/

//constructor de objetos producto
// class CrearProducto {
//     constructor(marca, modelo, precio, disponible) {
//         this.marca = marca.toUpperCase()
//         this.modelo = modelo.toUpperCase()
//         this.precio = parseFloat(precio)
//         this.disponible = disponible
//     }
// }

/*********************************************************************************************************************************************************/
/******************************************************************** DECLARACIÓN DE ARRAYS **************************************************************/
/*********************************************************************************************************************************************************/

//const carrito = [];


/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE FUNCIONES *************************************************************/
/*********************************************************************************************************************************************************/
//función para agregar productos al carrito
// function agregarProductoCarrito () {
//     //Se declaran variables locales
//     let marca = ""
//     let modelo = ""
//     let precio = 0
//     let disponible = true
//     let continuar = ""

//     do {//bucle para iniciar el simulador
//         //solicito opciones al usuario
//         marca = prompt("Ingrese marca de batería")
//         modelo = prompt ("Ingrese modelo de batería")
//         precio = parseFloat(prompt("Ingrese monto de producto"))
//         carrito.push (new CrearProducto (marca, modelo, precio, disponible)) //se agrega un objeto al array
        
//         continuar = prompt ("¿Desea seguir agregando productos? si/no")  
//         continuar = continuar.toUpperCase() //paso a mayúscula la opción ingresada
//         while (true){ 
//             //se evalúa opción hasta que ingrese "SI" o "NO"         
//             if(continuar === "SI"){
//                 break;
//             } else if (continuar === "NO") {
//                 break;
//                 } else{
//                     alert("Opción no válida, vuelva a intentarlo")
//                     continuar = prompt ("¿Desea seguir agregando productos? si/no") 
//                     continuar = continuar.toUpperCase()
//                 }
//         }
//     } while (continuar === "SI");
//     //Imprimo el carrito con los produtos agregados
//     console.log("Carrito de compras:")
//     carrito.forEach((elemento)=>{
//         console.log(elemento)
//     })
// }

/*********************************************************************************************************************************************************/
/********************************************************************* PRUEBA DE FUNCIONES ***************************************************************/
/*********************************************************************************************************************************************************/
//agregarProductoCarrito () // pruebo función creada
//const precios = carrito.map (producto => producto.precio) // genero un map solo con los precios para sumarlos mas adelante


//const ofertas = carrito.filter(producto => producto.precio < 50) //filtro los productos que tengan precio menor a 50$ y lo muestro por consola
//console.log("productos en oferta:")
//console.log(ofertas)

/*
//Otra alternativa para sumar los precios dentro del array
let total = 0
for (let index=0; index < precios.length; index++){
    total += precios[index]
}
*/
//const total = precios.reduce((acumulador, elemento)=> acumulador + elemento, 0) //sumo los precios del map y los muestro al usuario
//alert(`Total: ${total}$ - Gracias por su compra!`)

let listado = document.querySelector("#listado")
console.log(bateriasYuasa)
console.log(bateriasMicrocell)
console.log(bateriasSBS)
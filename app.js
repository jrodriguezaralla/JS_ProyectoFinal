/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE CONSTANTES ************************************************************/
/*********************************************************************************************************************************************************/

const USUARIO_1 = "juan"
const CONTRASEÑA_1 = "123"

const USUARIO_2 = "pedro"
const CONTRASEÑA_2 = "456"

const USUARIO_3 = "pablo"
const CONTRASEÑA_3 = "789"

const STOCK_MC5_12 = 1000; 
const STOCK_MC7_12 = 1000; 
const STOCK_MC12_12 = 1000; 

/*********************************************************************************************************************************************************/
/****************************************************************** DECLARACIÓN DE FUNCIONES *************************************************************/
/*********************************************************************************************************************************************************/

/* Función básica para comprobar nombre de usuario y contraseña */
function comprobarUsuario (){
    let usuario = prompt("Ingrese nombre de usuario")
    let contraseña = prompt("Ingrese Contraseña")   
    
    switch (usuario){
        case USUARIO_1:
            if (contraseña === CONTRASEÑA_1){
                
                alert ("logueado correctamente")
                break;
            }else {
                alert ("contraseña incorrecta")
                break;
            }
        case USUARIO_2:
            if (contraseña === CONTRASEÑA_2){
                
                alert ("logueado correctamente")
                break;
            }else {
                console.log ("contraseña incorrecta")
                break;
            }
        case USUARIO_3:
            if (contraseña === CONTRASEÑA_3){
                
                alert ("logueado correctamente")
                break;
            }else {
                alert ("contraseña incorrecta")
                break;
            }
        default:
            alert ("usuario y/o contraseña incorrectos")
            break;
    }
}

/* Función para sumar productos dentro del carrito de compras */
function sumarProducto() {
    let subtotal = 0
    let total = 0
    let cantidad = 0
    let precio = 0
    let continuar = 0

    do {
        cantidad = parseInt(prompt("Ingrese cantidad de productos"))
        precio = parseFloat(prompt("Ingrese monto de producto"))
        subtotal = cantidad * precio
        total = total + subtotal
        continuar = prompt (`Subtotal: ${subtotal}$ - ¿Desea seguir agregando productos? si/no`)  
        while (true){
            if(continuar === "si"){
                break;
            } else if (continuar === "no") {
                break;
                } else{
                    alert("Opción no válida, vuelva a intentarlo")
                    continuar = prompt (`Subtotal: ${subtotal}$ - ¿Desea seguir agregando productos? si/no`)
                }
        }
    } while (continuar === "si");
    alert(`Total: ${total}$`)
}

/*********************************************************************************************************************************************************/
/********************************************************************* PRUEBA DE FUNCIONES ***************************************************************/
/*********************************************************************************************************************************************************/
comprobarUsuario ()
sumarProducto ()
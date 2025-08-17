//funcion para registrar productos mediante axios
const registrar_producto = async(pnombreProducto, pdescripcionProducto, pprecio)=>{

    try {
        const res = await axios({
            method:"post",
            url:"http://localhost:3000/api/routes_crear_producto/crearProducto",
            responseType:"json",
            data:{
                nombreProducto:pnombreProducto,
                descripcionProducto:pdescripcionProducto,
                precio:Number(pprecio)
            }
        })

        console.log(res.data)

        //evaluar si el Producto esta duplicado
        //code 11000
        if(res.data.resultado == false){
            
                Swal.fire({
                    title:"No se completo el registro",
                    text:"El producto ya existe",
                    icon:"error"
                })
            
        }else{
            Swal.fire({
                    title:"Registro exitoso",
                    text:"El producto fue registrado exitosamente",
                    icon:"success"
                })
        }

        
    } catch (error) {
        console.error("Full error response:");
        Swal.fire({
                    title:"No se completo el registro",
                    text:"El producto ya existe",
                    icon:"error"
                })
    }
}
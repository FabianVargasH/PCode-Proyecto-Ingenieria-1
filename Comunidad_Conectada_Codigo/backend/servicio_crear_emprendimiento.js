//funcion para registrar emprendimientos mediante axios
const registrar_emprendimiento = async(pnombreEmprendimiento, pdescripcionEmprendimiento)=>{

    try {
        const res = await axios({
            method:"post",
            url:"http://localhost:3000/api/routes_crear_emprendimiento/crearNegocio",
            responseType:"json",
            data:{
                nombreEmprendimiento:pnombreEmprendimiento,
                descripcionEmprendimiento:pdescripcionEmprendimiento
            }
        })

        console.log(res.data)

        //evaluar si el emprendimiento esta duplicado
        //code 11000
        if(res.data.resultado == false){
            
                Swal.fire({
                    title:"No se completo el registro",
                    text:"El emprendimiento ya existe",
                    icon:"error"
                })
            
        }else{
            Swal.fire({
                    title:"Registro exitoso",
                    text:"El emprendimiento fue registrado exitosamente",
                    icon:"success"
                })
        }

        
    } catch (error) {
        console.error("Full error response:");
        Swal.fire({
                    title:"No se completo el registro",
                    text:"El emprendimiento ya existe",
                    icon:"error"
                })
    }
}
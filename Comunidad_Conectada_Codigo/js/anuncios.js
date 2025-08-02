const formulario = document.querySelector(".formulario_principal");
const btnCrearAnuncio = document.getElementById("btnCrearAnuncio");
const btnLimpiar = document.getElementById("btnLimpiar");

const camposFormulario = {
    titulo: document.getElementById("txtTitulo"),
    descripcion: document.getElementById("txtDescripcion"),
    fechaCaducidad: document.getElementById("txtFechaCaducidad")
};

//Validaciones
const reglasValidacion = {
    titulo: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar un título para el anuncio";
        }
        if (valorIngresado.length < 5) {
            return "El título debe tener al menos 5 caracteres";
        }
        if (valorIngresado.length > 100) {
            return "El título no puede exceder los 100 caracteres";
        }
        return true;
    },
    descripcion: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar una descripción para el anuncio";
        }
        if (valorIngresado.length < 10) {
            return "La descripción debe tener al menos 10 caracteres";
        }
        if (valorIngresado.length > 500) {
            return "La descripción no puede exceder los 500 caracteres";
        }
        return true;
    },
    fechaCaducidad: (campoInput) => {
        const valorIngresado = campoInput.value;
        if (!valorIngresado) {
            return "Debe ingresar una fecha de caducidad";
        }
        const fechaSeleccionada = new Date(valorIngresado);
        const fechaActual = new Date();
        
        // Resetear horas para comparar solo fechas
        fechaSeleccionada.setHours(0, 0, 0, 0);
        fechaActual.setHours(0, 0, 0, 0);
        
        if (isNaN(fechaSeleccionada.getTime())) {
            return "La fecha ingresada no es válida";
        }
        
        // Validar que no sea una fecha pasada
        if (fechaSeleccionada <= fechaActual) {
            return "La fecha de caducidad debe ser futura";
        }
        const fechaMaxima = new Date();
        fechaMaxima.setFullYear(fechaMaxima.getFullYear() + 1);
        if (fechaSeleccionada > fechaMaxima) {
            return "La fecha de caducidad no puede ser mayor a un año";
        }
        
        return true;
    }
};

btnCrearAnuncio.addEventListener("click", (eventoClick) => {
    eventoClick.preventDefault();
    const errorEncontrado = ejecutarValidacionCompleta();
    if (errorEncontrado) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "Error en el formulario",
                text: errorEncontrado.mensaje,
                icon: "error",
                confirmButtonColor: '#dc3545'
            });
        } else {
            alert("Error: " + errorEncontrado.mensaje);
        }
        // Hacer scroll al primer campo con error si existe
        if (errorEncontrado.referenciaHTML) {
            errorEncontrado.referenciaHTML.scrollIntoView({ behavior: 'smooth', block: 'center' });
            errorEncontrado.referenciaHTML.focus();
        }
    } else {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "¡Anuncio creado exitosamente!",
                text: "Su anuncio ha sido enviado a revisión y será publicado una vez aprobado.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar' 
            }).then(() => {
                limpiarCampos();
            });
        } else {
            alert("¡Anuncio creado exitosamente! Su anuncio ha sido enviado a revisión y será publicado una vez aprobado.");
            limpiarCampos();
        }
    }
});

btnLimpiar.addEventListener("click", (eventoClick) => {
    eventoClick.preventDefault();
    limpiarCampos();
});

//Funcion principal para validar el formulario
const ejecutarValidacionCompleta = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;

    //Validar campos del formulario
    for (const nombreCampo in reglasValidacion) {
        const elementoCampo = camposFormulario[nombreCampo];

        if (elementoCampo) {
            const resultadoValidacion = reglasValidacion[nombreCampo](elementoCampo);
            
            if (resultadoValidacion !== true) {
                // Remover estilos de error previos
                limpiarEstilosError(elementoCampo);
                formularioEsValido = false;
                if (!primerErrorEncontrado) {
                    primerErrorEncontrado = { referenciaHTML: elementoCampo, mensaje: resultadoValidacion };
                }
            } else {
                // Remover estilos de error si la validación es exitosa
                limpiarEstilosError(elementoCampo);
            }
        }
    }
    return formularioEsValido ? null : primerErrorEncontrado;
};

//Funcion para limpiar estilos de error
const limpiarEstilosError = (elementoInput) => {
    elementoInput.classList.remove('error');
    elementoInput.style.borderColor = '';
    
    // Eliminar mensaje de error si existe
    const spanError = elementoInput.parentElement.querySelector('.error-message');
    if (spanError) {
        spanError.remove();
    }
};
//Funcion para limpiar el formulario
const limpiarCampos = () => {
    //limpiar los inputs
    Object.values(camposFormulario).forEach(elementoCampo => {
        if (elementoCampo) {
            elementoCampo.value = '';
            limpiarEstilosError(elementoCampo);
        }
    });
};
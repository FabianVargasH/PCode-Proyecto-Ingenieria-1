// Referencias a elementos del formulario
const formulario = document.getElementById("formReporte");
const camposFormulario = {
    fecha: document.getElementById("fechaReporte"),
    descripcion: document.getElementById("descripcion"),
    prioridad: document.getElementById("prioridad")
};

// Reglas de validación estructuradas
const reglasValidacion = {
    fecha: (campoInput) => {
    const valorIngresado = campoInput.value.trim();
    
    if (!valorIngresado) {
        return "Debe seleccionar una fecha";
    }
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const partesFecha = valorIngresado.split("-");
    const fechaSeleccionada = new Date(
        parseInt(partesFecha[0]), 
        parseInt(partesFecha[1]) - 1, 
        parseInt(partesFecha[2])
    );
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (isNaN(fechaSeleccionada.getTime())) {
        return "La fecha ingresada no es válida";
    }
    
    if (fechaSeleccionada < hoy) {
        return "La fecha no puede ser anterior a hoy";
    }

    return true;
    },
    
    descripcion: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "La descripción es obligatoria";
        }
        
        if (valorIngresado.length > 100) {
            return "La descripción no debe superar los 100 caracteres";
        }
        
        return true;
    },
    
    prioridad: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Debe seleccionar un nivel de prioridad";
        }
        
        return true;
    }
};

// Función para marcar campo con error (sin mostrar texto)
const marcarCampoConError = (elementoInput, tieneError) => {
    if (tieneError) {
        elementoInput.classList.add("error");
        elementoInput.style.borderColor = 'red';
    } else {
        elementoInput.classList.remove('error');
        elementoInput.style.borderColor = '';
    }
};

// Función para validar la selección de visibilidad
const validarSeleccionVisibilidad = () => {
    const visibilidadSeleccionada = document.querySelector('input[name="visibilidad"]:checked');
    return visibilidadSeleccionada ? true : false;
};

// Función principal de validación
const ejecutarValidacionCompleta = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;
    
    // Validar visibilidad
    if (!validarSeleccionVisibilidad()) {
        formularioEsValido = false;
        if (!primerErrorEncontrado) {
            primerErrorEncontrado = { mensaje: "Debe seleccionar una opción de visibilidad" };
        }
    }
    
    // Validar campos del formulario
    for (const nombreCampo in reglasValidacion) {
        const elementoCampo = camposFormulario[nombreCampo];
        
        if (elementoCampo) {
            const resultadoValidacion = reglasValidacion[nombreCampo](elementoCampo);
            
            if (resultadoValidacion !== true) {
                marcarCampoConError(elementoCampo, true);
                formularioEsValido = false;
                if (!primerErrorEncontrado) {
                    primerErrorEncontrado = { referenciaHTML: elementoCampo, mensaje: resultadoValidacion };
                }
            } else {
                marcarCampoConError(elementoCampo, false);
            }
        }
    }
    
    return formularioEsValido ? null : primerErrorEncontrado;
};

// Función para limpiar el formulario
const limpiarCampos = () => {
    // Limpiar los inputs
    Object.values(camposFormulario).forEach(elementoCampo => {
        if (elementoCampo) {
            elementoCampo.value = '';
            marcarCampoConError(elementoCampo, false);
        }
    });
    
    // Limpiar selección de visibilidad
    const botonesRadioVisibilidad = document.querySelectorAll('input[name="visibilidad"]');
    botonesRadioVisibilidad.forEach(botonRadio => {
        botonRadio.checked = false;
    });
    
    // Resetear el formulario completo
    formulario.reset();
};

// Desactivar validaciones HTML5 nativas
formulario.setAttribute('novalidate', 'true');

// Event listener principal del formulario
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    const errorEncontrado = ejecutarValidacionCompleta();
    
    if (errorEncontrado) {
        // Usar SweetAlert2 para mostrar errores
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
        // Si no hay errores: mensaje de éxito y reinicio del formulario
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "¡Éxito!",
                text: "Tu reporte ha sido enviado correctamente.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar'
            }).then(() => {
                limpiarCampos();
            });
        } else {
            alert("¡Éxito! Tu reporte ha sido enviado correctamente.");
            limpiarCampos();
        }
    }
});

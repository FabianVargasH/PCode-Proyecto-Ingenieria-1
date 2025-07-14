// Referencias a elementos del formulario
const formulario = document.getElementById("formOferta");
const camposFormulario = {
    emprendimiento: document.getElementById("selectEmprendimiento"),
    producto: document.getElementById("txtProducto"),
    descripcion: document.getElementById("txtDescripcion"),
    oferta: document.getElementById("txtOferta"),
    descripcionOferta: document.getElementById("txtDescripcionOferta"),
    condiciones: document.getElementById("txtCondiciones"),
    duracion: document.getElementById("txtDuracion")
};

// Reglas de validación estructuradas
const reglasValidacion = {
    emprendimiento: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Debe seleccionar un emprendimiento";
        }
        
        return true;
    },
    
    producto: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "El nombre del producto es obligatorio";
        }
        
        if (valorIngresado.length < 2) {
            return "El nombre del producto debe tener al menos 2 caracteres";
        }
        
        if (valorIngresado.length > 50) {
            return "El nombre del producto debe tener máximo 50 caracteres";
        }
        
        return true;
    },
    
    descripcion: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "La descripción del producto es obligatoria";
        }
        
        if (valorIngresado.length < 10) {
            return "La descripción del producto debe tener al menos 10 caracteres";
        }
        
        if (valorIngresado.length > 200) {
            return "La descripción del producto debe tener máximo 200 caracteres";
        }
        
        return true;
    },
    
    oferta: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "La oferta o descuento es obligatorio";
        }
        
        if (valorIngresado.length < 2) {
            return "La oferta debe tener al menos 2 caracteres";
        }
        
        if (valorIngresado.length > 30) {
            return "La oferta o descuento debe tener máximo 30 caracteres";
        }
        
        return true;
    },
    
    descripcionOferta: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "La descripción de la oferta es obligatoria";
        }
        
        if (valorIngresado.length < 10) {
            return "La descripción de la oferta debe tener al menos 10 caracteres";
        }
        
        if (valorIngresado.length > 150) {
            return "La descripción de la oferta debe tener máximo 150 caracteres";
        }
        
        return true;
    },
    
    condiciones: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Las condiciones son obligatorias";
        }
        
        if (valorIngresado.length < 5) {
            return "Las condiciones deben tener al menos 5 caracteres";
        }
        
        if (valorIngresado.length > 120) {
            return "Las condiciones deben tener máximo 120 caracteres";
        }
        
        return true;
    },
    
    duracion: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "La duración es obligatoria";
        }
        
        if (!/^\d+$/.test(valorIngresado)) {
            return "La duración debe ser un número entero";
        }
        
        const duracionNum = parseInt(valorIngresado);
        
        if (duracionNum < 1) {
            return "La duración debe ser mayor a 0 días";
        }
        
        if (duracionNum > 365) {
            return "La duración no puede ser mayor a 365 días";
        }
        
        return true;
    }
};

// Función para marcar campo con error 
const marcarCampoConError = (elementoInput, tieneError) => {
    if (tieneError) {
        elementoInput.classList.add("error");
        elementoInput.style.borderColor = 'red';
    } else {
        elementoInput.classList.remove('error');
        elementoInput.style.borderColor = '';
    }
};

// Función principal de validación
const ejecutarValidacionCompleta = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;
    
    // Validar campos del formulario en orden
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
    
    // Resetear el formulario completo
    formulario.reset();
    
    // Limpiar también cualquier mensaje de error que pudiera quedar
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());
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
                text: "La oferta ha sido registrada correctamente.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar'
            }).then(() => {
                limpiarCampos();
            });
        } else {
            alert("¡Éxito! La oferta ha sido registrada correctamente.");
            limpiarCampos();
        }
    }
});

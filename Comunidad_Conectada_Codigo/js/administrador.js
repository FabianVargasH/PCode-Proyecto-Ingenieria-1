const formulario = document.querySelector(".formulario_principal");
const btnActualizar = document.getElementById("btnActualizar");

// Referencia a los campos del formulario
const camposFormulario = {
    ruta: document.getElementById("txtRuta"),
    recorrido: document.getElementById("txtRecorrido"),
    tarifa: document.getElementById("txtTarifa"),
    dia: document.getElementById("txtDia"),
    horaPrimerBus: document.getElementById("txtHoraPrimerBus"),
    horaUltimoBus: document.getElementById("txtHoraUltimoBus"),
    frecuencia: document.getElementById("txtFrecuencia"),
    telefono: document.getElementById("txtTelefono"),
    correo: document.getElementById("txtCorreo")
};

// Reglas de validación
const reglasValidacion = {
    ruta: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar el nombre de la ruta";
        }
        if (valorIngresado.length < 3 || valorIngresado.length > 100) {
            return "La ruta debe tener entre 3 y 100 caracteres";
        }
        return true;
    },
    
    recorrido: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar el recorrido";
        }
        return true;
    },
    
    tarifa: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar la tarifa";
        }
        const numero = parseFloat(valorIngresado);
        if (isNaN(numero) || numero <= 0) {
            return "La tarifa debe ser un número positivo";
        }
        return true;
    },
    
    dia: (campoInput) => {
        const valorIngresado = campoInput.value;
        if (!valorIngresado) {
            return "Debe seleccionar el día";
        }
        return true;
    },
    
    horaPrimerBus: (campoInput) => {
        const valorIngresado = campoInput.value;
        if (!valorIngresado) {
            return "Debe ingresar la hora del primer bus";
        }
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(valorIngresado)) {
            return "La hora debe estar en formato 24 horas (HH:MM)";
        }
        return true;
    },
    
    horaUltimoBus: (campoInput) => {
        const valorIngresado = campoInput.value;
        if (!valorIngresado) {
            return "Debe ingresar la hora del último bus";
        }
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(valorIngresado)) {
            return "La hora debe estar en formato 24 horas (HH:MM)";
        }
        return true;
    },
    
    frecuencia: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar la frecuencia";
        }
        return true;
    },
    
    telefono: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar el teléfono";
        }
        const solamenteNumeros = valorIngresado.replace(/-/g, '');
        if (!/^\d{8}$/.test(solamenteNumeros)) {
            return "El teléfono debe tener 8 dígitos";
        }
        return true;
    },
    
    correo: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        if (!valorIngresado) {
            return "Debe ingresar el correo electrónico";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorIngresado)) {
            return "El formato del correo electrónico no es válido";
        }
        return true;
    }
};

// Event listener para el botón de actualizar
btnActualizar.addEventListener("click", (eventoClick) => {
    eventoClick.preventDefault();
    const errorEncontrado = ejecutarValidacionCompleta();
    
    if (errorEncontrado) {
        // Mostrar error con SweetAlert2
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
        
        // Hacer scroll al campo con error
        if (errorEncontrado.referenciaHTML) {
            errorEncontrado.referenciaHTML.scrollIntoView({ behavior: 'smooth', block: 'center' });
            errorEncontrado.referenciaHTML.focus();
        }
    } else {
        // Formulario válido
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "¡Actualización exitosa!",
                text: "La información del transporte público ha sido actualizada.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar'
            }).then(() => {
                limpiarCampos();
            });
        } else {
            alert("¡Actualización exitosa! La información ha sido guardada.");
            limpiarCampos();
        }
    }
});

// Función para mostrar errores en los campos
const mostrarMensajeError = (elementoInput, mensajeError) => {
    let spanError = elementoInput.parentElement.querySelector('.error-message');
    if (!spanError) {
        spanError = document.createElement('span');
        spanError.className = 'error-message';
        spanError.style.color = 'red';
        spanError.style.fontSize = '12px';
        spanError.style.display = 'block';
        spanError.style.marginTop = '5px';
        elementoInput.parentElement.appendChild(spanError);
    }
    
    if (mensajeError) {
        elementoInput.classList.add("error");
        elementoInput.style.borderColor = 'red';
        spanError.textContent = mensajeError;
        spanError.style.display = 'block';
    } else {
        elementoInput.classList.remove('error');
        elementoInput.style.borderColor = '';
        spanError.textContent = '';
        spanError.style.display = 'none';
    }
};

// Función principal para validar el formulario
const ejecutarValidacionCompleta = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;
    
    // Validar cada campo del formulario
    for (const nombreCampo in reglasValidacion) {
        const elementoCampo = camposFormulario[nombreCampo];
        
        if (elementoCampo) {
            const resultadoValidacion = reglasValidacion[nombreCampo](elementoCampo);
            
            if (resultadoValidacion !== true) {
                mostrarMensajeError(elementoCampo, resultadoValidacion);
                formularioEsValido = false;
                if (!primerErrorEncontrado) {
                    primerErrorEncontrado = { referenciaHTML: elementoCampo, mensaje: resultadoValidacion };
                }
            } else {
                mostrarMensajeError(elementoCampo, null);
            }
        }
    }
    
    return formularioEsValido ? null : primerErrorEncontrado;
};

// Función para limpiar el formulario
const limpiarCampos = () => {
    Object.values(camposFormulario).forEach(elementoCampo => {
        if (elementoCampo) {
            elementoCampo.value = '';
            mostrarMensajeError(elementoCampo, null);
        }
    });
};

// Event listeners para los botones de Aprobar y Rechazar
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones por clase
    const botonesAprobar = document.querySelectorAll('.btn-aprobar');
    const botonesRechazar = document.querySelectorAll('.btn-rechazar');
    
    // Agregar event listeners a botones de Aprobar
    botonesAprobar.forEach(boton => {
        boton.addEventListener('click', function() {
            const elementoPadre = this.closest('.admin-element');
            const textoElemento = elementoPadre.querySelector('span').textContent;
            
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¿Aprobar elemento?',
                    text: `¿Está seguro que desea aprobar: ${textoElemento}?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Sí, aprobar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: '¡Aprobado!',
                            text: 'El elemento ha sido aprobado exitosamente.',
                            icon: 'success',
                            confirmButtonColor: '#28a745'
                        }).then(() => {
                            // Remover el elemento de la lista
                            elementoPadre.remove();
                        });
                    }
                });
            } else {
                if (confirm(`¿Está seguro que desea aprobar: ${textoElemento}?`)) {
                    alert('Elemento aprobado exitosamente.');
                    elementoPadre.remove();
                }
            }
        });
    });
    
    // Agregar event listeners a botones de Rechazar
    botonesRechazar.forEach(boton => {
        boton.addEventListener('click', function() {
            const elementoPadre = this.closest('.admin-element');
            const textoElemento = elementoPadre.querySelector('span').textContent;
            
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¿Rechazar elemento?',
                    text: `¿Está seguro que desea rechazar: ${textoElemento}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#dc3545',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Sí, rechazar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: '¡Rechazado!',
                            text: 'El elemento ha sido rechazado.',
                            icon: 'success',
                            confirmButtonColor: '#dc3545'
                        }).then(() => {
                            // Remover el elemento de la lista
                            elementoPadre.remove();
                        });
                    }
                });
            } else {
                if (confirm(`¿Está seguro que desea rechazar: ${textoElemento}?`)) {
                    alert('Elemento rechazado.');
                    elementoPadre.remove();
                }
            }
        });
    });
});
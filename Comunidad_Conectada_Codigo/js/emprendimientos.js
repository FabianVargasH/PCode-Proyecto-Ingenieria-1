// Elementos del formulario de crear emprendimiento
const formularioEmprendimiento = document.getElementById("formulario_principal");
const btnCrearEmprendimiento = document.getElementById("btnRegistrarse");

// Elementos del formulario de productos
const formularioProducto = document.getElementById("formulario_principal1");
const btnAgregarProducto = document.getElementById("btnRegistrarse1");

const camposFormularioEmprendimiento = {
    nombreNegocio: document.getElementById("nombreEmprendimiento"),
    descripcionNegocio: document.getElementById("descripcionEmprendimiento")
};

const camposFormularioProducto = {  
    nombreProducto: document.getElementById("nombreProducto"),
    descripcionProducto: document.getElementById("descripcionProducto"),
    precio: document.getElementById("precio")
};

// Reglas de validación para crear emprendimiento
const reglasValidacionEmprendimiento = {
    nombreNegocio: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Debe ingresar el nombre del negocio";
        }
        
        if (valorIngresado.length < 3) {
            return "El nombre del negocio debe tener al menos 3 caracteres";
        }
        
        if (valorIngresado.length > 100) {
            return "El nombre del negocio no puede exceder los 100 caracteres";
        }
        
        return true;
    },
    
    descripcionNegocio: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (valorIngresado && valorIngresado.length < 10) {
            return "La descripción debe tener al menos 10 caracteres";
        }
        
        if (valorIngresado.length > 500) {
            return "La descripción no puede exceder los 500 caracteres";
        }
        
        return true;
    }
};

// Reglas de validación para productos
const reglasValidacionProducto = {
    nombreProducto: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Debe ingresar el nombre del producto";
        }
        
        if (valorIngresado.length < 3) {
            return "El nombre del producto debe tener al menos 3 caracteres";
        }
        
        if (valorIngresado.length > 50) {
            return "El nombre del producto no puede exceder los 50 caracteres";
        }
        
        return true;
    },
    
    descripcionProducto: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Debe ingresar la descripción del producto";
        }
        
        if (valorIngresado.length < 20) {
            return "La descripción debe tener al menos 20 caracteres";
        }
        
        if (valorIngresado.length > 300) {
            return "La descripción no puede exceder los 300 caracteres";
        }
        
        return true;
    },
    
    precio: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        
        if (!valorIngresado) {
            return "Debe ingresar el precio del producto";
        }
        
        const precio = parseFloat(valorIngresado);
        
        if (isNaN(precio)) {
            return "El precio debe ser un número válido";
        }
        
        if (precio <= 0) {
            return "El precio debe ser mayor a 0";
        }
        
        return true;
    }
};

// Event listener para el botón de crear emprendimiento
btnCrearEmprendimiento.addEventListener("click", (eventoClick) => {
    eventoClick.preventDefault();
    const errorEncontrado = ejecutarValidacionEmprendimiento();
    
    if (errorEncontrado) {
        // Usar SweetAlert2 para mostrar el error
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
        
        if (errorEncontrado.referenciaHTML) {
            errorEncontrado.referenciaHTML.scrollIntoView({ behavior: 'smooth', block: 'center' });
            errorEncontrado.referenciaHTML.focus();
        }
    } else {
        
        /// obtener datos del formulario

        const nombreNegocio = camposFormularioEmprendimiento.nombreNegocio.value.trim()
        const descripcionNegocio = camposFormularioEmprendimiento.descripcionNegocio.value.trim()

        registrar_emprendimiento(
            nombreNegocio, descripcionNegocio
        )




        // Emprendimiento creado exitosamente
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "¡Emprendimiento creado exitosamente!",
                text: "El emprendimiento ha sido registrado y está pendiente de aprobación.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar'
            }).then(() => {
                limpiarCamposEmprendimiento();
            });
        } else {
            alert("¡Emprendimiento creado exitosamente! El emprendimiento ha sido registrado y está pendiente de aprobación.");
            limpiarCamposEmprendimiento();
        }
    }
});

// Event listener para el botón de agregar producto
btnAgregarProducto.addEventListener("click", (eventoClick) => {
    eventoClick.preventDefault();
    const errorEncontrado = ejecutarValidacionProducto();
    
    if (errorEncontrado) {
        // Usar SweetAlert2 para mostrar el error
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

        /// obtener datos del formulario

        const nombreProducto = camposFormularioProducto.nombreProducto.value.trim()
        const descripcionProducto = camposFormularioProducto.descripcionProducto.value.trim()
        const precio = camposFormularioProducto.precio.value.trim()

        registrar_producto(
            nombreProducto, descripcionProducto, precio
        )




        // Producto agregado exitosamente
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "¡Producto agregado exitosamente!",
                text: "El producto ha sido registrado y está pendiente de aprobación.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar'
            }).then(() => {
                limpiarCamposProducto();
            });
        } else {
            alert("¡Producto agregado exitosamente! El producto ha sido registrado y está pendiente de aprobación.");
            limpiarCamposProducto();
        }
    }
});

// Función para mostrar o esconder errores en emprendimientos
const mostrarMensajeErrorEmprendimiento = (elementoInput, mensajeError) => {
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

// Función para mostrar o esconder errores en productos
const mostrarMensajeErrorProducto = (elementoInput, mensajeError) => {
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

// Función principal para validar el formulario de emprendimiento
const ejecutarValidacionEmprendimiento = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;

    // Validar campos del formulario de emprendimiento
    for (const nombreCampo in reglasValidacionEmprendimiento) {
        const elementoCampo = camposFormularioEmprendimiento[nombreCampo];

        if (elementoCampo) {
            const resultadoValidacion = reglasValidacionEmprendimiento[nombreCampo](elementoCampo);
            
            if (resultadoValidacion !== true) {
                mostrarMensajeErrorEmprendimiento(elementoCampo, resultadoValidacion);
                formularioEsValido = false;
                if (!primerErrorEncontrado) {
                    primerErrorEncontrado = { referenciaHTML: elementoCampo, mensaje: resultadoValidacion };
                }
            } else {
                mostrarMensajeErrorEmprendimiento(elementoCampo, null);
            }
        }
    }
    
    return formularioEsValido ? null : primerErrorEncontrado;
};

// Función para validar el dropdown de emprendimiento
const validarSeleccionEmprendimiento = () => {
    const selectEmprendimiento = document.querySelector('#formulario_principal1 select');
    const contenedorSelect = selectEmprendimiento.parentElement;
    let contenedorError = contenedorSelect.querySelector('.error-message');

    if (!contenedorError) {
        contenedorError = document.createElement('div');
        contenedorError.className = 'error-message';
        contenedorError.style.color = '#e74c3c';
        contenedorError.style.fontSize = '12px';
        contenedorError.style.marginTop = '5px';
        contenedorSelect.appendChild(contenedorError);
    }

    if (!selectEmprendimiento.value || selectEmprendimiento.value === "") {
        contenedorError.textContent = 'Debe seleccionar un emprendimiento';
        contenedorError.style.display = 'block';
        selectEmprendimiento.style.borderColor = 'red';
        return false;
    } else {
        contenedorError.textContent = '';
        contenedorError.style.display = 'none';
        selectEmprendimiento.style.borderColor = '';
        return true;
    }
};

// Función principal para validar el formulario de productos
const ejecutarValidacionProducto = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;

    // Validar selección de emprendimiento
    if (!validarSeleccionEmprendimiento()) {
        formularioEsValido = false;
        if (!primerErrorEncontrado) {
            primerErrorEncontrado = { mensaje: "Debe seleccionar un emprendimiento" };
        }
    }

    // Validar campos del formulario de productos
    for (const nombreCampo in reglasValidacionProducto) {
        const elementoCampo = camposFormularioProducto[nombreCampo];

        if (elementoCampo) {
            const resultadoValidacion = reglasValidacionProducto[nombreCampo](elementoCampo);
            
            if (resultadoValidacion !== true) {
                mostrarMensajeErrorProducto(elementoCampo, resultadoValidacion);
                formularioEsValido = false;
                if (!primerErrorEncontrado) {
                    primerErrorEncontrado = { referenciaHTML: elementoCampo, mensaje: resultadoValidacion };
                }
            } else {
                mostrarMensajeErrorProducto(elementoCampo, null);
            }
        }
    }
    
    return formularioEsValido ? null : primerErrorEncontrado;
};

// Función para limpiar el formulario de emprendimiento
const limpiarCamposEmprendimiento = () => {
    // Limpiar los inputs
    Object.values(camposFormularioEmprendimiento).forEach(elementoCampo => {
        if (elementoCampo) {
            elementoCampo.value = '';
            mostrarMensajeErrorEmprendimiento(elementoCampo, null);
        }
    });
};

// Función para limpiar el formulario de productos
const limpiarCamposProducto = () => {
    // Limpiar los inputs
    Object.values(camposFormularioProducto).forEach(elementoCampo => {
        if (elementoCampo) {
            if (elementoCampo.type === 'number') {
                elementoCampo.value = '0.000';
            } else {
                elementoCampo.value = '';
            }
            mostrarMensajeErrorProducto(elementoCampo, null);
        }
    });

    // Limpiar selección de emprendimiento
    const selectEmprendimiento = document.querySelector('#formulario_principal1 select');
    if (selectEmprendimiento) {
        selectEmprendimiento.selectedIndex = 0;
        selectEmprendimiento.style.borderColor = '';
        
        // Limpiar error del select
        const contenedorError = selectEmprendimiento.parentElement.querySelector('.error-message');
        if (contenedorError) {
            contenedorError.style.display = 'none';
        }
    }
};

// Agregar validación en tiempo real para mostrar contador de caracteres
document.addEventListener('DOMContentLoaded', function() {
    const nombreProductoInput = document.getElementById("txtNombreCompleto1");
    const descripcionProductoInput = document.getElementById("descripcion_producto");
    
    // Actualizar placeholder con contador para nombre del producto
    if (nombreProductoInput) {
        nombreProductoInput.addEventListener('input', function() {
            const longitudActual = this.value.length;
            this.placeholder = `${longitudActual}/50 caracteres`;
        });
    }
    
    // Actualizar placeholder con contador para descripción
    if (descripcionProductoInput) {
        descripcionProductoInput.addEventListener('input', function() {
            const longitudActual = this.value.length;
            this.placeholder = `${longitudActual}/300 caracteres`;
        });
    }
});

// Validación en tiempo real para remover errores cuando el usuario corrige
Object.values(camposFormularioEmprendimiento).forEach(campo => {
    if (campo) {
        campo.addEventListener('input', function() {
            const nombreCampo = Object.keys(camposFormularioEmprendimiento).find(key => camposFormularioEmprendimiento[key] === campo);
            if (nombreCampo && reglasValidacionEmprendimiento[nombreCampo]) {
                const resultado = reglasValidacionEmprendimiento[nombreCampo](campo);
                if (resultado === true) {
                    mostrarMensajeErrorEmprendimiento(campo, null);
                }
            }
        });
    }
});

// Validación en tiempo real para formulario de productos
Object.values(camposFormularioProducto).forEach(campo => {
    if (campo) {
        campo.addEventListener('input', function() {
            const nombreCampo = Object.keys(camposFormularioProducto).find(key => camposFormularioProducto[key] === campo);
            if (nombreCampo && reglasValidacionProducto[nombreCampo]) {
                const resultado = reglasValidacionProducto[nombreCampo](campo);
                if (resultado === true) {
                    mostrarMensajeErrorProducto(campo, null);
                }
            }
        });
    }
});

// Validación en tiempo real para el select de emprendimiento
document.addEventListener('DOMContentLoaded', function() {
    const selectEmprendimiento = document.querySelector('#formulario_principal1 select');
    if (selectEmprendimiento) {
        selectEmprendimiento.addEventListener('change', function() {
            if (this.value) {
                const contenedorError = this.parentElement.querySelector('.error-message');
                if (contenedorError) {
                    contenedorError.style.display = 'none';
                }
                this.style.borderColor = '';
            }
        });
    }
});

// Funcionalidad para el botón "Eliminar" en la sección "Mis productos"
document.addEventListener('DOMContentLoaded', function() {
    const btnEliminar = document.querySelector('.btn_secundario');
    const textareaMisProductos = document.querySelector('.contenedor_formulario:last-child textarea[readonly]');
    
    if (btnEliminar && textareaMisProductos) {
        btnEliminar.addEventListener('click', function() {
            // Usar SweetAlert2 para confirmar la eliminación
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Esta acción eliminará la información del producto mostrado",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#dc3545',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Limpiar el textarea
                        textareaMisProductos.value = '';
                        
                        // Mostrar mensaje de éxito
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'La información del producto ha sido eliminada.',
                            icon: 'success',
                            confirmButtonColor: '#28a745'
                        });
                    }
                });
            } else {
                // Fallback si no hay SweetAlert2
                if (confirm('¿Estás seguro de que quieres eliminar la información del producto?')) {
                    textareaMisProductos.value = '';
                    alert('La información del producto ha sido eliminada.');
                }
            }
        });
    }
});

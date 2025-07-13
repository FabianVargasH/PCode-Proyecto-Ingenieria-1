const formulario = document.querySelector("formulario_principal");
const formulario1 = document.querySelector("formulario_principal1");
const btnRegistrarse = document.getElementById("btnRegistrarse");
const btnRegistrarse1 = document.getElementById("btnRegistrarse1");

const camposFormulario = {
    nombre: document.getElementById("txtNombreCompleto"),
    nombre1: document.getElementById("txtNombreCompleto1"),
    descripcion: document.getElementById("descripcion_producto"),
    precio: document.getElementById("precio"),
}

//Validaciones
const reglasValidacionCrear = {
    nombre: (campoInput) => {
        const valorIngresado = campoInput.value.trim(); //trim para quitar lo de los espacios en blanco y caracteres especiales
        const palabrasEncontradas = valorIngresado.split(/\s+/).filter(palabra => palabra.length > 0);
        if (!valorIngresado) {
            return "Debe digitar un nombre de negocio";
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
            return "El nombre solo puede contener letras y espacios.";
        }
        return true;
    }
};

const reglasValidacionAgregar = {
    nombre1: (campoInput) => {
        const valorIngresado = campoInput.value.trim(); //trim para quitar lo de los espacios en blanco y caracteres especiales
        const palabrasEncontradas = valorIngresado.split(/\s+/).filter(palabra => palabra.length > 0);
        if (!valorIngresado) {
            return "Debe digitar un nombre de producto";
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
            return "El nombre solo puede contener letras y espacios.";
        }   
        return true;
    },
    descripcion: (campoInput) => {
        const valorIngresado = campoInput.value.trim(); //trim para quitar lo de los espacios en blanco y caracteres especiales
        const palabrasEncontradas = valorIngresado.split(/\s+/).filter(palabra => palabra.length > 0);
        if (!valorIngresado) {
            return "Debe digitar una descripcion de producto";
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
            return "El nombre solo puede contener letras y espacios.";
        }   
        return true;
    },
    precio: (campoInput) => {
        const valorIngresado = campoInput.value.trim();
        const valorNumerico = parseFloat(valorIngresado);
        
        if (!valorIngresado) {
            return "Debe ingresar un precio";
        }
        
        if (isNaN(valorNumerico)) {
            return "El precio debe ser un número válido";
        }
        
        if (valorNumerico <= 0.000) {
            return "El precio debe ser mayor que 0.000";
        }
        
        if (valorNumerico > 1000000) {
            return "El precio no puede ser mayor a 1 millón";
        }
        
        return true;
    }
};

btnRegistrarse.addEventListener("click", (eventoClickCrear) => {
    eventoClickCrear.preventDefault();
    const errorEncontrado = ejecutarValidacionCompletaCrear();
    if (errorEncontrado) {
        // Usar SweetAlert2 para que se vea más bonito
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
                title: "¡Registro exitoso!",
                text: "Su emprendimiento ha sido creado exitosamente.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar' 
            }).then(() => {
                limpiarCampos();
                //Dirigir al usuario al dashboard despues del registro
                window.location.href = '../dashboard/dashboard.html'; 
            });
        }else {
            alert("¡Registro exitoso! Su información ha sido registrada correctamente.");
            limpiarCampos();
            window.location.href = '../dashboard/dashboard.html';
        }
    }
});


btnRegistrarse1.addEventListener("click", (eventoClickAgregar) => {
    eventoClickAgregar.preventDefault();
    const errorEncontrado = ejecutarValidacionCompletaAgregar();
    if (errorEncontrado) {
        // Usar SweetAlert2 para que se vea más bonito
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
                title: "¡Registro exitoso!",
                text: "Su producto ha sido creado exitosamente.",
                icon: "success",
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Continuar' 
            }).then(() => {
                limpiarCampos();
                //Dirigir al usuario al dashboard despues del registro
                window.location.href = '../dashboard/dashboard.html'; 
            });
        }else {
            alert("¡Registro exitoso! Su información ha sido registrada correctamente.");
            limpiarCampos();
            window.location.href = '../dashboard/dashboard.html';
        }
    }
});

//Funcion para mostrar o esconder errores
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


//Funcion principal para validar el formulario crear emprendimiento
const ejecutarValidacionCompletaCrear = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;

    
    //Validar campos del formulario
    for (const nombreCampo in reglasValidacionCrear) {
        const elementoCampo = camposFormulario[nombreCampo];

        if (elementoCampo) {
            const resultadoValidacion = reglasValidacionCrear[nombreCampo](elementoCampo);
            
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


//validacion de formulario actuazalizar emprendimiento
const ejecutarValidacionCompletaAgregar = () => {
    let primerErrorEncontrado = null;
    let formularioEsValido = true;

    
    //Validar campos del formulario
    for (const nombreCampo in reglasValidacionAgregar) {
        const elementoCampo = camposFormulario[nombreCampo];

        if (elementoCampo) {
            const resultadoValidacion = reglasValidacionAgregar[nombreCampo](elementoCampo);
            
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


// Función básica para marcar la opción seleccionada
document.querySelectorAll('input[name="tipo_usuario_seleccionado"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Quitar marca de todas las tarjetas
        document.querySelectorAll('.tarjeta').forEach(tarjeta => {
            tarjeta.style.backgroundColor = '';
            tarjeta.style.borderColor = '';
        });
        // Marcar la tarjeta seleccionada
        if (this.checked) {
            this.nextElementSibling.style.backgroundColor = '#60A5FA';
            this.nextElementSibling.style.borderColor = '#1E3A8A';
        }
    });
});


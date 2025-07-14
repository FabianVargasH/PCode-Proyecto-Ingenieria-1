// Se agrega un event listener al formulario con id "formModificarOferta" para ejecutar lógica cuando se intente enviar
document.getElementById("formModificarOferta").addEventListener("submit", function (e) {
    e.preventDefault(); // Previene el envío normal del formulario para hacer validaciones antes

    // Se obtienen referencias a los campos del formulario que se van a validar
    const campos = {
        emprendimiento: document.getElementById("selectEmprendimiento"),
        producto: document.getElementById("selectProducto"),
        nuevoDescuento: document.getElementById("txtNuevoDescuento"),
        descripcion: document.getElementById("txtDescripcion"),
        condiciones: document.getElementById("txtCondiciones"),
        duracion: document.getElementById("txtDuracion"),
    };

    const errores = []; // Aquí se guardarán todos los errores encontrados

    // Validación: El usuario debe seleccionar un emprendimiento
    if (!campos.emprendimiento.value) {
        errores.push({ campo: campos.emprendimiento, mensaje: "Debe seleccionar un emprendimiento" });
    }

    // Validación: Debe seleccionarse un producto
    if (!campos.producto.value) {
        errores.push({ campo: campos.producto, mensaje: "Debe seleccionar un producto" });
    }

    // Validación: El nuevo descuento no puede tener más de 20 caracteres
    if (campos.nuevoDescuento.value.trim().length > 20) {
        errores.push({ campo: campos.nuevoDescuento, mensaje: "El descuento debe tener máximo 20 caracteres" });
    }

    // Validación: La descripción no puede exceder 100 caracteres
    if (campos.descripcion.value.trim().length > 100) {
        errores.push({ campo: campos.descripcion, mensaje: "La descripción debe tener máximo 100 caracteres" });
    }

    // Validación: Las condiciones no pueden exceder 100 caracteres
    if (campos.condiciones.value.trim().length > 100) {
        errores.push({ campo: campos.condiciones, mensaje: "Las condiciones deben tener máximo 100 caracteres" });
    }

    // Validación: La duración debe ser un número y no mayor a 365 días
    const duracionValor = campos.duracion.value.trim();
    if (!/^\d+$/.test(duracionValor) || parseInt(duracionValor) > 365) {
        errores.push({ campo: campos.duracion, mensaje: "La duración debe ser un número no mayor a 365" });
    }

    // Elimina todos los mensajes de error anteriores antes de mostrar nuevos
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());

    // Si hay errores encontrados, se muestran junto a los campos correspondientes
    if (errores.length > 0) {
        errores.forEach(({ campo, mensaje }) => {
            // Se crea un nuevo span para mostrar el mensaje de error
            const span = document.createElement("span");
            span.className = "error-message";
            span.style.color = "red";
            span.style.fontSize = "12px";
            span.textContent = mensaje;
            campo.parentElement.appendChild(span); // Se inserta el mensaje debajo del campo
            campo.style.borderColor = "red"; // Se aplica borde rojo para indicar error
        });

        // Se lanza un cuadro de alerta usando SweetAlert2 para indicar que hay errores
        Swal.fire({
            title: "Formulario inválido",
            text: "Por favor, revisa los campos marcados en rojo.",
            icon: "error"
        });

    } else {
        // Si no hay errores, se muestra mensaje de éxito con SweetAlert2
        Swal.fire({
            title: "¡Modificación exitosa!",
            text: "Los datos han sido actualizados correctamente.",
            icon: "success"
        }).then(() => {
            // Se limpia el formulario y se restablecen los bordes
            document.getElementById("formModificarOferta").reset();
            document.querySelectorAll(".txt_campo").forEach(campo => campo.style.borderColor = "");
        });
    }
});


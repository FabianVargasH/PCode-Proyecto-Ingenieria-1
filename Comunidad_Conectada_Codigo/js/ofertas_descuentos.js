// Se agrega un event listener al formulario con id "formOferta" para ejecutar lógica cuando se intente enviar
document.getElementById("formOferta").addEventListener("submit", function (e) {
    e.preventDefault(); // Se evita que el formulario se envíe automáticamente (evita recarga de página)

    // Se obtienen las referencias a todos los campos que deben validarse
    const campos = {
        emprendimiento: document.getElementById("selectEmprendimiento"),
        producto: document.getElementById("txtProducto"),
        descripcion: document.getElementById("txtDescripcion"),
        oferta: document.getElementById("txtOferta"),
        descripcionOferta: document.getElementById("txtDescripcionOferta"),
        condiciones: document.getElementById("txtCondiciones"),
        duracion: document.getElementById("txtDuracion"),
    };

    const errores = []; // Arreglo que almacenará objetos con campos y mensajes si hay errores

    // Validar que se haya seleccionado un emprendimiento
    if (!campos.emprendimiento.value) {
        errores.push({ campo: campos.emprendimiento, mensaje: "Debe seleccionar un emprendimiento" });
    }

    // Validar que el nombre del producto tenga como máximo 15 caracteres
    if (campos.producto.value.trim().length > 15) {
        errores.push({ campo: campos.producto, mensaje: "El nombre del producto debe tener máximo 15 caracteres" });
    }

    // Validar que la oferta tenga como máximo 20 caracteres
    if (campos.oferta.value.trim().length > 20) {
        errores.push({ campo: campos.oferta, mensaje: "La oferta o descuento debe tener máximo 20 caracteres" });
    }

    // Validar que la descripción del producto tenga como máximo 100 caracteres
    if (campos.descripcion.value.trim().length > 100) {
        errores.push({ campo: campos.descripcion, mensaje: "La descripción del producto debe tener máximo 100 caracteres" });
    }

    // Validar que la descripción de la oferta tenga como máximo 100 caracteres
    if (campos.descripcionOferta.value.trim().length > 100) {
        errores.push({ campo: campos.descripcionOferta, mensaje: "La descripción de la oferta debe tener máximo 100 caracteres" });
    }

    // Validar que las condiciones tengan como máximo 100 caracteres
    if (campos.condiciones.value.trim().length > 100) {
        errores.push({ campo: campos.condiciones, mensaje: "Las condiciones deben tener máximo 100 caracteres" });
    }

    // Validar que la duración sea un número entero menor o igual a 365
    const duracionValor = campos.duracion.value.trim();
    if (!/^\d+$/.test(duracionValor) || parseInt(duracionValor) > 365) {
        errores.push({ campo: campos.duracion, mensaje: "La duración debe ser un número no mayor a 365" });
    }

    // Quitar todos los mensajes de error anteriores antes de volver a validar
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());

    // Si hay errores, mostrar mensajes y marcar bordes en rojo
    if (errores.length > 0) {
        errores.forEach(({ campo, mensaje }) => {
            const span = document.createElement("span"); // Crear elemento span para mensaje
            span.className = "error-message";
            span.style.color = "red";
            span.style.fontSize = "12px";
            span.textContent = mensaje;

            campo.parentElement.appendChild(span); // Agregar mensaje al DOM
            campo.style.borderColor = "red"; // Marcar campo con borde rojo
        });

        // Mostrar alerta general si SweetAlert2 está disponible
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: "Formulario inválido",
                text: "Por favor, revisa los campos marcados en rojo.",
                icon: "error"
            });
        }

    } else {
        // Si no hay errores, mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
            title: "¡Éxito!",
            text: "La oferta ha sido registrada correctamente.",
            icon: "success"
        }).then(() => {
            // Limpiar el formulario y restaurar bordes
            document.getElementById("formOferta").reset();
            document.querySelectorAll(".txt_campo").forEach(campo => campo.style.borderColor = "");
        });
    }
});


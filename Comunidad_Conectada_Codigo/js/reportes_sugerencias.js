// Se agrega un event listener al formulario con id "formReporte" para ejecutar lógica cuando se intente enviar
document.getElementById("formReporte").addEventListener("submit", function (e) {
    e.preventDefault(); // Se previene el envío automático del formulario (submit)

    // Se obtienen las referencias a cada campo del formulario
    const campos = {
        fecha: document.getElementById("fechaReporte"),
        descripcion: document.getElementById("descripcion"),
        prioridad: document.getElementById("prioridad"),
        visibilidad: document.querySelector('input[name="visibilidad"]:checked') // valor solo si está seleccionado
    };

    // Antes de validar, se limpian errores visuales previos (mensajes de error y bordes rojos)
    document.querySelectorAll(".error-message").forEach(msg => msg.remove()); // quitar mensajes anteriores
    document.querySelectorAll(".txt_campo").forEach(campo => campo.style.borderColor = ""); // restaurar bordes

    const errores = []; // Arreglo donde almacenaremos los errores encontrados

    // ======================
    // VALIDACIÓN DE FECHA
    // ======================

    // Obtener la fecha actual y "normalizarla" (sin horas) para comparación
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // pone horas en 00:00:00 para evitar errores por diferencia horaria

    // Se convierte el valor del input en un objeto Date para compararlo con hoy
    const fechaSeleccionada = new Date(campos.fecha.value);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (!campos.fecha.value) {
        errores.push({ campo: campos.fecha, mensaje: "Debe seleccionar una fecha" });
    } else if (fechaSeleccionada < hoy) {
        errores.push({ campo: campos.fecha, mensaje: "La fecha no puede ser anterior a hoy" });
    }

    // =========================
    // VALIDACIÓN DE DESCRIPCIÓN
    // =========================

    const descripcionTexto = campos.descripcion.value.trim();

    if (descripcionTexto === "") {
        errores.push({ campo: campos.descripcion, mensaje: "La descripción es obligatoria" });
    } else if (descripcionTexto.length > 100) {
        errores.push({ campo: campos.descripcion, mensaje: "La descripción no debe superar los 100 caracteres" });
    }

    // ==============================
    // VALIDACIÓN DE PRIORIDAD (select)
    // ==============================
    if (!campos.prioridad.value) {
        errores.push({ campo: campos.prioridad, mensaje: "Debe seleccionar un nivel de prioridad" });
    }

    // ============================
    // VALIDACIÓN DE VISIBILIDAD (radio)
    // ============================
    if (!campos.visibilidad) {
        errores.push({
            campo: document.querySelector('input[name="visibilidad"]').parentElement,
            mensaje: "Debe seleccionar una opción de visibilidad"
        });
    }

    // ============================
    // MANEJO DE RESULTADOS
    // ============================

    // Si hay errores, se muestran debajo de los campos correspondientes y se colorean en rojo
    if (errores.length > 0) {
        errores.forEach(({ campo, mensaje }) => {
            const span = document.createElement("span");
            span.className = "error-message";
            span.style.color = "red";
            span.style.fontSize = "12px";
            span.textContent = mensaje;
            campo.parentElement.appendChild(span);

            // Si el campo tiene la clase visual .txt_campo se le marca borde rojo
            if (campo.classList.contains("txt_campo")) {
                campo.style.borderColor = "red";
            }
        });

        // Mensaje de advertencia general con SweetAlert2
        Swal.fire({
            title: "Formulario inválido",
            text: "Por favor, revisa los campos marcados en rojo.",
            icon: "error"
        });

    } else {
        // Si no hay errores: mensaje de éxito y reinicio del formulario
        Swal.fire({
            title: "¡Éxito!",
            text: "Tu reporte ha sido enviado correctamente.",
            icon: "success"
        }).then(() => {
            // Limpiar campos y restaurar bordes
            document.getElementById("formReporte").reset();
            document.querySelectorAll(".txt_campo").forEach(campo => campo.style.borderColor = "");
        });
    }
});

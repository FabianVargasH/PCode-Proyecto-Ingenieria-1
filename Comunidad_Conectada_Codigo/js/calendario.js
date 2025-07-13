document.addEventListener("DOMContentLoaded", function () {
  // Esperar a que SweetAlert2 se cargue
  const esperarSweetAlert = () => {
    return new Promise((resolve) => {
      if (typeof Swal !== 'undefined') {
        resolve();
      } else {
        setTimeout(() => esperarSweetAlert().then(resolve), 100);
      }
    });
  };
  esperarSweetAlert().then(() => {
    console.log("SweetAlert2 cargado correctamente");
    
    const calendarEl = document.getElementById("calendario");

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "es",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,listMonth"
      },
      events: [
        {
          title: "Reunión de vecinos",
          start: new Date().toISOString().split("T")[0] + "T15:00:00",
          extendedProps: {
            descripcion: "Ejemplo",
            ubicacion: "Parque Central"
          }
        }
      ],
      eventClick: function (info) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: info.event.title,
            html: `
              <div style="text-align: left;">
                <p><strong>Inicio:</strong> ${info.event.start.toLocaleString()}</p>
                <p><strong>Ubicación:</strong> ${info.event.extendedProps.ubicacion}</p>
                <p><strong>Descripción:</strong> ${info.event.extendedProps.descripcion}</p>
              </div>
            `,
            icon: "info",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar'
          });
        } else {
          alert(
            "Evento: " + info.event.title + "\n" +
            "Inicio: " + info.event.start.toLocaleString() + "\n" +
            "Ubicación: " + info.event.extendedProps.ubicacion + "\n" +
            "Descripción: " + info.event.extendedProps.descripcion
          );
        }
      }
    });

    calendar.render();

    const form = document.getElementById("formEvento");

    // Reglas de validación para cada campo
    const reglasValidacion = {
      titulo: (valor) => {
        const valorLimpio = valor.trim();
        if (!valorLimpio) {
          return "Debe ingresar un título para el evento";
        }
        if (valorLimpio.length < 5) {
          return "El título debe tener al menos 5 caracteres";
        }
        if (valorLimpio.length > 100) {
          return "El título no puede exceder 100 caracteres";
        }
        return true;
      },
      fecha: (valor) => {
        if (!valor) {
          return "Debe seleccionar una fecha para el evento";
        }
        return true;
      },
      hora: (valor) => {
        if (!valor) {
          return "Debe seleccionar una hora para el evento";
        }
        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(valor)) {
          return "La hora debe estar en formato 24 horas (HH:MM)";
        }
        return true;
      },
      ubicacion: (valor) => {
        const valorLimpio = valor.trim();
        if (!valorLimpio) {
          return "Debe ingresar una ubicación para el evento";
        }
        if (valorLimpio.length < 10) {
          return "La ubicación debe tener al menos 10 caracteres";
        }
        if (valorLimpio.length > 200) {
          return "La ubicación no puede exceder 200 caracteres";
        }
        return true;
      },
      descripcion: (valor) => {
        const valorLimpio = valor.trim();
        if (!valorLimpio) {
          return "Debe ingresar una descripción para el evento";
        }
        if (valorLimpio.length < 20) {
          return "La descripción debe tener al menos 20 caracteres";
        }
        if (valorLimpio.length > 500) {
          return "La descripción no puede exceder 500 caracteres";
        }
        return true;
      }
    };

    // Función para validar todos los campos
    const validarFormulario = () => {
      const titulo = document.getElementById("titulo").value;
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const ubicacion = document.getElementById("ubicacion").value;
      const descripcion = document.getElementById("descripcion").value;

      // Validar cada campo
      const validaciones = [
        { campo: 'titulo', valor: titulo },
        { campo: 'fecha', valor: fecha },
        { campo: 'hora', valor: hora },
        { campo: 'ubicacion', valor: ubicacion },
        { campo: 'descripcion', valor: descripcion }
      ];

      for (const validacion of validaciones) {
        const resultado = reglasValidacion[validacion.campo](validacion.valor);
        if (resultado !== true) {
          return resultado;
        }
      }

      // Validación adicional: fecha debe ser posterior a la actual
      const fechaEvento = new Date(fecha + "T" + hora);
      const fechaActual = new Date();
      if (fechaEvento <= fechaActual) {
        return "La fecha debe ser posterior a la fecha y hora actual";
      }

      // Validación de conflicto de horarios y lugar
      const eventosExistentes = calendar.getEvents();
      const hayConflicto = eventosExistentes.some(ev => {
        const mismaFecha = ev.start.toISOString().slice(0, 16) === fechaEvento.toISOString().slice(0, 16);
        const mismaUbicacion = ev.extendedProps.ubicacion?.toLowerCase() === ubicacion.trim().toLowerCase();
        return mismaFecha && mismaUbicacion;
      });

      if (hayConflicto) {
        return "Ya existe un evento programado en ese lugar y hora. Por favor elige otro horario o ubicación";
      }

      return true;
    };

    form.onsubmit = function (e) {
      e.preventDefault();

      const resultadoValidacion = validarFormulario();

      if (resultadoValidacion !== true) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: "Error en el formulario",
            text: resultadoValidacion,
            icon: "error",
            confirmButtonColor: '#dc3545'
          });
        } else {
          alert(resultadoValidacion);
        }
        return;
      }
      // Si la validación es exitosa, agregar el evento
      const titulo = document.getElementById("titulo").value.trim();
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const ubicacion = document.getElementById("ubicacion").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const fechaEvento = new Date(fecha + "T" + hora);
      // Agregar evento al calendario
      calendar.addEvent({
        title: `[Pendiente] ${titulo}`,
        start: fechaEvento,
        extendedProps: {
          descripcion,
          ubicacion
        }
      });
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: "¡Evento enviado!",
          text: "Su evento ha sido enviado para aprobación exitosamente.",
          icon: "success",
          confirmButtonColor: '#28a745',
          confirmButtonText: 'Continuar'
        }).then(() => {
          form.reset();
        });
      } else {
        alert("Evento agregado y enviado para aprobación.");
        form.reset();
      }
    };
  });
});
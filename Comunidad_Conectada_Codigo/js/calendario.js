document.addEventListener("DOMContentLoaded", function () {
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
  alert(
    "Evento: " + info.event.title + "\n" +
    "Inicio: " + info.event.start.toLocaleString() + "\n" +
    "Ubicación: " + info.event.extendedProps.ubicacion + "\n" +
    "Descripción: " + info.event.extendedProps.descripcion
      );
  }

  });

  calendar.render();

  const form = document.getElementById("formEvento");

  form.onsubmit = function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validaciones
    if (titulo.length < 5 || titulo.length > 100) {
      alert("El título debe tener entre 5 y 100 caracteres.");
      return;
    }

    const fechaEvento = new Date(fecha + "T" + hora);
    const fechaActual = new Date();
    if (!fecha || fechaEvento <= fechaActual) {
      alert("La fecha debe ser posterior a la fecha y hora actual.");
      return;
    }

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(hora)) {
      alert("La hora debe estar en formato 24 horas (HH:MM).");
      return;
    }

    if (descripcion.length < 20 || descripcion.length > 500) {
      alert("La descripción debe tener entre 20 y 500 caracteres.");
      return;
    }

    if (ubicacion.length < 10 || ubicacion.length > 200) {
      alert("La ubicación debe tener entre 10 y 200 caracteres.");
      return;
    }

    // Validación de conflicto de horarios y lugar
    const eventosExistentes = calendar.getEvents();
    const hayConflicto = eventosExistentes.some(ev => {
      const mismaFecha = ev.start.toISOString().slice(0, 16) === fechaEvento.toISOString().slice(0, 16);
      const mismaUbicacion = ev.extendedProps.ubicacion?.toLowerCase() === ubicacion.toLowerCase();
      return mismaFecha && mismaUbicacion;
    });

    if (hayConflicto) {
      alert("Ya existe un evento programado en ese lugar y hora. Por favor elige otro horario o ubicación.");
      return;
    }

    // Agregar evento al calendario
    calendar.addEvent({
      title: `[Pendiente] ${titulo}`,
      start: fechaEvento,
      extendedProps: {
        descripcion,
        ubicacion
      }
    });

    alert("Evento agregado y enviado para aprobación.");
    form.reset();
  };
});









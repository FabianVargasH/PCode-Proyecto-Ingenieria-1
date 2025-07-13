document.getElementById('btn-agregar').addEventListener('click', function () {
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const fechaCaducidad = document.getElementById("fecha-caducidad").value;

    if (titulo.length < 5 || titulo.length > 100) {
            alert('El título debe tener entre 5 y 100 caracteres.');
            return;
        }
            
// Función para validar el formulario
const mostrarMensajeErrorAnuncio = (input, mensaje) => {
    let error = input.parentElement.querySelector('.error-message');
    if (!error) {
        error = document.createElement('span');
        error.className = 'error-message';
        input.parentElement.appendChild(error);
    }

    if (mensaje) {
        input.classList.add('error');
    } else {
        input.classList.remove('error');

    }
};

const validarFormularioAnuncio = () => {
    let formularioEsValido = true;
    let primerError = null;

    for (const campo in reglasValidacionAnuncio) {
        const input = camposAnuncio[campo];
        const resultado = reglasValidacionAnuncio[campo](input);

        if (resultado !== true) {
            mostrarMensajeErrorAnuncio(input, resultado);
            if (!primerError) primerError = input;
            formularioEsValido = false;
        } else {
            mostrarMensajeErrorAnuncio(input, null);
        }
    }

    return formularioEsValido;
};


alert('Anuncio creado exitosamente. Por favor espera a que sea aprobado por el administrador.');

});
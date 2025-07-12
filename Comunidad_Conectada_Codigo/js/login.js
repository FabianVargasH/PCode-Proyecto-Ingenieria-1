const formularioLogin = document.getElementById('formLogin');
const botonIniciarSesion = document.getElementById('btnIniciarSesion');
const campoEmail = document.getElementById('txtEmail');
const campoContrasena = document.getElementById('txtContrasenna');

const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mensajes de error
const mensajesError = {
    emailVacio: 'Por favor ingrese su correo electrónico',
    emailInvalido: 'Formato de correo inválido (ejemplo de formato: usuario@dominio.com)',
    contrasenaVacia: 'Por favor ingrese su contraseña'
};
//Funcion para mostrar el error al ususario
function mostrarError(campo, mensaje) {
    const grupo = campo.parentElement;
    let mensajeError = grupo.querySelector('.mensaje-error');
    
    if (mensajeError) {
        mensajeError.textContent = mensaje;
    }
    campo.classList.add('campo-invalido');
}
//Funcion para limpiar el error de los campos
function limpiarError(campo) {
    const grupo = campo.parentElement;
    const mensajeError = grupo.querySelector('.mensaje-error');
    if (mensajeError) {
        mensajeError.textContent = '';
    }
    campo.classList.remove('campo-invalido');
}
//Funcion para validar el Email
function validarEmail() {
    const email = campoEmail.value.trim();
    if (!email) {
        mostrarError(campoEmail, mensajesError.emailVacio);
        return false;
    }
    if (!expresionEmail.test(email)) {
        mostrarError(campoEmail, mensajesError.emailInvalido);
        return false;
    }
    limpiarError(campoEmail);
    return true;
}
function validarContrasena() {
    const contrasena = campoContrasena.value;
    if (!contrasena) {
        mostrarError(campoContrasena, mensajesError.contrasenaVacia);
        return false;
    }
    limpiarError(campoContrasena);
    return true;
}
//Funcion para validar formulario
function validarFormulario() {
    let primerError = null;
    // Validar email
    const email = campoEmail.value.trim();
    if (!email) {
        mostrarError(campoEmail, mensajesError.emailVacio);
        if (!primerError) {
            primerError = { 
                campo: campoEmail, 
                mensaje: mensajesError.emailVacio 
            };
        }
    } else if (!expresionEmail.test(email)) {
        mostrarError(campoEmail, mensajesError.emailInvalido);
        if (!primerError) {
            primerError = { 
                campo: campoEmail, 
                mensaje: mensajesError.emailInvalido 
            };
        }
    } else {
        limpiarError(campoEmail);
    }
    // Validar contraseña
    const contrasena = campoContrasena.value;
    if (!contrasena) {
        mostrarError(campoContrasena, mensajesError.contrasenaVacia);
        if (!primerError) {
            primerError = { 
                campo: campoContrasena, 
                mensaje: mensajesError.contrasenaVacia 
            };
        }
    } else {
        limpiarError(campoContrasena);
    }  
    return primerError;
}
function manejarEnvio(evento) {
    evento.preventDefault();
    const error = validarFormulario();
    
    if (error) {
        // Mostrar error 
        Swal.fire({
            title: "¡ERROR! datos incorrectos",
            text: error.mensaje,
            icon: "error",
            confirmButtonColor: '#dc3545'
        });
    } else {
    // Mostrar éxito 
        Swal.fire({
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonColor: 'green',
            confirmButtonText: 'Continuar'
        }).then(() => {
        // Redirigir al dashboard
            window.location.href = '../dashboard/dashboard.html'; 
        });
    }
}
function configurarEventos() {
    // Validaciones en tiempo real (al salir del campo)
    campoEmail.addEventListener('blur', validarEmail);
    campoContrasena.addEventListener('blur', validarContrasena);
    // Evento del botón de iniciar sesión
    botonIniciarSesion.addEventListener('click', manejarEnvio);
}
// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    configurarEventos();
});
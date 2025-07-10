// Variables globales
let slideActual = 0;
let totalSlides = 0;

// Función principal que se ejecuta cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const carouselSlides = document.getElementById('carouselSlides');
    const anteriorBtn = document.getElementById('anteriorBtn');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Verificar que los elementos existan (Validar)
    if (!carouselSlides || !anteriorBtn || !siguienteBtn || slides.length === 0) {
        console.error('No se encontraron los elementos del carrusel');
        return;
    }
    totalSlides = slides.length;
    // Función para mostrar slide
    function mostrarSlide(index) {
        slideActual = index;
        const desplazamiento_horizontal = -slideActual * 100;
        carouselSlides.style.transform = `translateX(${desplazamiento_horizontal}%)`; //Se aplica una transformacion de forma horizontal
    }
    // Función para ir a la siguiente slide
    function siguienteSlide() {
        slideActual++;
        if (slideActual >= totalSlides) {
            slideActual = 0;
        }
        mostrarSlide(slideActual);
    }
    // Función para ir a la slide anterior
    function slideAnterior() {
        slideActual--;
        if (slideActual < 0) {
            slideActual = totalSlides - 1;
        }
        mostrarSlide(slideActual);
    }
    // Event listeners para los botones
    siguienteBtn.addEventListener('click', function() {
        siguienteSlide();
    });
    anteriorBtn.addEventListener('click', function() {
        slideAnterior();
    });
    // Inicializar carrusel
    mostrarSlide(0);
    console.log('Carrusel iniciado');
});
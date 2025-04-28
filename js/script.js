// Inicializar animaciones AOS
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const navItems = document.querySelectorAll('.nav-item');
const logo = document.querySelector('.logo');

// Ajustar posición del logo en el modo escritorio si es necesario
function adjustLogoPosition() {
    if (window.innerWidth > 1100) {
        // Asegurarse de que el logo esté centrado en desktop
        logo.style.position = 'absolute';
        logo.style.left = '50%';
        logo.style.transform = 'translateX(-50%)';
    } else {
        // En móvil, el logo puede tener posicionamiento normal cuando el menú está cerrado
        if (!navContainer.classList.contains('active')) {
            logo.style.position = 'static';
            logo.style.transform = 'none';
        }
    }
}

// Llamar función de ajuste al cargar y al cambiar tamaño
window.addEventListener('load', adjustLogoPosition);
window.addEventListener('resize', adjustLogoPosition);

// Abrir/cerrar menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Ajustar posición del logo cuando se activa el menú móvil
    if (window.innerWidth <= 1100) {
        if (navContainer.classList.contains('active')) {
            // Logo en la parte superior cuando menú está abierto
            logo.style.position = 'absolute';
            logo.style.top = '20px';
            logo.style.left = '50%';
            logo.style.transform = 'translateX(-50%)';
        } else {
            // Logo en posición normal cuando menú está cerrado
            logo.style.position = 'static';
            logo.style.top = 'auto';
            logo.style.transform = 'none';
        }
    }
});

// Manejar clics en enlaces del menú
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si es un enlace interno (empieza con #)
        if (href.startsWith('#')) {
            e.preventDefault();
            
            // Activar el elemento de menú actual
            navItems.forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Obtener el elemento de destino
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Cerrar el menú móvil si está abierto
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navContainer.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    
                    // Restaurar posición del logo
                    if (window.innerWidth <= 1100) {
                        logo.style.position = 'static';
                        logo.style.top = 'auto';
                        logo.style.transform = 'none';
                    }
                }
                
                // Desplazarse al elemento
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } else {
            // Si es un enlace externo, no es necesario preventDefault
            // pero sí cerrar el menú móvil
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Restaurar posición del logo
                if (window.innerWidth <= 1100) {
                    logo.style.position = 'static';
                    logo.style.top = 'auto';
                    logo.style.transform = 'none';
                }
            }
        }
    });
});

// Cambiar elemento activo al hacer scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                const link = item.querySelector(`a[href="#${sectionId}"]`);
                if (link) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Formulario de contacto (simulado)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        alert('¡Gracias por tu interés! En un caso real, aquí se abriría un formulario para agendar una cita.');
    });
}

// Botón volver arriba
const backToTopButton = document.querySelector('.back-to-top');

// Mostrar u ocultar el botón basado en la posición de scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll suave al hacer clic en el botón
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

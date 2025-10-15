document.addEventListener('DOMContentLoaded', () => {
    // Animación de aparición de secciones al hacer scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1 // La sección se activa cuando el 10% es visible para una transición más suave
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Ocultar/mostrar barra de navegación al hacer scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scroll hacia abajo y no estamos en la parte superior
            header.classList.add('hidden');
        } else {
            // Scroll hacia arriba
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Animación de la barra de scroll al scrollear
    let scrollTimer = -1;

    window.addEventListener('scroll', () => {
        // Al empezar a scrollear, añade la clase al body
        document.body.classList.add('scrolling');

        // Limpia el temporizador anterior si existe
        if (scrollTimer !== -1) clearTimeout(scrollTimer);

        // Configura un nuevo temporizador para quitar la clase después de 150ms de inactividad
        scrollTimer = setTimeout(() => document.body.classList.remove('scrolling'), 150);
    });

    // Lógica para las Tabs de Proyectos
    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Quitar clase activa de todas las tabs y paneles
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Añadir clase activa a la tab y panel seleccionados
            const targetPaneId = tab.dataset.tab;
            const targetPane = document.getElementById(targetPaneId);
            
            tab.classList.add('active');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Lógica para el Carrusel de Proyectos
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        showSlide(currentIndex); // Muestra la primera slide al cargar
    });

    // Para la versión mobile (aún no implementada en HTML, pero lista para usar)
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.querySelector('.navbar');

    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Animación de escritura para el título principal
    const typingTitle = document.getElementById('typing-title');
    const text = "Diseñar es traducir experiencias.";
    const typingSpeed = 100; // ms por caracter
    const deletingSpeed = 50; // ms por caracter
    const delayBetween = 3000; // 3 segundos

    async function typeEffectLoop() {
        while (true) {
            // Escribir
            for (let i = 0; i < text.length; i++) {
                typingTitle.textContent += text.charAt(i);
                await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }

            // Pausa
            await new Promise(resolve => setTimeout(resolve, delayBetween));

            // Borrar
            for (let i = text.length; i > 0; i--) {
                typingTitle.textContent = text.substring(0, i - 1);
                await new Promise(resolve => setTimeout(resolve, deletingSpeed));
            }

            // Pausa antes de volver a empezar
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    // Iniciar la animación solo cuando la sección de inicio es visible
    const heroSectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeEffectLoop();
            heroSectionObserver.disconnect(); // Ejecutar solo una vez
        }
    }, { threshold: 0.1 });
    heroSectionObserver.observe(document.getElementById('inicio'));
});
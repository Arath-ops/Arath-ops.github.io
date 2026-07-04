

'use strict';

/* ==============================================================
   PORTAFOLIO — ARATH DÍAZ
   JavaScript Vanilla — sin librerías ni frameworks
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. Referencias generales
    // ============================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTopBtn = document.getElementById('backToTop');

    // ============================
    // Scroll Suave
    // ============================
    // Los enlaces internos (#id) ya usan scroll-behavior: smooth desde
    // el CSS (html { scroll-behavior: smooth; }). Esta función queda
    // preparada como refuerzo por si algún navegador no lo soporta
    // o si en el futuro se agregan enlaces internos dinámicos.
    const enableSmoothScroll = () => {
        const internalLinks = document.querySelectorAll('a[href^="#"]');

        internalLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');

                // Ignorar enlaces vacíos o solo "#"
                if (!targetId || targetId === '#') return;

                const targetEl = document.querySelector(targetId);
                if (!targetEl) return;

                event.preventDefault();

                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Si el menú móvil está abierto, cerrarlo al navegar
                closeMobileMenu();
            });
        });
    };

    // ============================
    // Fade In Sections
    // ============================
    // Agrega la clase "visible" a cada sección cuando entra en pantalla.
    // Se usa Intersection Observer para evitar escuchar el evento scroll.
    const enableFadeInSections = () => {
        if (!('IntersectionObserver' in window) || sections.length === 0) return;

        const fadeInObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        sections.forEach((section) => fadeInObserver.observe(section));
    };

    // ============================
    // Menú Móvil (Hamburguesa)
    // ============================
    // El botón (.nav-toggle) y el menú (.nav-menu) ya existen en el
    // HTML actual, por lo que la función se activa solo si ambos
    // elementos están presentes en el DOM.
    const toggleMobileMenu = () => {
        if (!navToggle || !navMenu) return;

        const isOpen = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMobileMenu = () => {
        if (!navToggle || !navMenu) return;
        if (!navMenu.classList.contains('is-open')) return;

        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    const enableMobileMenu = () => {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', toggleMobileMenu);

        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = navToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });
    };

    /*
    // ------------------------------------------------------------
    // Referencia futura (por si el botón hamburguesa se reemplaza
    // o se agrega uno nuevo con otro id/clase):
    //
    // const futureNavToggle = document.querySelector('.nav-toggle');
    // const futureNavMenu = document.querySelector('.nav-menu');
    //
    // if (futureNavToggle && futureNavMenu) {
    //     futureNavToggle.addEventListener('click', () => {
    //         futureNavMenu.classList.toggle('is-open');
    //     });
    // }
    // ------------------------------------------------------------
    */

    // ============================
    // Resaltado del Enlace Activo
    // ============================
    // Marca con la clase "active" el enlace del menú correspondiente
    // a la sección visible en pantalla. Utiliza Intersection Observer,
    // sin cálculos manuales de posición de scroll.
    const enableActiveLinkHighlight = () => {
        if (!('IntersectionObserver' in window) || sections.length === 0 || navLinks.length === 0) return;

        const setActiveLink = (id) => {
            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${id}`;
                link.classList.toggle('active', isActive);
            });
        };

        const activeLinkObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLink(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        sections.forEach((section) => activeLinkObserver.observe(section));
    };

    // ============================
    // Botón "Volver Arriba"
    // ============================
    // El botón todavía no existe en el HTML actual. La función queda
    // preparada y solo se activará automáticamente si en el futuro
    // se agrega un elemento con id="backToTop" al documento.
    const enableBackToTop = () => {
        if (!backToTopBtn) return;

        const SCROLL_THRESHOLD = 400;

        window.addEventListener('scroll', () => {
            const shouldShow = window.scrollY > SCROLL_THRESHOLD;
            backToTopBtn.classList.toggle('visible', shouldShow);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    /*
    // ------------------------------------------------------------
    // Ejemplo de marcado HTML para habilitar el botón "Volver arriba"
    // cuando se agregue al proyecto (no se modifica el HTML actual):
    //
    // <button id="backToTop" class="back-to-top" aria-label="Volver arriba">
    //     ↑
    // </button>
    // ------------------------------------------------------------
    */

    // ============================
    // Inicialización
    // ============================
    enableSmoothScroll();
    enableFadeInSections();
    enableMobileMenu();
    enableActiveLinkHighlight();
    enableBackToTop();

});

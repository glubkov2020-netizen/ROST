(function () {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            burger.classList.toggle('is-active');
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                burger.classList.remove('is-active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                burger.classList.remove('is-active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Закрытие по клику вне меню
        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('is-open')) return;
            if (nav.contains(e.target) || burger.contains(e.target)) return;
            nav.classList.remove('is-open');
            burger.classList.remove('is-active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    }

    if (header) {
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                header.classList.toggle('is-scrolled', window.scrollY > 8);
                ticking = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
})();
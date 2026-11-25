(function () {
    const root = document.createElement('div');
    root.className = 'toast-stack';
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(root));

    const show = (msg, type = 'success') => {
        const el = document.createElement('div');
        el.className = `toast toast--${type}`;
        el.innerHTML = `<span class="toast__icon">${type === 'success' ? '✓' : type === 'error' ? '!' : 'i'}</span><span class="toast__text">${msg}</span>`;
        root.appendChild(el);
        requestAnimationFrame(() => el.classList.add('is-visible'));
        setTimeout(() => {
            el.classList.remove('is-visible');
            setTimeout(() => el.remove(), 350);
        }, 2400);
    };

    window.ObrazToast = { show };

    document.addEventListener('DOMContentLoaded', () => {
        if (!window.ObrazStore) return;
        // Слушаем события изменения данных и показываем тост,
        // но не перезаписываем методы сохранения — так чище и надёжнее.
        window.addEventListener('obraz:data-changed', () => {
            if (window.__obrazSuppressToast) return;
            show('Изменения сохранены');
        });
    });
})();
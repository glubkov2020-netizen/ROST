(function () {
    const toast = (msg, type = 'success') => {
        if (window.ObrazToast) window.ObrazToast.show(msg, type);
        else alert(msg);
    };

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('[name="name"]').value.trim();
            const contact = contactForm.querySelector('[name="contact"]').value.trim();
            if (!name || !contact) {
                toast('Пожалуйста, заполните имя и контакт.', 'error');
                return;
            }
            toast('Заявка отправлена! Я свяжусь с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fd = new FormData(reviewForm);
            const name = (fd.get('name') || '').toString().trim();
            const role = (fd.get('role') || '').toString().trim();
            const rating = Number(fd.get('rating')) || 5;
            const text = (fd.get('message') || '').toString().trim();
            if (!name || !text) {
                toast('Пожалуйста, заполните имя и текст отзыва.', 'error');
                return;
            }
            const d = window.ObrazStore.load();
            d.reviewsPage.items.push({ name, role, rating, text, status: 'pending' });
            window.ObrazStore.save(d);
            toast('Спасибо! Отзыв отправлен на модерацию.');
            reviewForm.reset();
        });
    }
})();
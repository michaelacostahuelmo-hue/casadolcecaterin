document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       MENÚ MÓVIL
    ========================== */

    const mobileMenuBtn =
        document.getElementById('mobile-menu-btn');

    const mobileMenu =
        document.getElementById('mobile-menu');

    const mobileLinks =
        document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener('click', () => {

            mobileMenu.classList.toggle('hidden');

        });

        mobileLinks.forEach(link => {

            link.addEventListener('click', () => {

                mobileMenu.classList.add('hidden');

            });

        });

    }

    /* ==========================
       FILTRO DE MENÚ
    ========================== */

    const filterBtns =
        document.querySelectorAll('.menu-filter-btn');

    const menuItems =
        document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            filterBtns.forEach(b => {

                b.classList.remove(
                    'active',
                    'bg-dolce-gold',
                    'text-dolce-black'
                );

                b.classList.add(
                    'bg-dolce-card',
                    'text-stone-200'
                );

            });

            btn.classList.add(
                'active',
                'bg-dolce-gold',
                'text-dolce-black'
            );

            btn.classList.remove(
                'bg-dolce-card',
                'text-stone-200'
            );

            const category =
                btn.dataset.category;

            menuItems.forEach(item => {

                const itemCategory =
                    item.dataset.category;

                if (
                    category === 'all' ||
                    itemCategory === category
                ) {

                    item.style.display = 'block';

                    item.classList.remove('fade-in');

                    void item.offsetWidth;

                    item.classList.add('fade-in');

                } else {

                    item.style.display = 'none';

                }

            });

        });

    });

    /* ==========================
       COTIZADOR
    ========================== */

    const guestsSlider =
        document.getElementById('guests-slider');

    const guestsValue =
        document.getElementById('guests-value');

    const serviceStyle =
        document.getElementById('service-style');

    const summaryTitle =
        document.getElementById('summary-title');

    const summaryDetails =
        document.getElementById('summary-details');

    const calcWhatsappSend =
        document.getElementById('calc-whatsapp-send');

    const eventOptions =
        document.querySelectorAll(
            'input[name="event_type"]'
        );

    function updateCalculator() {

        if (
            !guestsSlider ||
            !serviceStyle
        ) return;

        const guests =
            guestsSlider.value;

        const selectedEvent =
            document.querySelector(
                'input[name="event_type"]:checked'
            );

        const eventType =
            selectedEvent
                ? selectedEvent.value
                : 'Evento';

        const serviceText =
            serviceStyle.options[
                serviceStyle.selectedIndex
            ].text;

        if (guestsValue) {

            guestsValue.textContent =
                guests;

        }

        if (summaryTitle) {

            summaryTitle.textContent =
                eventType;

        }

        if (summaryDetails) {

            summaryDetails.textContent =
                `${guests} personas — ${serviceText}`;

        }

        const whatsappMsg =
            encodeURIComponent(
                `Hola Casa Dolce Catering! Estuve viendo su página web y quiero pedir presupuesto:\n\n` +
                `• Tipo de evento: ${eventType}\n` +
                `• Cantidad de personas: ${guests}\n` +
                `• Formato seleccionado: ${serviceText}\n\n` +
                `¿Tienen disponibilidad de fecha? Muchas gracias.`
            );

        if (calcWhatsappSend) {

            calcWhatsappSend.href =
                `https://wa.me/59892986559?text=${whatsappMsg}`;

        }

    }

    if (guestsSlider) {

        guestsSlider.addEventListener(
            'input',
            updateCalculator
        );

    }

    if (serviceStyle) {

        serviceStyle.addEventListener(
            'change',
            updateCalculator
        );

    }

    eventOptions.forEach(radio => {

        radio.addEventListener(
            'change',
            updateCalculator
        );

    });

    updateCalculator();

});
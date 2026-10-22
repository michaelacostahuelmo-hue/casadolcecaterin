document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ MÓVIL
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

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

    // 2. FILTRADO DE MENÚ & PLATOS
    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-dolce-gold', 'text-dolce-black');
                b.classList.add('bg-dolce-card', 'text-stone-200');
            });

            btn.classList.add('active', 'bg-dolce-gold', 'text-dolce-black');
            btn.classList.remove('bg-dolce-card', 'text-stone-200');

            const category = btn.getAttribute('data-category');

            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. COTIZADOR Y ENVIADOR DE WHATSAPP AL 092986559
    const guestsSlider = document.getElementById('guests-slider');
    const guestsValue = document.getElementById('guests-value');
    const serviceStyle = document.getElementById('service-style');
    const summaryTitle = document.getElementById('summary-title');
    const summaryDetails = document.getElementById('summary-details');
    const calcWhatsappSend = document.getElementById('calc-whatsapp-send');

    if (guestsSlider && serviceStyle) {
        function updateCalculator() {
            const guests = guestsSlider.value;
            const selectedEvent = document.querySelector('input[name="event_type"]:checked');
            const eventType = selectedEvent ? selectedEvent.value : 'Evento';
            const styleText = serviceStyle.options[serviceStyle.selectedIndex].text;

            if (guestsValue) guestsValue.textContent = guests;
            if (summaryTitle) summaryTitle.textContent = `${eventType}`;
            if (summaryDetails) summaryDetails.textContent = `${guests} personas — ${styleText}`;

            const whatsappMsg = encodeURIComponent(
                `Hola Casa Dolce Catering! Estuve viendo su página web y quiero pedir presupuesto:\n\n` +
                `• Tipo de evento: ${eventType}\n` +
                `• Cantidad de personas: ${guests}\n` +
                `• Formato seleccionado: ${styleText}\n\n` +
                `¿Tienen disponibilidad de fecha? ¡Muchas gracias!`
            );

            if (calcWhatsappSend) {
                calcWhatsappSend.href = `https://wa.me/59892986559?text=${whatsappMsg}`;
            }
        }

        guestsSlider.addEventListener('input', updateCalculator);
        serviceStyle.addEventListener('change', updateCalculator);
        document.querySelectorAll('input[name="event_type"]').forEach(radio => {
            radio.addEventListener('change', updateCalculator);
        });

        updateCalculator();
    }

});
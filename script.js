// JavaScript para StrongKids Play Gym

document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const inscripcionForm = document.getElementById('inscripcion-form');
    
    // Funcionalidad del menú hamburguesa
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Cambiar ícono del botón
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Cerrar menú móvil al hacer clic en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
    
    // Smooth scroll para enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.bg-white, .bg-gray-100');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Funcionalidad del formulario de inscripción
    if (inscripcionForm) {
        inscripcionForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = inscripcionForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            // Validar campos antes de enviar
            const inputs = inscripcionForm.querySelectorAll('input, select');
            let allValid = true;
            inputs.forEach(i => { if (!validateField(i)) allValid = false; });
            if (!allValid) {
                showFormMessage('Por favor corrige los campos marcados.', 'error');
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                return;
            }

            try {
                // Adjuntar carrito al envío
                const cartHiddenInput = document.getElementById('carrito-json');
                if (cartHiddenInput && typeof cartState !== 'undefined') {
                    cartHiddenInput.value = JSON.stringify(cartState.items || []);
                }
                const formData = new FormData(inscripcionForm);
                const response = await fetch(inscripcionForm.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                if (response.ok) {
                    showFormMessage('¡Inscripción enviada exitosamente! Te contactaremos pronto.', 'success');
                    inscripcionForm.reset();
                } else {
                    const data = await response.json().catch(() => null);
                    const msg = data && data.errors ? data.errors.map(e => e.message).join(', ') : 'Ocurrió un error. Intenta de nuevo.';
                    showFormMessage(msg, 'error');
                }
            } catch (err) {
                showFormMessage('No se pudo conectar. Verifica tu internet e inténtalo nuevamente.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                const message = document.querySelector('.form-message');
                if (message) message.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Validación en tiempo real
        const formInputs = inscripcionForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remover clases de error al escribir
                this.classList.remove('border-red-500');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
    
    // Función para validar campos del formulario
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';
        
        // Remover mensaje de error anterior
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validaciones específicas
        switch(fieldName) {
            case 'nombre-padre':
            case 'nombre-nino':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un email válido';
                }
                break;
                
            case 'telefono':
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un teléfono válido';
                }
                break;
                
            case 'edad-nino':
                const age = parseInt(value);
                if (age < 3 || age > 17) {
                    isValid = false;
                    errorMessage = 'La edad debe estar entre 3 y 17 años';
                }
                break;
                
            case 'plan-membresia':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Por favor selecciona un plan';
                }
                break;
        }
        
        // Mostrar error si es necesario
        if (!isValid) {
            field.classList.add('border-red-500');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        } else {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
        }
        
        return isValid;
    }
    
    // Función para mostrar mensajes del formulario
    function showFormMessage(message, type) {
        // Remover mensaje anterior si existe
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insertar después del formulario
        inscripcionForm.parentNode.insertBefore(messageDiv, inscripcionForm.nextSibling);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    // Efectos de hover para las tarjetas
    const featureCards = document.querySelectorAll('.bg-gradient-to-br');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
    
    // Contador animado para estadísticas (si se agregan)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#inicio');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Lazy loading para imágenes (si se agregan)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Funcionalidad del chatbot placeholder - DESACTIVADO
    // const chatbotPlaceholder = document.createElement('div');
    // chatbotPlaceholder.className = 'chatbot-placeholder';
    // chatbotPlaceholder.innerHTML = '<i class="fas fa-comments"></i>';
    // chatbotPlaceholder.setAttribute('aria-label', 'Abrir chat de soporte');
    
    // chatbotPlaceholder.addEventListener('click', function() {
    //     // Aquí se integraría la funcionalidad real del chatbot
    //     alert('¡Hola! Soy el asistente virtual de StrongKids. Pronto estaré disponible para ayudarte con tus consultas.');
    // });
    
    // document.body.appendChild(chatbotPlaceholder);
    
    // // Mostrar chatbot después de 3 segundos
    // setTimeout(() => {
    //     chatbotPlaceholder.style.opacity = '0';
    //     chatbotPlaceholder.style.transform = 'scale(0)';
    //     chatbotPlaceholder.style.transition = 'all 0.3s ease';
        
    //     setTimeout(() => {
    //         chatbotPlaceholder.style.opacity = '1';
    //         chatbotPlaceholder.style.transform = 'scale(1)';
    //     }, 100);
    // }, 3000);
    
    // Prevenir envío accidental del formulario con Enter
    inscripcionForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
        }
    });
    
    // Mejorar accesibilidad del teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Cerrar menú móvil con Escape
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            }
        }
    });
    
    // ===== Carrusel StrongKids =====
    const track = document.querySelector('.sk-carousel-track');
    const slides = track ? Array.from(track.querySelectorAll('.sk-slide')) : [];
    const btnPrev = document.querySelector('.sk-prev');
    const btnNext = document.querySelector('.sk-next');
    const dotsWrap = document.querySelector('.sk-dots');

    if (track && slides.length && dotsWrap) {
        let current = 0;
        let autoplayTimer = null;
        const AUTOPLAY_MS = 4000;

        // Crear indicadores (dots)
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
            if (i === 0) dot.setAttribute('aria-selected', 'true');
            dotsWrap.appendChild(dot);
        });

        const dots = Array.from(dotsWrap.querySelectorAll('button'));

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            const offset = -current * 100;
            track.style.transform = `translateX(${offset}%)`;
            slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
            dots.forEach((d, i) => d.setAttribute('aria-selected', i === current ? 'true' : 'false'));
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(next, AUTOPLAY_MS);
        }
        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = null;
        }

        // Eventos
        if (btnNext) btnNext.addEventListener('click', () => { next(); startAutoplay(); });
        if (btnPrev) btnPrev.addEventListener('click', () => { prev(); startAutoplay(); });
        dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));

        // Gestos (swipe / drag)
        let startX = 0;
        let deltaX = 0;
        const onStart = (e) => { startX = e.touches ? e.touches[0].clientX : e.clientX; deltaX = 0; stopAutoplay(); };
        const onMove = (e) => { const x = e.touches ? e.touches[0].clientX : e.clientX; deltaX = x - startX; };
        const onEnd = () => { if (Math.abs(deltaX) > 50) { deltaX < 0 ? next() : prev(); } startAutoplay(); };

        track.addEventListener('touchstart', onStart, { passive: true });
        track.addEventListener('touchmove', onMove, { passive: true });
        track.addEventListener('touchend', onEnd);
        track.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);

        // Pausar al pasar el mouse (desktop)
        const carouselRoot = document.querySelector('.sk-carousel');
        if (carouselRoot && matchMedia('(hover:hover)').matches) {
            carouselRoot.addEventListener('mouseenter', stopAutoplay);
            carouselRoot.addEventListener('mouseleave', startAutoplay);
        }

        // Inicializar
        goTo(0);
        startAutoplay();
    }

    // ===== Carrito StrongKids =====
    const cartState = { items: [], prices: { basico: 50000, premium: 120000, ilimitado: 180000 } };
    const planSelect = document.getElementById('plan-membresia');
    const qtyInput = document.getElementById('cantidad-plan');
    const addBtn = document.getElementById('btn-agregar-carrito');
    const cartItemsEl = document.getElementById('sk-cart-items');
    const cartTotalEl = document.getElementById('sk-cart-total');
    const cartClearBtn = document.getElementById('sk-cart-clear');
    const cartHiddenInputInit = document.getElementById('carrito-json');
    const headerCartBtn = document.getElementById('header-cart-btn');
    const headerCartCount = document.getElementById('header-cart-count');
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutClose = document.getElementById('checkout-close');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutPay = document.getElementById('checkout-pay');

    function planDisplayName(value) {
        switch (value) {
            case 'basico': return 'Plan Básico - 2 clases/semana';
            case 'premium': return 'Plan Premium - 4 clases/semana';
            case 'ilimitado': return 'Plan Ilimitado - Acceso completo';
            default: return 'Plan';
        }
    }

    function renderCart() {
        if (!cartItemsEl) return;
        cartItemsEl.innerHTML = '';
        let totalQty = 0;
        cartState.items.forEach((item, idx) => {
            totalQty += item.quantity;
            const row = document.createElement('div');
            row.className = 'sk-cart-item';
            row.innerHTML = `
                <div class="sk-item-name">${planDisplayName(item.plan)}</div>
                <div class="sk-item-qty">
                    <button type="button" aria-label="Disminuir" data-idx="${idx}" data-action="dec">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" aria-label="Aumentar" data-idx="${idx}" data-action="inc">+</button>
                </div>
                <div></div>
                <button type="button" class="sk-item-remove" aria-label="Eliminar" data-idx="${idx}" data-action="remove">Eliminar</button>
            `;
            cartItemsEl.appendChild(row);
        });
        if (cartTotalEl) cartTotalEl.textContent = String(totalQty);
        if (headerCartCount) headerCartCount.textContent = String(totalQty);
        if (cartHiddenInputInit) cartHiddenInputInit.value = JSON.stringify(cartState.items);
    }

    function addToCart(plan, quantity) {
        if (!plan) return;
        const qty = Math.max(1, parseInt(quantity || '1', 10));
        const existing = cartState.items.find(i => i.plan === plan);
        if (existing) existing.quantity += qty; else cartState.items.push({ plan, quantity: qty });
        renderCart();
        showFormMessage('Plan agregado al carrito.', 'success');
    }

    function updateItem(idx, action) {
        const item = cartState.items[idx];
        if (!item) return;
        if (action === 'inc') item.quantity += 1;
        if (action === 'dec') item.quantity = Math.max(1, item.quantity - 1);
        if (action === 'remove') cartState.items.splice(idx, 1);
        renderCart();
    }

    if (addBtn && planSelect && qtyInput) {
        addBtn.addEventListener('click', () => {
            const plan = planSelect.value;
            const qty = qtyInput.value;
            if (!plan) { showFormMessage('Selecciona un plan antes de agregar.', 'error'); return; }
            addToCart(plan, qty);
        });
    }

    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', (e) => {
            const target = e.target;
            if (!(target instanceof Element)) return;
            const idx = target.getAttribute('data-idx');
            const action = target.getAttribute('data-action');
            if (idx !== null && action) updateItem(parseInt(idx, 10), action);
        });
    }

    if (cartClearBtn) {
        cartClearBtn.addEventListener('click', () => { cartState.items = []; renderCart(); });
    }

    // Checkout modal helpers
    function formatCurrency(value) {
        try {
            return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
        } catch (e) {
            return `$${value}`;
        }
    }

    function renderCheckout() {
        if (!checkoutItems) return;
        checkoutItems.innerHTML = '';
        let subtotal = 0;
        cartState.items.forEach((item) => {
            const unit = cartState.prices[item.plan] || 0;
            const line = unit * item.quantity;
            subtotal += line;
            const row = document.createElement('div');
            row.className = 'sk-checkout-item';
            row.innerHTML = `
                <div class="sk-checkout-name">${planDisplayName(item.plan)}</div>
                <div class="sk-checkout-qty">x ${item.quantity}</div>
                <div class="sk-checkout-price">${formatCurrency(line)}</div>
            `;
            checkoutItems.appendChild(row);
        });
        if (checkoutSubtotal) checkoutSubtotal.textContent = formatCurrency(subtotal);
    }

    function openCheckout() {
        if (!checkoutModal) return;
        renderCheckout();
        checkoutModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeCheckout() {
        if (!checkoutModal) return;
        checkoutModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (headerCartBtn) headerCartBtn.addEventListener('click', openCheckout);
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
    if (checkoutModal) checkoutModal.addEventListener('click', (e) => { if (e.target === checkoutModal) closeCheckout(); });
    if (checkoutPay) checkoutPay.addEventListener('click', () => { closeCheckout(); showFormMessage('Redirigiendo a pago... (demo)', 'success'); });

    // Inicializar carrito
    renderCart();

    console.log('StrongKids Play Gym - Landing Page cargada exitosamente');
});

function filterServices(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.service-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        card.classList.remove('hidden');
        if (category !== 'todos' && card.dataset.category !== category) {
            card.classList.add('hidden');
        }
    });
}

 const video = document.getElementById("gymVideo");
  const controlButton = document.getElementById("controlButton");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");

  // Al hacer clic en el botón
  controlButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
      setTimeout(() => controlButton.classList.add("fade-out"), 700);
    } else {
      video.pause();
      pauseIcon.classList.add("hidden");
      playIcon.classList.remove("hidden");
      controlButton.classList.remove("fade-out");
    }
  });

  // Cuando se pausa el video
  video.addEventListener("pause", () => {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    controlButton.classList.remove("fade-out");
  });

  // Cuando termina
  video.addEventListener("ended", () => {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    controlButton.classList.remove("fade-out");
  });
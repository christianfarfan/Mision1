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
        inscripcionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar estado de carga
            const submitButton = inscripcionForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Simular envío (aquí se integraría con Formspree)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showFormMessage('¡Inscripción enviada exitosamente! Te contactaremos pronto.', 'success');
                
                // Resetear formulario
                inscripcionForm.reset();
                
                // Restaurar botón
                submitButton.textContent = originalText;
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
                // Scroll al mensaje
                const message = document.querySelector('.form-message');
                if (message) {
                    message.scrollIntoView({ behavior: 'smooth' });
                }
            }, 2000);
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
    
    // Chatbot Chatbase con Sonidos
    let chatbaseWidget = null;
    let isChatbaseOpen = false;
    
    // Sonidos del chatbot
    const playSound = (type) => {
        try {
            if (window.StrongKidsSounds && window.StrongKidsSounds[type]) {
                window.StrongKidsSounds[type]();
            }
        } catch (e) {
            console.log('Sonido no disponible:', e);
        }
    };
    
    // Detectar cuando el chatbot de Chatbase se abre
    const detectChatbaseOpen = () => {
        const checkInterval = setInterval(() => {
            // Buscar el widget de Chatbase
            const chatbaseIframe = document.querySelector('iframe[src*="chatbase"]') || 
                                 document.querySelector('[data-chatbase-widget]') ||
                                 document.querySelector('#chatbase-widget') ||
                                 document.querySelector('.chatbase-widget');
            
            if (chatbaseIframe && !chatbaseWidget) {
                chatbaseWidget = chatbaseIframe;
                console.log('Chatbot Chatbase detectado');
                
                // Observar cambios en el iframe
                observeChatbaseChanges();
                clearInterval(checkInterval);
            }
        }, 1000);
        
        // Timeout de seguridad
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 15000);
    };
    
    // Observar cambios en el chatbot de Chatbase
    const observeChatbaseChanges = () => {
        if (!chatbaseWidget) return;
        
        // Crear un observer para detectar cambios en el DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Verificar si el chatbot se abrió
                    const chatContainer = document.querySelector('[class*="chat"]') ||
                                        document.querySelector('[class*="widget"]') ||
                                        document.querySelector('[class*="popup"]');
                    
                    if (chatContainer && !isChatbaseOpen) {
                        isChatbaseOpen = true;
                        console.log('Chatbot Chatbase abierto');
                        playSound('open');
                    }
                }
            });
        });
        
        // Observar cambios en el documento
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // También observar el iframe si es posible
        if (chatbaseWidget.contentDocument) {
            observer.observe(chatbaseWidget.contentDocument.body, {
                childList: true,
                subtree: true
            });
        }
    };
    
    // Detectar clics en el botón del chatbot
    const detectChatbaseClicks = () => {
        // Interceptar todos los clics
        document.addEventListener('click', (e) => {
            // Buscar si el clic fue en un elemento relacionado con Chatbase
            const chatbaseButton = e.target.closest('[class*="chat"]') ||
                                 e.target.closest('[class*="widget"]') ||
                                 e.target.closest('[class*="button"]') ||
                                 e.target.closest('button') ||
                                 e.target.closest('[data-chatbase]') ||
                                 e.target.closest('[id*="chat"]');
            
            if (chatbaseButton && !isChatbaseOpen) {
                // Verificar si es el botón del chatbot
                const buttonText = chatbaseButton.textContent?.toLowerCase() || '';
                const buttonClass = chatbaseButton.className?.toLowerCase() || '';
                const buttonId = chatbaseButton.id?.toLowerCase() || '';
                
                if (buttonText.includes('chat') || 
                    buttonText.includes('help') || 
                    buttonText.includes('support') ||
                    buttonClass.includes('chat') ||
                    buttonClass.includes('widget') ||
                    buttonId.includes('chat')) {
                    
                    console.log('Botón del chatbot detectado, reproduciendo sonido...');
                    playSound('open');
                    
                    // Marcar como abierto después de un delay
                    setTimeout(() => {
                        isChatbaseOpen = true;
                    }, 1000);
                }
            }
        });
        
        // También interceptar eventos de mouseover en botones
        document.addEventListener('mouseover', (e) => {
            const button = e.target.closest('button, [role="button"], [class*="button"]');
            if (button) {
                const buttonText = button.textContent?.toLowerCase() || '';
                const buttonClass = button.className?.toLowerCase() || '';
                
                if ((buttonText.includes('chat') || buttonClass.includes('chat')) && !isChatbaseOpen) {
                    // Reproducir sonido de notificación al pasar el mouse
                    playSound('notification');
                }
            }
        });
    };
    
    // Detectar respuestas del chatbot
    const detectChatbaseResponses = () => {
        const responseObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Buscar mensajes del bot
                    const botMessages = document.querySelectorAll('[class*="message"]:not([class*="user"])') ||
                                      document.querySelectorAll('[class*="bot"]') ||
                                      document.querySelectorAll('[class*="assistant"]');
                    
                    if (botMessages.length > 0) {
                        // Verificar si hay un mensaje nuevo
                        const lastMessage = botMessages[botMessages.length - 1];
                        if (lastMessage && !lastMessage.dataset.soundPlayed) {
                            lastMessage.dataset.soundPlayed = 'true';
                            playSound('response');
                        }
                    }
                }
            });
        });
        
        responseObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
    
    // Método adicional para detectar el chatbot de Chatbase
    const detectChatbaseWidget = () => {
        // Buscar el widget de Chatbase de manera más específica
        const chatbaseSelectors = [
            'iframe[src*="chatbase"]',
            '[data-chatbase-widget]',
            '#chatbase-widget',
            '.chatbase-widget',
            '[class*="chatbase"]',
            '[id*="chatbase"]'
        ];
        
        for (const selector of chatbaseSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log('Widget de Chatbase encontrado:', selector);
                
                // Agregar listener para clics en el widget
                element.addEventListener('click', () => {
                    if (!isChatbaseOpen) {
                        console.log('Chatbot Chatbase abierto por clic');
                        playSound('open');
                        isChatbaseOpen = true;
                    }
                });
                
                // Observar cambios en el widget
                const widgetObserver = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && 
                            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                            
                            const element = mutation.target;
                            const style = element.style.display || '';
                            const className = element.className || '';
                            
                            // Verificar si el widget se hizo visible
                            if ((style.includes('block') || style.includes('flex') || 
                                 className.includes('open') || className.includes('visible')) && 
                                !isChatbaseOpen) {
                                
                                console.log('Chatbot Chatbase abierto por cambio de atributo');
                                playSound('open');
                                isChatbaseOpen = true;
                            }
                        }
                    });
                });
                
                widgetObserver.observe(element, {
                    attributes: true,
                    attributeFilter: ['style', 'class']
                });
                
                break;
            }
        }
    };
    
    // Inicializar detección del chatbot
    const initializeChatbaseDetection = () => {
        detectChatbaseOpen();
        detectChatbaseClicks();
        detectChatbaseResponses();
        detectChatbaseWidget();
        
        // Verificar periódicamente si el chatbot se ha cargado
        const periodicCheck = setInterval(() => {
            detectChatbaseWidget();
        }, 2000);
        
        // Limpiar el intervalo después de 30 segundos
        setTimeout(() => {
            clearInterval(periodicCheck);
        }, 30000);
    };
    
    // Inicializar cuando la página esté lista
    if (document.readyState === 'complete') {
        initializeChatbaseDetection();
    } else {
        window.addEventListener('load', initializeChatbaseDetection);
    }
    
    // Interceptar la función de Chatbase para detectar cuando se inicializa
    const originalChatbase = window.chatbase;
    if (originalChatbase) {
        window.chatbase = function(...args) {
            const result = originalChatbase.apply(this, args);
            
            // Si se está inicializando el chatbot
            if (args[0] === 'getState' || args[0] === 'init') {
                console.log('Chatbase inicializado, configurando sonidos...');
                
                // Configurar sonidos después de la inicialización
                setTimeout(() => {
                    const chatbaseButton = document.querySelector('[data-chatbase-widget]') ||
                                         document.querySelector('#chatbase-widget') ||
                                         document.querySelector('.chatbase-widget');
                    
                    if (chatbaseButton) {
                        chatbaseButton.addEventListener('click', () => {
                            console.log('Botón de Chatbase clickeado');
                            playSound('open');
                        });
                    }
                }, 1000);
            }
            
            return result;
        };
    }
    
    console.log('Sistema de sonidos para Chatbase inicializado');
    
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
    
    // Configuración adicional para videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Configurar eventos de video
        video.addEventListener('loadstart', function() {
            console.log('Video cargando...');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video listo para reproducir');
        });
        
        video.addEventListener('error', function(e) {
            console.error('Error al cargar video:', e);
            // Fallback: mostrar imagen de respaldo
            const fallbackImg = document.createElement('img');
            fallbackImg.src = 'assets/img/video-fallback.svg';
            fallbackImg.alt = 'Video no disponible';
            fallbackImg.className = 'w-full h-auto object-cover';
            this.parentNode.replaceChild(fallbackImg, this);
        });
        
        // Configurar reproducción automática en móviles
        if (video.hasAttribute('autoplay')) {
            video.addEventListener('canplaythrough', function() {
                this.play().catch(e => {
                    console.log('Autoplay bloqueado:', e);
                });
            });
        }
    });
    
    console.log('StrongKids Play Gym - Landing Page cargada exitosamente');
});

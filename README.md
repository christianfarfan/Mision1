# StrongKids Play Gym - Landing Page

## Descripción
Landing page moderna y responsiva para StrongKids Play Gym, especializada en fitness funcional para niños. Diseñada con alta conversión y experiencia de usuario optimizada.

## Características
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Paleta de colores vibrante (rojo, amarillo, azul, verde)
- ✅ Menú hamburguesa para móviles
- ✅ Formulario de inscripción integrado con Formspree
- ✅ Chatbot flotante (placeholder)
- ✅ Animaciones suaves y efectos hover
- ✅ Optimizado para SEO y accesibilidad

## Estructura de Archivos
```
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## Integración con Formspree

### Paso 1: Crear cuenta en Formspree
1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Crear formulario
1. En el dashboard de Formspree, haz clic en "New Form"
2. Nombra tu formulario: "StrongKids Inscripciones"
3. Copia el Form ID que se genera

### Paso 3: Actualizar el código
En el archivo `index.html`, línea 147, reemplaza `YOUR_FORM_ID` con tu Form ID real:

```html
<form id="inscripcion-form" action="https://formspree.io/f/TU_FORM_ID_AQUI" method="POST" class="space-y-6">
```

### Paso 4: Configurar campos del formulario
Los siguientes campos están configurados en el formulario:
- `nombre-padre` - Nombre del padre/madre
- `email` - Email de contacto
- `telefono` - Teléfono
- `nombre-nino` - Nombre del niño/niña
- `edad-nino` - Edad del niño/niña
- `plan-membresia` - Plan de membresía seleccionado

### Paso 5: Personalizar respuestas
En Formspree, puedes configurar:
- Email de confirmación automática para los padres
- Redirección después del envío
- Mensajes personalizados

## Personalización

### Colores
Los colores principales están definidos en Tailwind:
- `strong-red`: #E53E3E
- `strong-yellow`: #F6AD55
- `strong-blue`: #3182CE
- `strong-green`: #38A169
- `strong-orange`: #DD6B20

### Información de Contacto
Actualiza la información en el footer (líneas 200-210 en `index.html`):
- Dirección física
- Teléfono
- Email
- Enlaces a redes sociales

### Chatbot
El chatbot está implementado como placeholder. Para integrar un chatbot real:
1. Reemplaza el código en las líneas 220-230 de `index.html`
2. Actualiza la funcionalidad en `script.js` (líneas 180-190)

## Despliegue

### Opción 1: GitHub Pages
1. Sube los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main
4. Tu sitio estará disponible en `https://tuusuario.github.io/nombre-repo`

### Opción 2: Netlify
1. Arrastra la carpeta del proyecto a [netlify.com](https://netlify.com)
2. Tu sitio estará disponible inmediatamente

### Opción 3: Vercel
1. Conecta tu repositorio de GitHub a [vercel.com](https://vercel.com)
2. Despliega automáticamente

## Optimizaciones Adicionales

### SEO
- Meta tags optimizados incluidos
- Estructura semántica HTML5
- Alt text para imágenes (agregar cuando se incluyan)

### Performance
- CSS y JS minificados para producción
- Imágenes optimizadas (agregar cuando se incluyan)
- Lazy loading implementado

### Accesibilidad
- Navegación por teclado
- Contraste de colores optimizado
- Etiquetas ARIA donde sea necesario

## Soporte
Para soporte técnico o personalizaciones adicionales, contacta al equipo de desarrollo.

---
© 2025 StrongKids Play Gym - Desarrollado con ❤️ para el bienestar infantil


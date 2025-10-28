# 📸 GUÍA COMPLETA: CÓMO AGREGAR IMÁGENES Y PERSONALIZAR INFORMACIÓN

## 🖼️ AGREGAR IMÁGENES

### **Paso 1: Preparar las imágenes**
1. **Formatos recomendados**: JPG, PNG, WebP
2. **Tamaños sugeridos**:
   - Logo: 100x100px o 200x200px
   - Hero background: 1920x1080px
   - Tarjetas: 400x400px
   - Galería: 800x600px

### **Paso 2: Guardar imágenes en la carpeta**
```
PROYECTO PAGINA WEB STRONGKIDS/
├── images/
│   ├── logo.png           ← Tu logo real
│   ├── hero-bg.jpg        ← Imagen de fondo del hero
│   ├── ia-chatbot.jpg     ← Imagen para tarjeta IA
│   ├── metodo-funcional.jpg ← Imagen para tarjeta método
│   ├── comunidad-segura.jpg ← Imagen para tarjeta comunidad
│   └── galeria/           ← Carpeta para más imágenes
```

### **Paso 3: Activar las imágenes en el código**

#### **A) Logo del Header**
En `index.html` línea 50, descomenta la línea de imagen:
```html
<img src="images/logo.png" alt="StrongKids Play Gym Logo" class="w-10 h-10 rounded-lg">
```

#### **B) Imagen de fondo del Hero**
En `index.html` línea 89, descomenta la línea:
```html
<div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style="background-image: url('images/hero-bg.jpg');"></div>
```

#### **C) Imágenes en las tarjetas**
En cada tarjeta, descomenta la línea de imagen:
```html
<img src="images/ia-chatbot.jpg" alt="Chatbot IA" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
```

## 📝 PERSONALIZAR INFORMACIÓN

### **1. Información de Contacto**
En `index.html` líneas 248-256, reemplaza con tu información real:

```html
<!-- Dirección -->
[TU DIRECCIÓN REAL AQUÍ] - Ejemplo: Av. Principal 456, Bogotá, Colombia

<!-- Teléfono -->
[TU TELÉFONO REAL] - Ejemplo: +57 (1) 234-5678

<!-- Email -->
[TU EMAIL REAL] - Ejemplo: info@strongkidsgym.com
```

### **2. Redes Sociales**
En `index.html` líneas 280-295, actualiza los enlaces:

```html
<a href="https://facebook.com/tu-pagina" class="w-10 h-10 bg-strong-blue rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
    <i class="fab fa-facebook-f"></i>
</a>
<a href="https://instagram.com/tu-cuenta" class="w-10 h-10 bg-strong-green rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
    <i class="fab fa-instagram"></i>
</a>
```

### **3. Planes de Membresía**
En `index.html` líneas 218-221, personaliza los planes:

```html
<option value="basico">Plan Básico - 2 clases/semana - $50.000/mes</option>
<option value="premium">Plan Premium - 4 clases/semana - $80.000/mes</option>
<option value="ilimitado">Plan Ilimitado - Acceso completo - $120.000/mes</option>
```

### **4. Títulos y Textos**
Puedes cambiar cualquier texto en el HTML:
- Título principal (línea 94)
- Subtítulos (línea 96)
- Descripciones de las tarjetas
- Textos del formulario

## 🔧 CONFIGURAR FORMSPREE

### **Paso 1: Crear cuenta**
1. Ve a [formspree.io](https://formspree.io)
2. Regístrate gratis
3. Verifica tu email

### **Paso 2: Crear formulario**
1. Haz clic en "New Form"
2. Nombra: "StrongKids Inscripciones"
3. Copia el Form ID

### **Paso 3: Actualizar código**
En `index.html` línea 147, reemplaza:
```html
<form id="inscripcion-form" action="https://formspree.io/f/TU_FORM_ID_AQUI" method="POST" class="space-y-6">
```

## 🎨 PERSONALIZAR COLORES

En `index.html` líneas 24-28, cambia los colores:
```javascript
colors: {
    'strong-red': '#E53E3E',      // Tu color rojo
    'strong-yellow': '#F6AD55',    // Tu color amarillo
    'strong-blue': '#3182CE',      // Tu color azul
    'strong-green': '#38A169',     // Tu color verde
    'strong-orange': '#DD6B20'     // Tu color naranja
}
```

## 📱 AGREGAR GALERÍA DE IMÁGENES

### **Opción 1: Galería simple**
Agrega esta sección después de las tarjetas:

```html
<!-- Galería de Imágenes -->
<section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Nuestro Gimnasio</h2>
        <div class="grid md:grid-cols-3 gap-6">
            <img src="images/galeria1.jpg" alt="Gimnasio StrongKids" class="rounded-lg shadow-lg hover:scale-105 transition-transform">
            <img src="images/galeria2.jpg" alt="Niños ejercitándose" class="rounded-lg shadow-lg hover:scale-105 transition-transform">
            <img src="images/galeria3.jpg" alt="Instructores" class="rounded-lg shadow-lg hover:scale-105 transition-transform">
        </div>
    </div>
</section>
```

## 🚀 CONSEJOS FINALES

1. **Optimiza las imágenes**: Usa herramientas como TinyPNG para reducir el tamaño
2. **Nombres descriptivos**: Usa nombres claros para las imágenes
3. **Backup**: Siempre guarda una copia de seguridad
4. **Prueba**: Abre la página después de cada cambio
5. **Responsive**: Verifica que se vea bien en móvil y desktop

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas:
1. Verifica que las imágenes estén en la carpeta `images/`
2. Revisa que los nombres de archivo coincidan exactamente
3. Asegúrate de tener conexión a internet
4. Abre la consola del navegador (F12) para ver errores

¡Tu landing page estará lista para impresionar a los padres! 🎉

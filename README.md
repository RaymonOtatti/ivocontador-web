# ivocontador // Estudio Contable — Sitio Web Oficial
### Inspirado en la identidad y diseño editorial de [Old Tom Capital (Firm)](https://www.oldtomcapital.com/firm)
### Para: **Lic. Luciano Ivo Racciatti** ([@ivocontador](https://www.instagram.com/ivocontador/))
#### Matriculado en CPCE CABA & CPCE PBA

---

## 🏛️ Características del Diseño

Este proyecto fue diseñado replicando fielmente la estética editorial y minimalista de alto nivel de **Old Tom Capital**:

1. **Paleta de Colores Exclusiva:**
   - `Sand Surface`: `#efede7` (fondo de papel cálido editorial)
   - `Charcoal Text`: `#1c1c17` (tipografía oscura de alto contraste)
   - `Hairline Grid`: `#dad6c8` (bordes ultra finos de 1px)
   - `Green Tone Oficial`: `#464c40` (exacto tono verde oliva extraído de tu muestra)
   - `Signal Pop`: `#e84224` (color bermellón exacto del isotipo oficial de Ivo)

2. **Tipografía & Logo Oficial:**
   - **Isotipo Oficial Ivo:** `LOGO-I-Square.png` procesado y optimizado en [`assets/logo.png`](file:///Users/raymonotatti/Desktop/ivocontador-web/assets/logo.png).
   - **Inter:** Tipografía unificada y limpia para todos los titulares y cuerpo.
   - **Geist Mono:** Para metadatos técnicos, coordenadas y fechas oficiales.

3. **Componentes y Mejoras:**
   - **Barra de navegación y Drawer Móvil:** Con el isotipo oficial y reloj oficial de Buenos Aires en vivo (`ART`).
   - **Servicios Especializados:** Tarjetas limpias con solo títulos visibles por defecto, y botón interactivo «Saber más ↓» que despliega toda la información detallada con un clic.
   - **Sección Ubicación & Google Maps:** Mapa interactivo integrado para CABA y PBA con botón directo para abrir en Google Maps.
   - **Calendario Fiscal Interactivo:** Tabla técnica con filtros por impuesto (IVA, Monotributo, IIBB, Sociedades).
   - **Simulador Impositivo:** Diagnóstico en 2 pasos con enlace directo a WhatsApp.
   - **Pie de Página Editorial:** Con avisos de ética profesional, regulaciones de los CPCE y enlaces institucionales.

---

## 🚀 Cómo Visualizar y Ejecutar Localmente

### Opción 1: Abrir directamente en el navegador
Puedes hacer doble clic en el archivo:
`/Users/raymonotatti/Desktop/ivocontador-web/index.html`
o abrirlo con Safari / Chrome desde la terminal:
```bash
open /Users/raymonotatti/Desktop/ivocontador-web/index.html
```

### Opción 2: Con servidor local de Python
```bash
cd /Users/raymonotatti/Desktop/ivocontador-web
python3 -m http.server 3000
```
Y luego visita: `http://localhost:3000` en tu navegador.

---

## 🌐 Despliegue en Producción (Vercel / Netlify / Cloudflare Pages / GitHub Pages)

El proyecto está construido en HTML5, CSS3 y JavaScript moderno nativo sin dependencias pesadas de compilación. Puede subirse instantáneamente a cualquier plataforma:
- **Vercel:** `vercel --prod`
- **Netlify:** Arrastrar la carpeta `ivocontador-web` al panel de Netlify Drop.
- **GitHub Pages:** Subir a un repositorio y activar GitHub Pages en la rama `main`.

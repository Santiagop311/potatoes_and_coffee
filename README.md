# Papas y Café

Página de presentación en español para Papas y Café. HTML, CSS y JavaScript sin frameworks, paquetes ni paso de compilación. Fuentes e imágenes alojadas en el proyecto. Google Maps se carga como servicio externo; la carta y las fotos no dependen de Google Fonts ni de una API.

## Abrir la página

Desde esta carpeta:

```bash
npm run dev
```

Abre `http://localhost:4173`. También puedes abrir `dist/index.html` directamente. Para comprobar la sintaxis: `npm run check`.

## Estructura

```text
papas-y-cafe/
├── .git/              # Historial y conexión con GitHub
├── .gitignore         # Reglas para todo el proyecto
├── README.md          # Documentación completa
├── package.json       # Comandos de desarrollo
├── vercel.json        # Despliegue en v0/Vercel
├── serve.mjs          # Servidor de vista previa
├── dist/              # HTML, CSS, JavaScript, fotos y logos publicables
├── referencias/       # Cartas anteriores, fuera de la web publicada
└── tools/             # Generador del logo, fuentes y licencias
```

## Qué incluye

- Portada con cuatro fotografías reales, carrusel con reproducción/pausa, flechas, selección directa y gesto táctil. Avanza automáticamente cada cinco segundos, también después de tocar una flecha o deslizar. Se pausa fuera de pantalla, durante navegación con teclado, al solicitar movimiento reducido o con el botón de pausa; no se detiene por pasar el puntero.
- Empanadas como especialidad de la casa.
- Diez productos, filtros por categoría, búsqueda por plato o ingrediente y estados sin resultados.
- Vista ampliada de cada producto con precio, descripción y enlace de WhatsApp.
- Galería horizontal que avanza sola cada cinco segundos mientras está visible, con pausa/reproducción, swipe, fotos ampliables, teclado, Escape y retorno de foco.
- Ilustración de los dueños y fotografía del letrero en Sobre nosotros.
- Mapa de Google Maps con la ficha exacta compartida por el usuario y botón Cómo llegar ligado a su Place ID.
- Animaciones de entrada, portada con transición entre fotos y navegación fija con indicador de lectura.
- Enlaces a WhatsApp con un mensaje para cada producto, sin enviar mensajes automáticamente.
- Sobre nosotros, dirección, horario y teléfono.
- Diseño adaptable, navegación por teclado y soporte para movimiento reducido.
- Identidad vectorial rediseñada: rotulación con sombra roja, letras manuscritas, emblema de papas/café/empanada y sello para redes.
- Enlaces directos a TikTok e Instagram en una sección propia, menú móvil y pie de página.
- Navegación móvil hasta 900 px, controles táctiles amplios, campo de búsqueda de 16 px y ajustes para orientación horizontal.

## Editar

- `dist/index.html`: textos generales, secciones y contacto.
- `dist/app.js`: productos, precios, categorías y mensajes de WhatsApp.
- `dist/styles.css`: estilos base, colores y tipografía.
- `dist/experience.css` y `dist/experience.js`: portada, movimiento, detalles de producto, composición y navegación.
- `dist/gallery.css` y `dist/gallery.js`: galería y visor de fotografías.
- `dist/mobile-social.css`: identidad, redes sociales y refinamientos para celular/tableta.
- `dist/assets/`: fotografías originales, fuentes y logos SVG.

Los precios se actualizaron con la carta completa compartida por el usuario el 14 de noviembre de 2026:

| Producto | Precio |
| --- | --- |
| Empanada de carne | $2.000 la unidad |
| Salchipapota | 250 g $18.000 · 500 g $28.000 · 1 kg $38.000 |
| Pataconada | $39.000 |
| Chimichanga | $25.000 |
| Pataconsote | $25.000 |
| Santarosanos | $22.000 |
| La despeinada | $13.000 |
| Salchipapa tradicional | 250 g $10.000 · 500 g $15.000 · 1 kg $20.000 |

Choripapa y despeinada súper mixta no aparecen con precio en la carta nueva y conservan consulta por WhatsApp. La carta anterior y el afiche de choripapa con un precio especial antiguo se guardaron en `referencias/`, fuera de los archivos que publica la web. Sus precios ya no se anuncian en la página ni en los detalles de producto.

El horario se conserva de la carta: 5:00 p. m. a 10:30 p. m.; no se especifican días. La ficha de Google Maps indica cierre a las 10:00 p. m.; esa diferencia sigue pendiente de confirmar. No se inventan domicilios, nombres o precios de las bebidas. Se muestran solo las bebidas fotografiadas en la galería.

Las tarjetas utilizan las fotografías individuales compartidas por el usuario. La salchipapa tradicional y la choripapa se representan con ilustraciones SVG. La imagen de los dueños es una ilustración proporcionada por el usuario, identificada como tal en su texto alternativo.

Ubicación confirmada desde el enlace del usuario: `https://maps.app.goo.gl/44NsH6enqGXuWnhW9`. Place ID: `ChIJDZD0PAB9OI4RgfSRlHj6Ct8`. CID: `16071933616020649089`. Coordenadas: `4.8231925, -75.7306118`. El iframe representa esa ficha; el contenido del mapa y sus horarios lo gestiona Google. La dirección textual sigue la carta suministrada.

## Propuesta de identidad

La marca combina “PAPAS” con letras redondeadas y sombra roja, y “y Café” con rotulación manuscrita. El emblema reúne papas doradas, una taza y una empanada como base. Las versiones para cabecera y para avatar conservan una misma identidad, con detalles reducidos en el favicon. Todas las letras están convertidas a trazados: el logo no depende de fuentes instaladas.

El generador reproducible y las fuentes OFL empleadas (Lilita One y Lobster) están en `tools/`. Para ejecutar la página no se requiere instalar esas herramientas; las instrucciones están en la sección «Regenerar el logo» de este documento.

- `dist/assets/logo.svg`: versión con texto crema para fondos oscuros.
- `dist/assets/logo-light.svg`: texto oscuro para fondos claros.
- `dist/assets/logo-mark.svg`: símbolo independiente.
- `dist/assets/favicon.svg`: icono del navegador.
- `dist/assets/logo-badge.svg`: sello circular para avatar, redes y empaques.

Paleta: negro cálido `#171511`, amarillo `#ffca22`, rojo `#d32f25` y crema `#fff8e8`. Fuentes: Barlow Condensed y DM Sans, distribuidas bajo SIL Open Font License; licencias en `dist/assets/licenses/`.

## Regenerar el logo

Desde esta carpeta, ejecuta:

```bash
npm ci --prefix tools
node tools/generate-brand.mjs
```

Esto actualiza `logo.svg`, `logo-light.svg`, `logo-mark.svg`, `logo-badge.svg` y `favicon.svg` en `dist/assets/`. Los SVG son autónomos y todas sus letras están convertidas a trazados; no requieren fuentes instaladas ni recursos remotos.

Las fuentes originales, sin modificaciones, se distribuyen bajo SIL Open Font License 1.1:

- **Lilita One**, Juan Montoreano: [fuente y licencia originales](https://github.com/google/fonts/tree/main/ofl/lilitaone). Copia local: `tools/logo-fonts/LilitaOne-Regular.ttf` y `tools/logo-fonts/LilitaOne-OFL.txt`.
- **Lobster**, The Lobster Project Authors: [fuente y licencia originales](https://github.com/google/fonts/tree/main/ofl/lobster). Copia local: `tools/logo-fonts/Lobster-Regular.ttf` y `tools/logo-fonts/Lobster-OFL.txt`.

Las fuentes del logo solo se utilizan al generar los trazados; no se cargan en la página.

## Subir cambios a GitHub

Este es un único repositorio Git. Su raíz es la carpeta `papas-y-cafe/`, donde están `.git`, este README y el único `.gitignore` del proyecto. Se conservan el historial, la rama `main` y la conexión con [Santiagop311/potatoes_and_coffee](https://github.com/Santiagop311/potatoes_and_coffee).

Ejecuta los comandos desde esta carpeta:

```bash
git status
git add .
git commit -m "Actualizar página de Papas y Café"
git push origin main
```

El archivo `.gitignore` excluye dependencias, archivos `.env` y datos locales de despliegue en cualquier subcarpeta. `dist/` contiene el código de la página estática y se versiona en GitHub.

## Publicación

En v0, abre un chat nuevo y selecciona **+ → Import from… → Import from GitHub**. Importa el repositorio anterior con la rama `main`. La integración de GitHub de Vercel debe tener acceso al repositorio.

`vercel.json` está junto a este documento y configura el despliegue:

| Ajuste | Valor |
| --- | --- |
| Root Directory | `./` (raíz del repositorio, ahora `papas-y-cafe/` en tu equipo) |
| Framework Preset | `Other` |
| Build Command | Vacío, sin compilación |
| Install Command | Vacío, sin dependencias de ejecución |
| Output Directory | `dist` |
| Development Command | `npm run dev` |

No hace falta seleccionar una subcarpeta dentro del repositorio. Vercel sirve los archivos estáticos de `dist/` y no ejecuta `serve.mjs` en producción. La vista previa admite `PORT` y `HOST`; por defecto escucha en `0.0.0.0` para funcionar en el sandbox de v0.

Cuando tengas un dominio público, actualiza `og:url` y `og:image` en `dist/index.html`. Actualmente apuntan a la propuesta privada en Sites.

`.openai/hosting.json` conserva la identidad y la configuración de la propuesta en Sites; es independiente del despliegue en Vercel.

Guías oficiales: [importación en v0](https://v0.app/docs/git-import), [configuración de compilación en Vercel](https://vercel.com/docs/builds/configure-a-build) y [vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

## Redes sociales

- TikTok: `https://www.tiktok.com/@papasycafe_pereira`
- Instagram: `https://www.instagram.com/papasycafe/`

Se conservaron los usuarios proporcionados por el dueño y se retiraron parámetros de seguimiento. Los enlaces abren las cuentas en otra pestaña; no se incorporan scripts ni videos de las plataformas.

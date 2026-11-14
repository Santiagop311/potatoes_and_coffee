# Papas y Café

Página de presentación en español para Papas y Café. HTML, CSS y JavaScript sin frameworks, paquetes ni paso de compilación. Fuentes e imágenes alojadas en el proyecto. Google Maps se carga como servicio externo; la carta y las fotos no dependen de Google Fonts ni de una API.

## Abrir la página

Desde esta carpeta:

```bash
npm run dev
```

Abre `http://localhost:4173`. También puedes abrir `dist/index.html` directamente. Para comprobar la sintaxis: `npm run check`.

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

El generador reproducible y las fuentes OFL empleadas (Lilita One y Lobster) están documentados en `tools/README.md`. Para ejecutar la página no se requiere instalar esas herramientas.

- `dist/assets/logo.svg`: versión con texto crema para fondos oscuros.
- `dist/assets/logo-light.svg`: texto oscuro para fondos claros.
- `dist/assets/logo-mark.svg`: símbolo independiente.
- `dist/assets/favicon.svg`: icono del navegador.
- `dist/assets/logo-badge.svg`: sello circular para avatar, redes y empaques.

Paleta: negro cálido `#171511`, amarillo `#ffca22`, rojo `#d32f25` y crema `#fff8e8`. Fuentes: Barlow Condensed y DM Sans, distribuidas bajo SIL Open Font License; licencias en `dist/assets/licenses/`.

## Publicación

Para importar el repositorio completo en v0 o Vercel, usa **Root Directory `./`** y **Output Directory `papas-y-cafe/dist`**. La configuración está en `../vercel.json`; las instrucciones de GitHub e importación están en `../README.md`.

El contenido estático publicable está en `dist/`. `.openai/hosting.json` conserva la identidad del proyecto de Sites y su carpeta de publicación. La vista de revisión en Sites se crea con acceso privado; no cambia automáticamente a público.

## Redes sociales

- TikTok: `https://www.tiktok.com/@papasycafe_pereira`
- Instagram: `https://www.instagram.com/papasycafe/`

Se conservaron los usuarios proporcionados por el dueño y se retiraron parámetros de seguimiento. Los enlaces abren las cuentas en otra pestaña; no se incorporan scripts ni videos de las plataformas.

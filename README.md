# Papas y Café

Escaparate de Papas y Café, Ciudad Boquía, Pereira. HTML, CSS y JavaScript sin frameworks ni dependencias de ejecución. Las fuentes, el catálogo y las imágenes están alojados en el proyecto.

## Abrir y comprobar

```bash
npm run dev
```

Abre http://localhost:4173. `npm run check` comprueba la sintaxis. Para usar otro puerto: `PORT=4183 npm run dev`. También se puede abrir `dist/index.html` directamente; el guardado del pedido depende del almacenamiento permitido por el navegador.

## Experiencia por producto

Se aplicó la [guía de motion adjunta](referencias/guia-motion-v2.md) a la identidad existente: logo vectorial, Barlow Condensed, DM Sans, amarillo, rojo y negro cálido.

- Cinco destacados a pantalla completa: empanada, Salchipapota, Pataconsote, Chimichanga y La despeinada. El scroll recorre las escenas sin avance automático; cada una tiene su imagen, precio, ingredientes, color y acción.
- Tres familias a pantalla completa: Papas (tres productos), Patacones (dos) y Arepas y más (cuatro). Desplazamiento horizontal nativo, arrastre con ratón, rueda horizontal/Mayús y teclado. El scroll vertical continúa hacia la carta.
- Profundidad visual mediante capas, sombras, ingredientes independientes e inclinación moderada según el puntero. No requiere WebGL. Con movimiento reducido se eliminan órbitas, vuelos y transiciones; con ahorro de datos se evita la precarga de vecinos y las imágenes grandes.
- Carta completa de diez productos, con búsqueda y filtros existentes. Las fotos se contienen en su propia zona y el nombre, precio y acciones aparecen debajo.
- Fichas con ingredientes, cantidad y tamaños reales. Los productos sin precio confirmado conservan consulta por WhatsApp.
- Pedido persistente en el navegador. Se fusionan configuraciones iguales y se mantienen separados los tamaños distintos. El mensaje de WhatsApp incluye cantidades, tamaños y subtotal para confirmar disponibilidad y precios con el negocio; no se envía automáticamente.
- Galería de fotografías reales, visor ampliado, historia de la familia, redes, dirección, mapa y contacto conservados.

Galería, historia, redes, visita y pie comparten ahora superficies luminosas, bordes redondeados, títulos condensados y botones de la marca. Las redes utilizan los mismos recortes de producto de las escenas. Las fotografías reales de la galería conservan el encuadre completo dentro de sus propios marcos.

La página se prepara para escritorio, móvil, ancho de 320 px y orientación horizontal. Los diálogos nativos mantienen el foco y lo devuelven al control que los abrió. Las escenas admiten enlaces como `#salchipapota`, `#chimichanga`, `#papas`, `#especialidad` y `#arepas`.

## Imágenes y procedencia

Los diez platos de estudio son **recreaciones ilustrativas generadas con imagegen integrado**. Empanada, Salchipapota, Pataconsote, Pataconada, Chimichanga, La despeinada, Santarosanos y Súper mixta parten de sus fotografías; Choripapa utiliza la preparación visible en el afiche anterior, sin copiar su precio. Salchipapa tradicional se compuso desde su receta confirmada y el estilo de envase de la marca; ese envase es una interpretación visual pendiente de validación. Las fotos originales permanecen en `dist/assets/` y en la galería «El parche». No se inventaron videos ni extras comerciales.

- `dist/assets/scenes/`: WebP con alfa real, miniaturas de 510 px, versiones habituales de 1200 px y versiones grandes. Incluye ingredientes independientes y fondos macro horizontales y verticales.
- `art-masters/scenes/`: PNG nativos, sin modificar, de todos los activos generados.
- `art-masters/provenance.json`: prompts finales, referencias, dimensiones, transparencia y tamaños de exportación de cada activo.
- `art-masters/exports-4k/`: diez productos ampliados a 3840 px en su lado mayor, fuera de la descarga normal de la web. **Son ampliaciones, no generación 4K nativa.** Las dimensiones reales figuran en `art-masters/export4k.json`.
- `tools/prepare-scene-art.py`: copia y exportación de recursos; requiere Python 3 y Pillow. Solo convierte/redimensiona imágenes, sin generar ni retocar platos. Las entradas de generación conservan la ruta de origen de esta sesión; para otra máquina se deben actualizar esas rutas.

Los fondos de queso se comparten entre platos que contienen ese ingrediente; la empanada utiliza una macro de su corteza. El color, la luz y la tinta cambian con cada escena. Los originales generados tienen aproximadamente 1,3–1,7 mil píxeles de ancho. Las ampliaciones se registran expresamente y no aportan detalle nativo adicional.

## Archivos principales

| Archivo | Contenido |
| --- | --- |
| `dist/index.html` | Secciones, portada legible inicial, contacto y enlaces |
| `dist/app.js` | Catálogo único, ficha, carrito, precios y WhatsApp |
| `dist/experience.js` | Escenas, temas, gestos, teclado y fuentes de imagen adaptativas |
| `dist/showcase.css` | Diseño del escaparate y ajustes adaptables |
| `dist/catalog.css` | Escenas coherentes en carta, fichas y miniaturas del pedido |
| `dist/sections.css` | Galería, nosotros, redes, visita y pie con la misma identidad |
| `dist/cart.css` | Ficha, opciones, pedido y confirmaciones |
| `dist/gallery.js`, `dist/gallery.css` | Galería y visor de fotografías reales |
| `dist/styles.css`, `dist/experience.css`, `dist/mobile-social.css` | Estilos de la marca y secciones conservadas |
| `serve.mjs` | Servidor local; incluye MIME WebP, PNG, AVIF y JSON |

`window.PapasCatalog` expone productos, aplicación del tema visual, apertura de ficha, agregado al pedido, formato de importes y lectura del carrito. Cada producto define una única escena (`scene.art`, `scene.colors`, `scene.size`) que se reutiliza en portada, familias, carta, ficha y pedido. Los precios salen del catálogo; los datos almacenados se validan al recargar y el subtotal se calcula con los precios de la copia actual. La disponibilidad real se confirma por WhatsApp.

## Carta y datos conservados

Precios de la carta compartida por el usuario el 14 de noviembre de 2026:

| Producto | Precio COP |
| --- | --- |
| Empanada de carne | $2.000 por unidad |
| Salchipapota | 250 g $18.000 · 500 g $28.000 · 1 kg $38.000 |
| Pataconada | $39.000 |
| Chimichanga | $25.000 |
| Pataconsote | $25.000 |
| Santarosanos | $22.000 |
| La despeinada | $13.000 |
| Salchipapa tradicional | 250 g $10.000 · 500 g $15.000 · 1 kg $20.000 |
| Choripapa | Consultar |
| La despeinada súper mixta | Consultar |

No se anuncian los precios antiguos de choripapa. La carta anterior y su afiche se conservan en `referencias/`, fuera de lo publicado.

Horario de carta: 5:00 p. m. a 10:30 p. m., sin días confirmados. La ficha de Google Maps indicaba cierre a las 10:00 p. m.; esa diferencia continúa pendiente de confirmar. No se inventaron nombres, precios ni servicio de domicilio para bebidas.

- WhatsApp: https://wa.me/573104119674
- Dirección: Parque Industrial · Ciudad Boquía, Pereira · Mz. 12, casa 18, local 2.
- Google Maps: https://maps.app.goo.gl/44NsH6enqGXuWnhW9
- Place ID: `ChIJDZD0PAB9OI4RgfSRlHj6Ct8`; CID: `16071933616020649089`; coordenadas: `4.8231925, -75.7306118`.
- TikTok: https://www.tiktok.com/@papasycafe_pereira
- Instagram: https://www.instagram.com/papasycafe/

La ilustración de los dueños fue suministrada por el usuario y se identifica como tal en su texto alternativo.

## Verificación de esta actualización

Pasaron la comprobación de sintaxis y las pruebas del pedido (tamaños obligatorios, configuraciones separadas, cantidades, persistencia, subtotal, WhatsApp y foco). La integración en jsdom se probó con medidas simuladas de 1536×800, 390×844, 320×700 y 844×390. Se comprobaron los tres carriles (3+2+4), diez imágenes únicas, los diez temas de ficha abiertos desde la carta, consulta de productos sin precio, títulos largos, enlace repetido a una familia, inercia, cambio de eje y visor de fotografías.

Se verificaron 68 recursos HTTP, tipos MIME, ocho hojas CSS, el alfa de los 42 WebP de producto/ingredientes y el contraste de texto/botón sobre las diez paletas base. Los 16 activos generados tienen referencia y prompt documentados; los diez platos tienen ampliación a 3840 px. Los detalles geométricos en móvil corto y horizontal se revisan también por lectura del CSS.

La simulación usa medidas de disposición definidas para probar la lógica; **no verifica el aspecto visual**. No se pudieron obtener capturas ni comprobar el diseño en navegador porque el host de automatización del navegador no estaba disponible. Quedan pendientes la revisión visual en 1536×800, 390×844, 320 px y horizontal, contraste sobre texturas, zoom y gestos en un teléfono físico. No se publicó esta actualización.

## Logo y licencias

Logos autónomos con letras convertidas a trazados: `logo.svg` para fondo oscuro, `logo-light.svg` para fondo claro, `logo-mark.svg`, `logo-badge.svg` y `favicon.svg`. Para regenerarlos:

```bash
npm ci --prefix tools
node tools/generate-brand.mjs
```

El generador utiliza Lilita One y Lobster bajo SIL OFL; fuentes y licencias en `tools/logo-fonts/`. Barlow Condensed y DM Sans se distribuyen con sus licencias en `dist/assets/licenses/`.

## Publicación existente

El repositorio conserva su historial y conexión con [Santiagop311/potatoes_and_coffee](https://github.com/Santiagop311/potatoes_and_coffee). Esta actualización se deja local para revisión, sin commit, push ni despliegue.

`vercel.json` configura la raíz del repositorio, framework `Other`, sin instalación ni compilación y salida `dist`. Vercel sirve esos archivos sin ejecutar `serve.mjs`. `.openai/hosting.json` conserva la identidad de la propuesta privada en Sites; es independiente de Vercel. Los metadatos `og:url` y `og:image` aún apuntan a esa propuesta y se deben actualizar al confirmar el dominio definitivo.

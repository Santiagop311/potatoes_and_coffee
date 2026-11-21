# Guía para Codex · Escaparates de marca con scroll, imágenes 4K y 3D

Construye una web donde se reconozca el producto antes de leer su nombre. Abre con cinco o seis destacados y dedica una pantalla completa a cada familia principal del catálogo. Dentro del catálogo, el gesto vertical cambia de familia y el horizontal cambia de producto. Una pulsación sobre la imagen abre la ficha desde la que se puede pedir, comprar, reservar o consultar.

El recorrido, los encuadres y las interacciones son reproducibles. El logo, la tipografía, los colores, las fotografías, las unidades y las acciones comerciales salen de la marca de cada encargo.

## Cómo usar este archivo en otro chat

Adjunta este Markdown. Puedes empezar con el enlace al negocio y añadir el logo, el catálogo, las fotos y los videos que tengas. Copia este encargo y completa lo que conozcas.

> Construye la web de **[marca]** siguiendo la guía adjunta. Su catálogo o portafolio está en **[enlace o archivos]** y su acción principal es **[acción y destino]**. Toma la identidad de **[logo, empaque, web o perfil oficial]**. Destaca **[productos en orden, o elígelos del catálogo]**. Implementa el recorrido completo en el proyecto, prepara las imágenes que falten, prueba las interacciones en escritorio y móvil y entrégame una vista previa funcional. **[Si quiero publicarla, indico aquí el repositorio, el alojamiento y, si corresponde, el portafolio.]**

Codex debe llevar estas indicaciones a código y comprobar el resultado en un navegador. En un proyecto existente, conserva el catálogo, las rutas y las integraciones que ya funcionan. Los valores de esta guía son puntos de partida visuales. El encargo concreto y las proporciones del producto mandan.

## 1. Define qué se va a mostrar y qué puede hacer el visitante

Recorre el catálogo y el material público de la marca antes de diseñar. Conserva el identificador, nombre, categoría, presentación, precio, moneda, disponibilidad y variantes de cada artículo. Distingue un producto individual de un conjunto y dos tamaños del mismo producto. Toma los ingredientes, materiales y prestaciones de la fuente del negocio. Usa la fotografía para documentar el aspecto y el catálogo para confirmar qué se vende.

Elige los destacados por lo que representan y por su diferencia visual. Usa los artículos que existan si la selección es menor. Reúne los demás en sus familias reales. El destacado que reaparece en una galería conserva el mismo identificador, precio, ficha y carrito. Ofrece todos los artículos, incluidos los que solo tengan fotografía.

| Tipo de proyecto | Qué ocupa el centro | Qué puede flotar alrededor | Acción de la ficha |
| --- | --- | --- | --- |
| Gastronomía | La preparación completa en su envase real | Dos ingredientes reconocibles de esa receta | Elegir una opción y pedir |
| Iluminación | La lámpara entera con su pantalla y base | Una muestra de lino y la bisagra de latón | Elegir acabado y comprar |
| Equipamiento | La mochila con sus proporciones y costuras | Una hebilla y una muestra del tejido | Elegir color o talla |
| Estudio de arquitectura | Una obra real o su maqueta | Una muestra del acabado y un detalle constructivo | Consultar por esa obra |

En servicios y portafolios, la consulta o reserva lleva el nombre del proyecto elegido al destino acordado. El carrito corresponde a los negocios que venden por unidades.

## 2. Compón la página en este orden

| Tramo | Composición y comportamiento |
| --- | --- |
| Navegación | Barra superior fija. Logo a la izquierda, enlaces a las secciones en el centro y acción principal a la derecha. En tiendas, carrito SVG con cesta, ruedas y contador. En la portada y las galerías, logo y enlaces van sobre una barra transparente y toman la tinta de la escena. Subraya la sección activa. Sobre la cuadrícula y los videos, añade una superficie que preserve el contraste. |
| Portada de destacados | Una escena a la vez, a pantalla completa. En escritorio, texto a la izquierda y producto grande a la derecha. En móvil, tipo de producto, nombre, descripción corta, imagen, precio y acciones en una columna. La rueda o el deslizamiento recorre los destacados en orden. |
| Galerías por familia | Una sección de `100dvh` por cada familia protagonista. En una tienda con dos familias principales, la primera baja directamente a la segunda. El producto activo flota en el centro, con sus vecinos tenues a ambos lados. |
| Resto del catálogo | Grupos fáciles de reconocer, como conjuntos y accesorios. Una cuadrícula muestra foto completa, nombre, precio y acción. Aquí se recupera el desplazamiento vertical normal. |
| Videos y pie | Si existe una colección de videos, presenta alrededor de cinco piezas reales del perfil de la marca, una por pantalla en recorrido vertical. Cierra con los canales de contacto y enlaces del negocio. |

La portada utiliza el gesto para avanzar y permite leer cada escena en reposo. Mantén su composición libre de flechas de avance visibles, interruptores de pausa, rótulos como «Vista 3D» o «Selección» y rayas detrás del producto. En la carta base, la organización por familias resuelve la navegación. Los filtros, el armado por capas y las descargas de maestros 4K se reservan para proyectos que los pidan.

## 3. Obtén la identidad de la marca y el color de cada producto

**Tipografía.** Empieza por el rótulo, el logo o el empaque. Compara ancho de las letras, altura de las mayúsculas, curvas, peso y remates. Si el rótulo es alto y condensado, una combinación como Bebas Neue en títulos y Barlow Semi Condensed en precios y acciones reproduce ese ritmo. Una identidad editorial con remates puede pedir una serif de título y una sans de lectura. Usa la fuente oficial cuando esté disponible, conserva el logo como activo gráfico y carga solo las fuentes y pesos necesarios, preferiblemente en WOFF2.

**Jerarquía.** En escritorio, parte de una barra de 76 px, márgenes laterales cercanos al 5 % y dos columnas de 45 % y 55 % en portada. Reserva hasta dos líneas para el título. Como referencia inicial, usa `clamp(80px, 9.6vw, 164px)` con una familia condensada y reduce el máximo de los nombres largos. Limita la frase descriptiva a unas dos líneas y a un ancho de `36ch`. Da más peso al importe que al código de moneda. Presenta la compra en un botón redondeado y el desglose como enlace secundario. En móvil, parte de una barra de 59 px y un título de `clamp(44px, 12.8vw, 83px)`. Reajusta estas medidas según la fuente elegida y prueba los nombres reales.

**Color por escena.** Extrae el tono protagonista de la fruta, tejido, esmalte, material o empaque que permita identificar el artículo. Define el tono de base y su luz, la tinta de texto, el acento, el par de colores del botón y la superficie suave de la ficha. Una pieza de terracota puede llevar un escenario coral luminoso y un botón granate. Para una mochila azul, prueba un escenario cian con un botón azul noche. Cambia estos valores, la imagen decorativa y las piezas al cambiar de producto. Mantén la identidad del logo y la tipografía a través de toda la serie.

Mide el contraste en el área real donde cae el texto, también sobre la textura y en el estado seleccionado. Busca al menos 4,5 a 1 para texto normal y 3 a 1 para texto grande. Una veladura local del tono de la escena permite proteger el título y conservar los detalles de la fotografía. [Contraste de texto según W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

Pinta las capas de atrás hacia delante en este orden. Empieza con el color y la luz, coloca la macro en los bordes, añade la sombra de contacto, sitúa el producto y reparte las piezas secundarias a ambos lados. El nombre, el precio y los botones son texto y controles HTML en la capa superior. Reserva su espacio desde el encuadre inicial. Prueba también el extremo de cada órbita para que una pieza en movimiento deje libre la lectura.

## 4. Produce el arte en archivos independientes

| Recurso | Qué producir | Cómo se usa |
| --- | --- | --- |
| Producto entero | Un render de estudio por modelo o presentación. Conserva proporciones, número de piezas, empaque, etiqueta y rasgos de la referencia. Luz suave desde arriba a la izquierda y borde completo. | Maestro PNG con alfa real y 3840 px en el lado mayor. El encuadre sirve para la foto inicial, la textura 3D y la miniatura del carrito. |
| Objetos secundarios | Dos piezas por escena y una tercera cuando aporte información. Cada ingrediente, muestra o componente tiene volumen, textura y su propio archivo transparente. | Rodéalos de aire, sitúalos a distintas alturas y dales distinta profundidad. La silueta central sigue siendo dominante. |
| Fondo personalizado | Una composición horizontal y otra vertical por escena. Usa una macrofotografía de un material o detalle propio de ese producto. Concentra el detalle en los bordes. | Maestro horizontal de 3840 × 2160 y vertical de 2160 × 3840. Añade en CSS la luz radial, el color de base y la sombra de contacto. |
| Variantes y extras | Una vista del producto por cambio visible de acabado o sabor. Genera cada accesorio o topping compatible con un punto de anclaje en la base. | La elección actualiza la ficha y la miniatura del pedido. La geometría y el área del encuadre admiten el extra más alto. |

Empieza con un producto alto y otro ancho para fijar cámara, perspectiva, iluminación, escala y tratamiento de bordes. Extiende la serie a todos los artículos que entren en las galerías de pantalla completa. Con una buena toma oficial puedes aislar el sujeto. Una foto pequeña, plana o mal iluminada sirve como referencia para **generar de nuevo la pieza entera**. En una presentación de otro tamaño, reconstruye el recipiente o la carcasa correctos y coloca la etiqueta a su escala real.

Comprueba cada recorte sobre blanco, negro y un color saturado. Revisa asas, vidrio, bordes de tejido, etiquetas y piezas finas al 100 %. La transparencia debe estar en el canal alfa. Si amplías un render hasta 3840 px, guarda sus dimensiones nativas y las de exportación. Entrega al navegador miniaturas de unos 480–510 px, imágenes habituales de unos 1000–1200 px y una versión de alta resolución en WebP o AVIF según el tamaño visible. Guarda los maestros aparte.

### Prompts de producción para un generador de imágenes

**Producto entero.** «Usa la referencia de [producto y presentación exacta]. Genera una nueva toma de estudio de la pieza entera, centrada, con [rasgos verificables] y [material]. Conserva la silueta, la etiqueta y la proporción de [detalle]. Cámara [ángulo común de la serie], luz suave superior izquierda, volumen visible y textura nítida. Deja un pequeño margen transparente alrededor de todo el contorno. Entrega el sujeto aislado sobre alfa real.»

**Objeto secundario.** «Genera una sola pieza de [componente real] en tres cuartos. Orienta [detalle reconocible] hacia la cámara. Iguala la luz y el acabado del producto adjunto. Mantén el contorno entero y la textura legible incluso a 48 px. Fondo transparente.»

**Fondo.** «Escenario vacío en [tono del producto]. Coloca una macro de [detalle propio] en [borde superior derecho] y otra textura más tenue en [esquina opuesta]. Conserva despejados el centro del producto y la zona de lectura. Luz coherente con la toma de estudio. Genera una composición 16:9 y reencuadra la escena para 9:16. El producto, las letras y los botones se incorporan en la web.»

**Variante.** «Usa la imagen maestra de [modelo]. Aplica [acabado, material o sabor real] únicamente a [zona que cambia]. Conserva encuadre, escala, logo y piezas permanentes. Para [extra] entrega otra pieza aislada, orientada para encajar en [punto de anclaje].»

Registra en el proyecto la referencia y la procedencia de cada recurso. Un fondo o un maestro puede reutilizarse cuando dos presentaciones compartan realmente la misma imagen. Cada presentación conserva sus propios datos y su composición.

## 5. Conecta cada escena con el catálogo

Mantén una sola fuente de datos para portada, galería, ficha, video y carrito. Un manifiesto relaciona el ID comercial con el tratamiento visual. Este ejemplo ficticio usa rutas relativas para los recursos que producirá cada proyecto.

```json
{
  "id": "lampara-arco",
  "nombre": "Arco de lino",
  "familia": "Iluminación",
  "ordenDestacado": 1,
  "precioMenor": 14900,
  "moneda": "EUR",
  "escena": {
    "tono": "#B4C48D", "luz": "#E9F0CC", "tinta": "#233019",
    "acento": "#384C22", "boton": "#304321", "tintaBoton": "#FFFFFF", "superficie": "#F2F5E8",
    "miniatura": "arte/arco/510.webp", "imagen": "arte/arco/1200.webp",
    "alta": "arte/arco/3840.webp", "modelo": "arte/arco/entera.glb",
    "fondoPC": "arte/arco/fondo-ancho.webp", "fondoMovil": "arte/arco/fondo-alto.webp",
    "objetos": [
      {"imagen": "arte/piezas/lino.webp", "pc": [71, 28, 11], "movil": [81, 25, 18]},
      {"imagen": "arte/piezas/bisagra.webp", "pc": [30, 63, 8], "movil": [19, 56, 14]}
    ]
  },
  "variantes": [
    {"id": "terracota", "nombre": "Terracota", "imagen": "arte/arco/terracota.webp",
     "muestra": "arte/arco/muestra-terracota.webp", "disponible": true,
     "tema": {"tono": "#FF794F", "luz": "#FFCEAF", "tinta": "#381810",
              "acento": "#713521", "boton": "#5F2819", "tintaBoton": "#FFFFFF", "superficie": "#FFE9DF",
              "fondoPC": "arte/arco/arcilla-ancha.webp", "fondoMovil": "arte/arco/arcilla-alta.webp"}}
  ],
  "extras": [{"id": "difusor", "nombre": "Difusor", "suplementoMenor": 1200,
             "imagen": "arte/arco/difusor.webp", "anclaje": [0.50, 0.34]}],
  "materiales": ["Lino", "Latón"],
  "videos": [{"id": "acabado-a-mano", "portada": "medios/acabado.webp",
             "archivo": "medios/acabado.mp4", "productos": ["lampara-arco"]}]
}
```

En `pc` y `movil`, los tres valores sitúan el centro de la pieza en X e Y y fijan su ancho como porcentaje del escenario. El `anclaje` del extra se mide de 0 a 1 sobre la imagen del producto, desde su esquina superior izquierda. Precio y suplemento usan la unidad menor de la moneda. La ficha aplica el `tema` de la variante seleccionada. Los videos apuntan a IDs del catálogo y, si provienen de una publicación, conservan también su enlace original.

## 6. Construye las galerías y el movimiento

### Encuadre

La portada deja espacio para leer a la izquierda. La galería de una familia **centra** el producto. Coloca arriba el nombre de la familia y el contador de posición. Abajo van el nombre, la medida si aplica, «Ver ingredientes» o «Ver materiales», el precio y la acción principal. Una línea de progreso discreta y «Desliza para explorar» pueden indicar que existen más artículos.

| Parámetro | Valor inicial |
| --- | --- |
| Alto de una galería | `100vh` como respaldo y `100dvh` en el navegador que lo admita. La cabecera de destacados puede usar un panel `sticky` de `100svh`. |
| Distancia entre centros del carrusel | En escritorio, `min(42%, 680px)` del ancho del carril. En móvil, alrededor del 55 %. Reserva medio espacio a ambos extremos para poder centrar el primero y el último. |
| Producto central y vecinos | Centro al 100 % de escala y opacidad. A un paso del centro, escala del 54 % y opacidad del 18 %. Interpola con el desplazamiento real y oculta el contenido lejano. |
| Producto alto en PC | Con puntero fino, el escenario de imagen empieza unos 6 px bajo la barra y termina a `clamp(40px, 6.7dvh, 100px)` del borde inferior. La foto ocupa el 97 % de ese espacio con `object-fit: contain`. Como control, una pieza alta puede ocupar unos 640 px en una ventana de 1536 × 800. |
| Producto en móvil | Calcula el encuadre de forma independiente. En 390 × 844, una pieza alta puede ocupar unos 480 px en la galería. Reserva el pie para nombre, precio y botón. Un producto ancho puede desbordar su celda interna, siempre dentro de la pantalla y con su silueta entera. |

Para la malla 3D, parte del perfil real. En un objeto de revolución, construye anillos siguiendo los cambios de anchura. En una pieza asimétrica, modela por separado los volúmenes que definen su silueta, como una pantalla y su brazo. Proyecta la textura sobre la malla con coordenadas UV, comprueba la orientación de la etiqueta y exporta el modelo en GLB. Con una sola toma, usa giros breves, aproximadamente ±16–20° en horizontal y ±6–9° en vertical, según el objeto. El giro completo de 360° requiere un modelo completo o referencias de todos los lados. Alinea la foto y el primer fotograma 3D por su contorno, escala y centro. La foto permanece visible hasta que el modelo esté dibujado.

### Un gesto, un resultado

| Entrada del visitante | Respuesta |
| --- | --- |
| Rueda o deslizamiento vertical en destacados | Avanza un destacado por impulso. Agrupa los eventos de inercia con el gesto que los originó. Desde el último destacado, el siguiente gesto descendente alinea la primera familia. Oculta la barra de scroll de la página mientras se está en la portada y recupérala al salir. |
| Rueda vertical entre familias | Centra una sección completa con la parte superior en el borde del viewport. Hacia arriba se vuelve a la anterior. Desde la última se llega a la cuadrícula con su título visible debajo de la barra. La sección larga conserva su scroll libre. |
| Trackpad horizontal, rueda con Mayús o arrastre con ratón | Cambia de producto dentro de la familia. En un gesto diagonal decide por el eje dominante. En pantalla táctil conserva el deslizamiento horizontal nativo y el zoom con dos dedos. |
| Clic o toque sobre un producto | Abre la ficha del artículo pulsado, incluso si se ve como vecino lateral. Distingue clic de arrastre con unos 7 px de tolerancia. Captura el puntero al confirmar el arrastre y consume el clic que podría producirse al soltarlo. |
| Teclado y enlaces | Tab lleva a la imagen o al botón. Intro abre la ficha. Izquierda y derecha recorren el carrusel enfocado. Las teclas verticales recorren las secciones. Escape cierra la ficha y devuelve el foco a quien la abrió. Una URL con fragmento abre el producto destacado o la sección correspondiente. |

En la portada, fija el panel con `position: sticky` y calcula el recorrido a partir del número de destacados. Un punto de partida por paso es `clamp(170px, 36vh, 350px)`. Suma a la altura del panel un paso por cada transición. En la galería, usa un carril horizontal con `scroll-snap-align: center` en cada posición. Conserva la última posición visitada al volver a una familia.

Guarda el índice activo, el destino y la posición dibujada por separado. Usa `event.timeStamp` para distinguir una nueva muesca de la cola decreciente de un trackpad. Como calibración inicial, acumula unos 5 px de rueda o unos 20 px de gesto táctil vertical. Una muesca nueva, un incremento claro tras la inercia o una inversión deliberada deben responder enseguida. En tarjetas y videos, deja actuar el scroll del documento. Mientras una ficha esté abierta, el desplazamiento pertenece a la ficha.

Ajusta el paso horizontal en unos **165 ms**, el centrado vertical en **205 ms** y el fundido de fondo en **125 ms**. El tono nuevo entra en cuanto cambia el índice, aunque la fotografía de fondo siga decodificándose. Anima con `requestAnimationFrame`, cancela el movimiento anterior al recibir otro destino y recalcula los centros al cambiar el tamaño. Con un solo producto, presenta una escena fija.

### Piezas que responden al puntero

Distribuye los elementos secundarios en diagonales suaves y a diferentes profundidades. Una pieza puede quedar al 70 % del ancho y 27 % del alto, otra al 30 % y 63 %. Anima órbitas cortas con fases diferentes. En escritorio funcionan recorridos de unos 20–32 px a lo largo de 5–8 s y rotaciones suaves de unos 5–7°. Separa la órbita de la transformación que responde al puntero para que ambas se sumen.

La pieza más cercana al ratón se desplaza, se inclina y puede crecer hasta un 16 %. Las otras responden con menor intensidad. Calcula la proximidad por pieza aunque el visor 3D todavía esté cargando. Al retirar el ratón, vuelve con suavidad al reposo. En móvil reduce la amplitud aproximadamente a la mitad y conserva el área táctil de fotos y botones. En la portada, una pieza informativa puede mostrar su nombre al recibir foco y abrir el mismo desglose del producto. En la galería, las piezas decorativas llevan `pointer-events: none` y `aria-hidden="true"` para dejar libre la interacción con la foto.

## 7. Resuelve la compra dentro de la ficha

- **Dos entradas.** Pulsar la foto abre el producto entero. El botón «Agregar al carrito» añade directamente un producto sencillo. Cuando hay elecciones obligatorias, el botón dice «Elegir sabor», «Elegir acabado» o el término propio de la marca y abre su ficha.
- **Un detalle legible.** En escritorio, usa un diálogo de hasta unos 960 px con el escenario a la izquierda y los datos a la derecha. En móvil, sitúa la imagen arriba y deja desplazable el panel de opciones. Respeta los márgenes seguros del dispositivo al colocar el cierre y la acción de compra. Mantén el foco dentro del diálogo mientras esté abierto. «Ver ingredientes», «Ver materiales» o «Ver componentes» despliega una lista compacta de nombres y, si aportan valor, miniaturas. La imagen principal sigue mostrando el producto completo. Si la ficha admite giro, aplícalo al producto entero. El enlace directo al desglose lo abre expandido.
- **Variantes visibles.** Usa muestras fotográficas con nombre, selección marcada y radios accesibles por teclado. Al elegir, actualiza en el mismo paso la imagen o textura correcta, el fondo decorativo con un tono más brillante de la variante, la tinta, el botón, el precio y la disponibilidad. Mantén reconocibles las zonas que conservan su material o su etiqueta. Un artículo de acabado fijo presenta solo las elecciones que admite.
- **Extras visibles.** Usa miniatura, nombre y suplemento por unidad. Si el extra cambia el aspecto, compón su imagen o malla en un anclaje del producto. Comprueba que permanece dentro del encuadre al girar y que la miniatura del carrito identifica la configuración.
- **Confirmación.** Actualiza inmediatamente el contador. Haz que una miniatura de la selección, de unos 75 px en escritorio y 58 px en móvil, viaje desde el producto hasta el carrito en un arco de unos 560 ms, seguida de un pulso corto en el contador. Muestra un aviso accesible con «Ver carrito». La confirmación y la compra funcionan también con animación reducida.
- **Pedido coherente.** Cada línea guarda ID de producto, variante, extras, cantidad y precio. Fusiona líneas idénticas y conserva separadas las configuraciones distintas. Restaura el carrito al recargar. Revalida precio y existencias antes de continuar al destino oficial. Si es WhatsApp, prepara el mensaje con cantidades, opciones y subtotal en la moneda del negocio.

## 8. Trata las fotografías del resto y los videos de forma distinta

**Cuadrícula.** La foto dispone de una zona propia. Debajo, una banda de la marca contiene nombre, precio y botón. Así se ven por completo tanto el producto como los títulos largos. Parte de cuatro columnas en escritorio y dos en móvil, con 12–18 px de separación. Usa `contain` para carteles con texto o composiciones cuyo contorno importa. Aplica `cover` solo después de comprobar el encuadre de esa imagen. Un relleno lateral tenue puede extender el color de una foto vertical. La imagen y el título abren la ficha y el botón conserva su acción directa.

**Videos.** Selecciona publicaciones del canal real de la marca y relaciona cada una con el producto que efectivamente aparece. En escritorio, usa el fotograma como fondo atenuado, el título y la acción a la izquierda y el reproductor vertical 9:16 a la derecha. En móvil, la portada ocupa la pantalla. Un botón «Reproducir» inicia el video con controles y `playsinline`. Durante la reproducción, coloca «Pedir [producto]» en una franja propia, con los controles del reproductor despejados. El botón abre esa ficha en el acto. Para material entregado por la marca puedes servir el archivo optimizado. Si dispones de un enlace público compatible, carga el reproductor oficial al pulsar. Pausa al salir de pantalla o abrir un diálogo, mantén un solo video en reproducción y ofrece el enlace original si el medio falla. Dibuja «Siguiente», «Abrir original» y el carrito con iconos SVG de trazo consistente.

## 9. Carga primero lo que el visitante está viendo

Sirve el catálogo y la primera escena como HTML legible. Reserva la geometría de las imágenes, utiliza `srcset`, `sizes` y fondos adaptados a orientación. Da prioridad a la primera foto. En conexiones lentas, conserva la miniatura hasta que `decode()` confirme la imagen de mayor tamaño. Si hay una fuente de catálogo en vivo, muestra primero la última copia válida y actualiza las fichas sin mover al visitante de su posición.

Prepara los retratos y fondos de los dos vecinos inmediatos. Reutiliza el mismo visor WebGL al pasar de producto dentro de la familia visible. Los vecinos se representan con imágenes. Monta el GLB del artículo activo cuando se estabilice la selección y libera los recursos de las secciones que salen de pantalla. Como umbral de partida, carga la textura de 4K cuando el lado mostrado, multiplicado por la densidad del dispositivo limitada a 2, supere unos 1440 píxeles físicos. Protege los cambios rápidos para que una descarga tardía nunca reemplace el producto que ya está seleccionado.

Con ahorro de datos, usa la fotografía y la ficha funcional. Con movimiento reducido, sustituye órbitas, vuelos y transiciones por cambios inmediatos. Mantén fotos, precio y acción disponibles ante un fallo de WebGL. Carga los videos al pulsar reproducir. Ofrece foco visible, nombres accesibles y áreas táctiles cercanas a 44 × 44 px o mayores para las acciones principales.

## 10. Pruebas de aceptación y entrega

| Prueba | Resultado que se debe observar |
| --- | --- |
| Escritorio y teléfono | Captura el mismo producto alto y otro ancho en 1536 × 800 y 390 × 844. Revisa también 320 px de ancho y teléfono horizontal. Se ven completos la silueta, el nombre y la acción. El ajuste de escritorio conserva el encuadre móvil. |
| Inercia y cambio de eje | Una ráfaga vertical decreciente como `110, 72, 36, 17, 6, 2` avanza una vez. Una nueva muesca deliberada avanza otra. El recorrido horizontal conserva la posición vertical. El regreso desde la cuadrícula vuelve a una familia alineada, con unos 2 px de tolerancia. |
| Foto, arrastre y teclado | Pulsa imagen central, vecino, destacado y tarjeta. Cada uno abre su propio ID. Arrastra desde el mismo punto y verifica que cambia el producto. Abre con Intro, cierra con Escape y comprueba el foco de regreso. |
| Tema y pedido | Elige dos variantes muy distintas y un extra. Comprueba fondo, textura, imagen del carrito, nombre, cantidad, precio y total. Recarga y abre el último paso de compra o consulta. |
| Legibilidad y videos | Revisa el cartel más vertical y el título más largo. La banda de datos queda bajo la foto. En móvil, reproduce un video, pulsa su botón de pedido y verifica el artículo y el retorno a ese video. |
| Carga y accesibilidad | Prueba red lenta, ahorro de datos, movimiento reducido y WebGL desactivado. El primer producto aparece, se puede pedir y los videos esperan la pulsación. En una pantalla de alta densidad, comprueba que la textura grande corresponde al producto enfocado. |

Entrega una vista previa utilizable, capturas de escritorio y móvil y un resumen de lo que probaste en navegador, en emulación o en dispositivo físico. Señala las imágenes generadas o ampliadas y los datos que quedaron pendientes de confirmar. Si el encargo incluye publicación, revisa los cambios, sube al repositorio y al alojamiento indicados y espera a que la versión de producción esté lista. Por ejemplo, con GitHub y Vercel comprueba que el dominio público sirve el commit entregado. Abre esa URL y repite el recorrido hasta la acción principal. Cuando incluya el portafolio, comprueba su imagen de portada y sus enlaces al proyecto y a la web publicada.

---

La guía original acredita a Damir Sokolovsky por criterios de dirección visual de *Unslop*. Esta edición desarrolla la composición por producto, la interacción y las pruebas como especificación reutilizable. [Unslop](https://github.com/heydamir/unslop) · [Licencia de la obra de referencia, CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

# Construcción del logo de Papas y Café

La marca combina rotulación contundente, sombra plana roja y un contraste de letras manuscritas. Un solo emblema reúne las papas doradas, la taza y una empanada que funciona como base de la composición. El sello circular permite llevar la marca a redes, empaques y avisos.

Los SVG son autónomos: todas las letras son trazados vectoriales. No requieren fuentes instaladas ni recursos remotos.

Para regenerarlos, sitúate primero en la carpeta `papas-y-cafe/` (desde la raíz del repositorio: `cd papas-y-cafe`):

```sh
npm ci --prefix tools
node tools/generate-brand.mjs
```

Esto actualiza `logo.svg` (oscuro), `logo-light.svg` (claro), `logo-mark.svg`, `logo-badge.svg` y `favicon.svg` dentro de `dist/assets/`.

Fuentes originales sin modificaciones, ambas bajo SIL Open Font License 1.1:

- **Lilita One**, Juan Montoreano. [Fuente y licencia originales](https://github.com/google/fonts/tree/main/ofl/lilitaone). Copia local: `logo-fonts/LilitaOne-Regular.ttf` y `LilitaOne-OFL.txt`.
- **Lobster**, The Lobster Project Authors. [Fuente y licencia originales](https://github.com/google/fonts/tree/main/ofl/lobster). Copia local: `logo-fonts/Lobster-Regular.ttf` y `Lobster-OFL.txt`.

Las fuentes sólo se emplean al construir los trazados; no se cargan en la página.

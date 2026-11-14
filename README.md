# Papas y Café

Página web y propuesta de identidad para Papas y Café.

```bash
npm run dev
```

Abre `http://localhost:4173`. No requiere instalar dependencias. Para comprobar la sintaxis, ejecuta `npm run check`.

El proyecto está en [`papas-y-cafe/`](./papas-y-cafe/README.md) y la página en [`papas-y-cafe/dist/index.html`](./papas-y-cafe/dist/index.html).

## Estructura del repositorio

Este es un único repositorio Git: `.git` está en esta carpeta. `papas-y-cafe/` es una subcarpeta del mismo repositorio; no necesita otro `git init` ni otro repositorio en GitHub.

```text
potatoes_and_coffee/
├── .git/
├── .gitignore
├── package.json       # Comandos desde la raíz
├── vercel.json        # Configuración para v0 y Vercel
└── papas-y-cafe/
    ├── dist/          # Página, CSS, JavaScript, fotos y logos publicables
    ├── serve.mjs      # Servidor para desarrollo y vista previa
    ├── referencias/   # Cartas anteriores, fuera de la web publicada
    └── tools/         # Generador del logo y licencias
```

`dist/` contiene el código fuente de esta página estática y debe subirse a GitHub. `node_modules/`, `.vercel/` y los archivos `.env` quedan ignorados.

## Subir cambios a GitHub

Ejecuta estos comandos desde la raíz, la misma carpeta que contiene `.git`:

```bash
git status
git add .
git commit -m "Actualizar página de Papas y Café"
git push origin main
```

Repositorio: [Santiagop311/potatoes_and_coffee](https://github.com/Santiagop311/potatoes_and_coffee).

## Importar en v0 y desplegar en Vercel

En v0, abre un chat nuevo y elige **+ → Import from… → Import from GitHub**. Usa la URL del repositorio anterior, la rama `main` y **Root Directory `./`**. La integración de GitHub de Vercel debe tener acceso al repositorio.

La configuración de `vercel.json` deja estos valores listos:

| Ajuste | Valor |
| --- | --- |
| Root Directory | `./` (raíz del repositorio) |
| Framework Preset | `Other` |
| Build Command | Vacío, sin compilación |
| Install Command | Vacío, sin dependencias de ejecución |
| Output Directory | `papas-y-cafe/dist` |
| Development Command | `npm run dev` |

No selecciones `papas-y-cafe/dist` como raíz: esa carpeta es la **salida publicable**. La raíz del proyecto sigue siendo `./`. Las herramientas opcionales del logo no se necesitan para desplegar la página.

La vista previa admite `PORT` y `HOST`; por defecto escucha en `0.0.0.0` para funcionar en el sandbox de v0. Vercel sirve `dist/` como archivos estáticos y no ejecuta `serve.mjs` en producción.

Cuando tengas la URL pública o un dominio propio, actualiza `og:url` y `og:image` en `papas-y-cafe/dist/index.html` para que los enlaces compartidos apunten al nuevo dominio. Actualmente usan la dirección de la propuesta privada en Sites.

Consulta las guías oficiales de [importación en v0](https://v0.app/docs/git-import), [configuración de compilación en Vercel](https://vercel.com/docs/builds/configure-a-build) y [vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

# Systenger · Site Institucional

Site institucional de la contratista panameña **Systenger** — estructuras
metálicas prefabricadas, fachadas Smart Wall y edificios industriales.

## Estructura

```
.
├── index.html               # HOME single-page (ES/EN/PT)
├── vercel.json              # config de deploy
└── assets/
    ├── styles.css           # estilos custom (sobre Tailwind)
    ├── app.js               # i18n, slider, scroll-reveal, contadores
    ├── translations.js      # diccionario ES/EN/PT (editable)
    ├── favicon.svg
    └── og-image.svg
```

## Idiomas

- ES (Panamá) — predeterminado
- EN — inglés
- PT — portugués (Brasil)

Cambiá los textos en `assets/translations.js`. Cada clave existe en los tres
idiomas; el switcher en header/footer activa la traducción en vivo y persiste
la elección del usuario en `localStorage`.

## Marcadores editables

Los lugares que esperan datos reales están marcados con `[XX]`, `[XXXX-XXXX]`
o `[XXXXXXXX]` — buscalos y reemplazalos.

Para animar contadores numéricos, agregá `data-target="120"` al elemento
`.counter` correspondiente (la animación ya está implementada).

## Deploy en Vercel

```bash
vercel deploy --prod
```

Sin build step — es HTML estático con Tailwind por CDN.

## Próximas páginas (a confirmar)

- Sobre Nosotros / Historia / Calidad / Certificaciones
- Cada Unidad de Negocio en detalle (4 páginas)
- Procesos y Tecnología
- Instalaciones
- Ventajas del Acero
- Contacto (con formulario)

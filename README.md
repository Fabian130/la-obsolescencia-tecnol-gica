# Falla de Mercado en Medios Impresos

Página web académica sobre **obsolescencia tecnológica en la industria de medios impresos en Colombia**, desarrollada como trabajo universitario para la asignatura de Economía y Finanzas.

## Vista previa

La página incluye:
- Hero con contador de estadísticas animado
- 8 secciones de análisis económico universitario en español
- 4 gráficas interactivas con D3.js (línea, barras, dona, áreas apiladas)
- Sección de descarga/impresión como PDF
- Diseño responsive para computador y celular

---

## Requisitos previos

Antes de correr el proyecto necesitas tener instalado:

- [Node.js 18 o superior](https://nodejs.org/) — incluye `npm`
- [pnpm](https://pnpm.io/) — gestor de paquetes (instalación abajo)
- [Visual Studio Code](https://code.visualstudio.com/)

### Instalar pnpm (si no lo tienes)

Abre una terminal y ejecuta:

```bash
npm install -g pnpm
```

---

## Cómo correr el proyecto en VS Code

### 1. Clonar el repositorio

Abre VS Code, luego abre una terminal integrada (`Ctrl + ` ` ` ` ` `) y ejecuta:

```bash
git clone https://github.com/Fabian130/la-obsolescencia-tecnol-gica.git
cd la-obsolescencia-tecnol-gica
git checkout fabian
```

### 2. Ir a la carpeta del proyecto web

```bash
cd artifacts/medios-impresos
```

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

Verás algo como:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Abrir en el navegador

Abre tu navegador y ve a:

```
http://localhost:5173
```

¡Listo! La página debe estar corriendo con todas las gráficas interactivas.

---

## Estructura de archivos

```
artifacts/medios-impresos/
├── index.html                  # Punto de entrada HTML
├── package.json                # Dependencias del proyecto
├── vite.config.ts              # Configuración de Vite
├── tsconfig.json               # Configuración de TypeScript
└── src/
    ├── main.tsx                # Punto de entrada de React
    ├── App.tsx                 # Componente raíz y rutas
    ├── index.css               # Estilos globales y tema
    ├── pages/
    │   └── Home.tsx            # Página principal (todo el contenido académico)
    └── components/
        ├── ContadorHero.tsx    # Contador animado de estadísticas
        ├── DescargaPDF.tsx     # Sección de descarga PDF
        └── charts/
            ├── CirculacionChart.tsx   # Gráfica de línea (circulación vs digital)
            ├── PublicidadChart.tsx    # Gráfica de barras (ingresos publicitarios)
            ├── ConsumoChart.tsx       # Gráfica de dona (consumo por canal)
            └── TransicionChart.tsx    # Gráfica de áreas (transición tecnológica)
```

---

## Editar los datos de las gráficas

Los datos de cada gráfica están declarados al inicio de cada archivo en `src/components/charts/`. Son objetos JavaScript fácilmente editables:

**Ejemplo en `CirculacionChart.tsx`:**
```typescript
export const circulacionData = {
  years:   [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
  impresa: [850,  780,  690,  580,  450,  320,  210,  145],
  digital: [12,   28,   58,   110,  195,  310,  420,  510],
};
```

Cambia los valores y Vite actualizará la página automáticamente.

---

## Generar el PDF

Desde la página en el navegador:
1. Haz scroll hasta la sección **"Descargar como PDF"** al final de la página.
2. Haz clic en el botón **"Descargar PDF"**.
3. En el diálogo de impresión del navegador, selecciona **"Guardar como PDF"**.
4. Recomendado: desactiva los encabezados/pies de página del navegador para un resultado más limpio.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| React 19 | Interfaz de usuario |
| TypeScript | Tipado estático |
| Vite | Bundler y servidor de desarrollo |
| D3.js v7 | Gráficas interactivas SVG |
| Tailwind CSS v4 | Estilos utilitarios |
| Wouter | Enrutamiento ligero |
| Playfair Display + Inter | Tipografías (Google Fonts) |

---

## Nota sobre los datos

Los datos utilizados en las gráficas son **ilustrativos** y están basados en tendencias documentadas del sector de medios de comunicación. No representan cifras oficiales precisas. Las fuentes bibliográficas se listan en la sección de Referencias dentro de la propia página.

---

## Licencia

Uso académico. Trabajo desarrollado para la asignatura de Economía y Finanzas.

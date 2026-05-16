# Falla de Mercado en Medios Impresos

Página web académica sobre **obsolescencia tecnológica en la industria de medios impresos en Colombia**, desarrollada como trabajo universitario para la asignatura de Economía y Finanzas.

## Contenido

La página incluye:
- Hero con contador animado de estadísticas clave
- 8 secciones de análisis económico en español
- 4 gráficas interactivas con D3.js (línea, barras, dona, áreas apiladas)
- Sección de descarga/impresión como PDF
- Diseño responsive para computador y celular

---

## Requisitos previos

Instala estas herramientas antes de continuar:

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|---------|
| Node.js | 18 o superior | https://nodejs.org |
| pnpm | 8 o superior | ver abajo |
| VS Code | cualquiera | https://code.visualstudio.com |

### Instalar pnpm

Abre una terminal (cmd, PowerShell o Terminal de VS Code) y ejecuta:

```bash
npm install -g pnpm
```

Verifica que quedó instalado:

```bash
pnpm --version
```

---

## Cómo correr el proyecto en VS Code

### 1. Clonar el repositorio

Abre VS Code. Luego abre la terminal integrada con **Ctrl + `** (acento grave) y ejecuta:

```bash
git clone https://github.com/Fabian130/la-obsolescencia-tecnol-gica.git
cd la-obsolescencia-tecnol-gica
git checkout fabian
```

### 2. Instalar dependencias

Desde la raíz del proyecto clonado:

```bash
pnpm install
```

### 3. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

El navegador se abrirá automáticamente en **http://localhost:5173** con la página funcionando.

> Si el navegador no abre solo, escríbelo tú manualmente en la barra de direcciones.

### 4. Detener el servidor

Presiona **Ctrl + C** en la terminal.

---

## Estructura del proyecto

```
la-obsolescencia-tecnol-gica/
├── index.html                  # Página HTML de entrada
├── package.json                # Dependencias del proyecto
├── vite.config.ts              # Configuración de Vite (bundler)
├── tsconfig.json               # Configuración de TypeScript
└── src/
    ├── main.tsx                # Punto de entrada de React
    ├── App.tsx                 # Componente raíz y rutas
    ├── index.css               # Estilos globales y tema de color
    ├── pages/
    │   └── Home.tsx            # Página principal con todo el contenido académico
    └── components/
        ├── ContadorHero.tsx    # Contador animado de estadísticas en el hero
        ├── DescargaPDF.tsx     # Sección de descarga como PDF
        └── charts/
            ├── CirculacionChart.tsx   # Gráfica de línea — circulación impresa vs digital
            ├── PublicidadChart.tsx    # Gráfica de barras — ingresos publicitarios
            ├── ConsumoChart.tsx       # Gráfica de dona — consumo por canal
            └── TransicionChart.tsx    # Gráfica de áreas — transición tecnológica
```

---

## Editar los datos de las gráficas

Los datos de cada gráfica están al inicio de cada archivo en `src/components/charts/`. Son objetos JavaScript que puedes cambiar directamente:

**Ejemplo en `CirculacionChart.tsx`:**
```typescript
export const circulacionData = {
  years:   [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
  impresa: [850,  780,  690,  580,  450,  320,  210,  145],
  digital: [12,   28,   58,   110,  195,  310,  420,  510],
};
```

Guarda el archivo y Vite actualiza la página automáticamente.

---

## Generar el PDF

1. Haz scroll hasta la sección **"Descargar como PDF"** al final de la página.
2. Haz clic en el botón **"Descargar PDF"**.
3. En el cuadro de impresión del navegador, selecciona **"Guardar como PDF"**.
4. Recomendado: desactiva encabezados y pies de página del navegador para un resultado más limpio.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| React 19 | Interfaz de usuario |
| TypeScript | Tipado estático |
| Vite | Servidor de desarrollo y bundler |
| D3.js v7 | Gráficas interactivas SVG |
| Tailwind CSS v4 | Estilos utilitarios |
| Wouter | Enrutamiento ligero |
| Playfair Display + Inter | Tipografías (Google Fonts) |

---

## Preguntas frecuentes

**¿Por qué falla `pnpm install` en el repositorio si clono desde la rama `main`?**
Usa siempre la rama `fabian`. Esa es la versión del proyecto lista para correr localmente.

**¿Necesito instalar algo más además de Node.js y pnpm?**
No. Todas las demás dependencias se instalan automáticamente con `pnpm install`.

**¿Funciona en Mac o Linux también?**
Sí, los comandos son los mismos en macOS y Linux.

---

## Nota sobre los datos

Los datos utilizados en las gráficas son **ilustrativos** y están basados en tendencias documentadas del sector de medios de comunicación. No representan cifras oficiales precisas. Las fuentes bibliográficas están listadas en la sección de Referencias dentro de la página.

---

## Licencia

Uso académico. Trabajo desarrollado para la asignatura de Economía y Finanzas.

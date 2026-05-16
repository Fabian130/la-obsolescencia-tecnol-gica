# Falla de Mercado en Medios Impresos

Página web académica sobre **obsolescencia tecnológica en la industria de medios impresos en Colombia**, desarrollada como trabajo universitario para la asignatura de Economía y Finanzas.

## Contenido de la página

- Hero con contador animado de estadísticas clave
- 8 secciones de análisis económico en español
- 4 gráficas interactivas con D3.js (línea, barras, dona, áreas apiladas)
- Sección de descarga como PDF
- Diseño responsive para computador y celular

---

## Paso 1 — Instalar Git

Git es el programa que permite descargar el proyecto desde GitHub.

1. Ve a **https://git-scm.com/download/win**
2. Descarga el instalador **"64-bit Git for Windows Setup"**
3. Ejecuta el instalador y haz clic en **Next** en todas las pantallas (las opciones por defecto están bien)
4. Al terminar, **cierra VS Code completamente y vuelve a abrirlo** para que reconozca Git

Para verificar que quedó instalado, abre una nueva terminal en VS Code (**Ctrl + `**) y escribe:
```
git --version
```
Debes ver algo como: `git version 2.x.x.windows.x`

---

## Paso 2 — Instalar Node.js

Node.js es el entorno que ejecuta el proyecto.

1. Ve a **https://nodejs.org**
2. Descarga la versión **LTS** (la recomendada, número par)
3. Ejecuta el instalador y acepta todas las opciones por defecto
4. Reinicia VS Code después de instalar

Verifica con:
```
node --version
```
Debe mostrar: `v18.x.x` o superior

---

## Paso 3 — Instalar pnpm

pnpm es el gestor de paquetes del proyecto (como npm pero más rápido).

Abre la terminal de VS Code y ejecuta:
```
npm install -g pnpm
```

Verifica:
```
pnpm --version
```
Debe mostrar: `8.x.x` o superior

---

## Paso 4 — Descargar y correr el proyecto

Con Git, Node.js y pnpm ya instalados, ejecuta estos comandos **uno por uno** en la terminal de VS Code:

```bash
git clone https://github.com/Fabian130/la-obsolescencia-tecnol-gica.git
```
```bash
cd la-obsolescencia-tecnol-gica
```
```bash
git checkout fabian
```
```bash
pnpm install
```
```bash
pnpm dev
```

El navegador se abrirá automáticamente en **http://localhost:5173**

> **¿El navegador no abrió solo?** Escribe `http://localhost:5173` manualmente en Chrome o Edge.

Para detener el servidor presiona **Ctrl + C** en la terminal.

---

## Ejecutar el proyecto en el futuro

La próxima vez que quieras ver el proyecto solo necesitas:

```bash
cd la-obsolescencia-tecnol-gica
pnpm dev
```

No es necesario volver a clonar ni instalar.

---

## Estructura del proyecto

```
la-obsolescencia-tecnol-gica/
├── index.html                  # Página HTML de entrada
├── package.json                # Lista de dependencias
├── vite.config.ts              # Configuración del servidor local
├── tsconfig.json               # Configuración de TypeScript
└── src/
    ├── main.tsx                # Punto de entrada de React
    ├── App.tsx                 # Componente raíz
    ├── index.css               # Estilos globales
    ├── pages/
    │   └── Home.tsx            # Página principal con todo el contenido
    └── components/
        ├── ContadorHero.tsx    # Contador animado en el hero
        ├── DescargaPDF.tsx     # Botón de descarga PDF
        └── charts/
            ├── CirculacionChart.tsx   # Gráfica de línea
            ├── PublicidadChart.tsx    # Gráfica de barras
            ├── ConsumoChart.tsx       # Gráfica de dona
            └── TransicionChart.tsx    # Gráfica de áreas
```

---

## Editar los datos de las gráficas

Los datos están al inicio de cada archivo en `src/components/charts/`:

```typescript
// CirculacionChart.tsx — cambia estos números
export const circulacionData = {
  years:   [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
  impresa: [850,  780,  690,  580,  450,  320,  210,  145],
  digital: [12,   28,   58,   110,  195,  310,  420,  510],
};
```

Guarda el archivo y la página se actualiza automáticamente.

---

## Generar el PDF

1. En la página que abrió el navegador, baja hasta la sección **"Descargar como PDF"**
2. Haz clic en el botón **"Descargar PDF"**
3. Se abre el cuadro de impresión del navegador — selecciona **"Guardar como PDF"**

---

## Solución a problemas comunes

| Error | Solución |
|-------|----------|
| `git` is not recognized | Instala Git (Paso 1) y reinicia VS Code |
| `pnpm` is not recognized | Cierra y vuelve a abrir VS Code, o reinstala pnpm |
| `node_modules missing` | Ejecuta `pnpm install` desde la carpeta del proyecto |
| Puerto 5173 ocupado | Cierra otras terminales que estén corriendo `pnpm dev` |

---

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Interfaz de usuario |
| TypeScript | 5.8 | Tipado estático |
| Vite | 7 | Servidor de desarrollo |
| D3.js | 7 | Gráficas interactivas |
| Tailwind CSS | 4 | Estilos |
| Wouter | 3 | Rutas |

---

## Nota sobre los datos

Los datos de las gráficas son **ilustrativos**, basados en tendencias documentadas del sector. Las fuentes bibliográficas están en la sección de Referencias dentro de la página.

---

Uso académico — Economía y Finanzas

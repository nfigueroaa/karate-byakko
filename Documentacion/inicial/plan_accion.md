## Configuración del Entorno y Estructura Base
### Paso 1. Inicialización del Proyecto (Modern Stack)
#### Crear la fundación de la aplicación usando Vite, React y Tailwind.
##### Desglose de Tareas
###### Instalación de Framework
* Ejecutar `npm create vite@latest . -- --template react` (Limpiar directorio actual si es necesario).
* Instalar dependencias: `npm install`.
* `package.json`, `index.html`, `vite.config.js`
* Crear

###### Configuración de Tailwind CSS
* Instalar Tailwind y sus dependencias: `npm install -D tailwindcss postcss autoprefixer`.
* Inicializar configuración: `npx tailwindcss init -p`.
* Configurar `tailwind.config.js` para escanear archivos `.jsx` y `.js`.
* Añadir directivas de Tailwind en `src/index.css`.
* `tailwind.config.js`, `src/index.css`
* Crear

###### Estructura de Directorios React
* Limpiar archivos de ejemplo de Vite (App.css, logos).
* Crear carpetas: `src/components`, `src/pages`, `src/hooks`, `src/context`, `src/assets`.
* `src/`
* Actualizar

#### Otros Comentarios del Paso 1
* Configurar `react-router-dom` instalándolo (`npm install react-router-dom`) y envolviendo la App en `BrowserRouter` en `main.jsx`.

## Módulo 1: Portal Institucional (Web Pública)
### Paso 2. Componentes UI y Landing Page
#### Desarrollar el sistema de diseño y la página principal.
##### Desglose de Tareas
###### Componentes Base (Design System)
* Crear botón reutilizable `src/components/ui/Button.jsx`.
* Crear contenedor layout `src/components/layout/Layout.jsx` (Navbar + Footer).
* `src/components/ui/Button.jsx`, `src/components/layout/Navbar.jsx`
* Crear

###### Landing Page y Routing
* Crear página `src/pages/Portal/Home.jsx`.
* Crear página `src/pages/Portal/Sedes.jsx` con listado de staff.
* Configurar rutas en `src/App.jsx`.
* `src/App.jsx`, `src/pages/Portal/Home.jsx`
* Crear

## Módulo 2: Dashboard de Gestión
### Paso 3. Gestión de Datos con React
#### Implementar lectura de Excel y estado global.
##### Desglose de Tareas
###### Hook useExcelParser
* Implementar `src/hooks/useExcel.js` usando `xlsx` para leer datos.
* `src/hooks/useExcel.js`
* Crear

###### Layout Dashboard
* Crear `src/pages/Dashboard/Dashboard.jsx` con sidebar de navegación.
* `src/pages/Dashboard/Dashboard.jsx`
* Crear

### Paso 4. Visualización con Gráficos React
#### Renderizar KPIs y Gráficos.
##### Desglose de Tareas
###### Integración Chart.js React
* Instalar `chart.js` y `react-chartjs-2`.
* Crear componente `src/components/dashboard/AttendanceChart.jsx`.
* `src/components/dashboard/AttendanceChart.jsx`
* Crear

## Módulo 3: Gestión de Torneos (Kumite)
### Paso 5. Aplicación de Torneo (SPA)
#### Lógica de combate compleja y manejo de ventanas.
##### Desglose de Tareas
###### Contexto de Torneo
* Crear `src/context/TournamentContext.jsx` para estado del combate (Timer, Puntajes).
* `src/context/TournamentContext.jsx`
* Crear

###### Marcador Interactivo
* Crear vista `src/pages/Tournament/KumiteScoreboard.jsx`.
* Implementar subcomponentes `ScoreControl` (Botones de puntos) y `TimerDisplay`.
* `src/pages/Tournament/KumiteScoreboard.jsx`
* Crear

###### Proyección y Personalización
* Implementar lógica `BroadcastChannel` para sincronizar con `/kumite/view`.
* Añadir input para cambiar el estado `backgroundImage` en el Contexto.
* `src/pages/Tournament/KumiteScoreboard.jsx`
* Actualizar

#### Otros Comentarios del Paso 5
* Asegurar que el Timer use `useEffect` y `setInterval` con limpieza adecuada para evitar memory leaks.

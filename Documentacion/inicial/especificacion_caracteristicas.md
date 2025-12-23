## Sistema de Archivos

```text
/
├── public/                 # Archivos estáticos públicos (favicon, robots.txt)
├── src/
│   ├── assets/             # Imágenes, fuentes, iconos
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/             # Botones, Inputs, Cards (Design System)
│   │   ├── layout/         # Header, Footer, Sidebar
│   │   ├── dashboard/      # Gráficos, Tablas específicas
│   │   └── tournament/     # Scoreboard, Timer, Controls
│   ├── pages/              # Vistas principales (Rutas)
│   │   ├── Portal/         # Landing, Profesores, Sedes
│   │   ├── Dashboard/      # KPIs, Carga Excel
│   │   └── Tournament/     # Kumite, Kata
│   ├── hooks/              # Custom Hooks (useTimer, useMatchState)
│   ├── context/            # Contexto global (Theme, Auth, TournamentData)
│   ├── utils/              # Helpers (cálculos, formateadores)
│   ├── App.jsx             # Componente raíz y Rutas
│   └── main.jsx            # Punto de entrada
├── index.html              # HTML base (Vite entry)
├── tailwind.config.js      # Configuración de Tailwind
└── package.json            # Dependencias
```

## Especificaciones de Funcionalidades

### 1. Portal Institucional ("Zen" Web)
**Objetivo**: Presentar la identidad del Dojo y captar leads.
**Relaciones con APIs**:
*   Formulario de contacto: Integración inicial vía `mailto:` o servicio estático como Formspree (para MVP sin backend).
*   Almacenamiento local para preferencias de tema (si aplica).

**Requisitos detallados**:
1.  **Diseño Visual**: Implementar paleta de colores sobria (Blanco, Negro, Rojo, Gris) con amplio uso de espacio en blanco. Tipografías legibles.
2.  **Secciones**:
    *   **Hero**: Imagen de fondo de alta calidad + Call to Action "Empieza Hoy".
    *   **Instructores**: Cards con foto, nombre y rango. Hover para ver la biografía.
    *   **Ubicación**: Mapa insertado (iframe Google Maps) o link directo.
3.  **Responsive**: Menú hamburguesa en móvil que se despliega suavemente.
4.  **Página de Sedes (Nuevo)**:
    *   Listado detallado de cada Dojo.
    *   Sección de Staff por sede: Profesor Principal (Sensei) y Ayudantes (Sempai), mostrando nombre y grado (Dan/Kyu).

**Guía detallada de implementación**:
1.  **Setup**: Inicializar proyecto con `npm create vite@latest . -- --template react` e instalar Tailwind CSS.
2.  **Routing**: Configurar `react-router-dom` en `App.jsx` con rutas para `/`, `/sedes`, `/dashboard`, `/kumite`.
3.  **Componentes UI**: Crear componentes atómicos en `src/components/ui` (Button, Card, SectionTitle) usando clases de Tailwind.
4.  **Paginas Portal**:
    *   `src/pages/Portal/Home.jsx`: Hero section y resumen.
    *   `src/pages/Portal/Sedes.jsx`: Mapeo de un array de objetos (datos de sedes) para renderizar tarjetas de sedes y listas de staff.

### 2. Dashboard de Gestión (Data-Driven)
**Objetivo**: Transformar datos crudos de Excel en insights visuales.
**Relaciones con APIs**:
*   `SheetJS (xlsx)`: Lectura de archivos locales.
*   `Chart.js`: Renderizado de gráficos.

**Requisitos detallados**:
1.  **Ingesta de Datos**:
    *   Input de tipo file que acepte `.xlsx`.
    *   Validación básica de estructura de columnas (Nombre, Asistencia, Grado).
2.  **Procesamiento**:
    *   Calcular % de asistencia = (Clases Asistidas / Clases Totales) * 100.
    *   Identificar alumnos "En Riesgo" (Asistencia < 50%).
3.  **Visualización**:
    *   Gráfico de Barras: Top 10 alumnos más constantes.
    *   Tarjetas de KPI: Números grandes y claros en la parte superior.

**Guía detallada de implementación**:
1.  Crear `src/pages/Dashboard/DashboardLayout.jsx` con Sidebar persistente.
2.  Implementar `useExcelParser` hook que envuelva `xlsx` para leer archivos y retornar datos JSON.
3.  Crear componente `KpiCard` para mostrar métricas.
4.  Usar `react-chartjs-2` para renderizar los gráficos en componentes como `AttendanceChart.jsx`.

### 3. Sistema de Kumite (WKF Standard)
**Objetivo**: Proveer una herramienta profesional para arbitraje.
**Relaciones con APIs**:
*   `window.localStorage`: Guardar estado del combate en caso de recarga accidental.
*   `JSON.stringify`: Para exportar logs.

**Requisitos detallados**:
1.  **Control de Tiempo**:
    *   Cronómetro regresivo editable (default 3:00 o 2:00 según categoría).
    *   Botones de Start, Stop, Reset.
2.  **Puntuación**:
    *   Botones grandes para +1, +2, +3 (Aka/Ao).
    *   Visualización clara de penalizaciones (C1, C2).
    *   Indicador de "Senshu" (toggle manual/automático).
3.  **Reglas de Negocio**:
    *   Detectar automáticamente diferencia de 8 puntos -> Fin del combate.
    *   Si tiempo == 0, bloquear puntaje (opcional).
4.  **Personalización y Proyección (Nuevo)**:
    *   **Fondo Personalizable**: Input para subir imagen (`FileReader`) que reemplace el fondo neutro.
    *   **Modo Proyección**: Botón para abrir una ventana secundaria limpia (sin controles) que replica el marcador en tiempo real.

**Guía detallada de implementación**:
1.  Crear contexto `TournamentContext` para manejar el estado global del combate (puntos, tiempo, configuración).
2.  **Timer Custom Hook**: `useTimer(initialTime)` que maneje `setInterval` de forma precisa y pausable.
3.  **Componente Scoreboard**: `src/pages/Tournament/KumiteScoreboard.jsx` dividido en subcomponentes `CompetitorPanel` (Rojo/Azul).
4.  **Proyección**:
    *   Usar `BroadcastChannel` API para comunicación robusta entre tabs/ventanas.
    *   Crear ruta especial `/kumite/view` que renderice solo el marcador en modo "Solo lectura", consumiendo los mensajes del canal.
5.  **Personalización**: Componente `ImageUploader` que guarde la imagen en State/Context local para renderizar el fondo.

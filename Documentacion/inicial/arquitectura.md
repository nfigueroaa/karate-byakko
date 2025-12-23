## Funcionalidades de Lanzamiento (MVP)

### Portal Institucional (Web Pública)
Plataforma web moderna y "Zen" diseñada para atraer nuevos estudiantes y centralizar la información institucional.
* Landing Page con estética japonesa.
* Secciones informativas: Historia, Maestros, Sedes.
* Formulario de contacto funcional.
* Diseño totalmente responsivo y personalizable (Logo).

### Dashboard de Gestión de Dojo (Versión 1.5)
Panel de administración para visualizar el estado del dojo, centrado en la carga de datos y visualización local.
* Carga masiva de datos (Alumnos, Asistencia) vía Excel.
* Visualización gráfica de KPIs (Asistencia, Activos vs Inactivos).
* Listado de alumnos con estado.

### Sistema de Gestión de Torneos - Kumite
Herramienta digital para el arbitraje oficial de combates según reglas WKF.
* Marcador oficial con control de tiempo y puntos.
* Gestión de penalizaciones y reglas automáticas (Senshu, diferencia de 8 puntos).
* Vista espejo para proyección en pantallas externas.
* Logs de combate descargables.

### Tecnología Involucrada
* **Frontend**: React 18+ (Hooks, Context API).
* **Build Tool**: Vite (Rápido, HMR).
* **Estilos**: Tailwind CSS (Utilitarios), Framer Motion (Animaciones "Zen").
* **Enrutamiento**: React Router DOM v6.
* **Librerías**: React-Chartjs-2 (Visualización), xlsx (Excel).
* **Despliegue**: GitHub Pages / Vercel (CI/CD nativo).

### Requisitos Principales
* SPA (Single Page Application) para transiciones fluidas.
* Componentización (Reusabilidad de botones, cards, gráficos).
* Compatibilidad PWA (Vite PWA Plugin) desde el inicio.

## Funcionalidades Futuras (Post MVP)

### Sistema de Gestión de Torneos - Kata
Módulo avanzado para la puntuación de formas con múltiples jueces.
* Panel de votación digital para jueces.
* Algoritmo de cálculo de puntaje WKF (descarte de extremos).
* Gestión de rondas y desempates.

### Backend y Autenticación en la Nube
Migración de la persistencia local a una base de datos real y segura.
* Login con Google (OAuth2).
* Base de datos en tiempo real (Firebase/Supabase).
* Sincronización de datos entre dispositivos.

### Aplicación Móvil Nativa/PWA
Extensión del ecosistema para el acceso rápido de estudiantes.
* Check-in con QR.
* Carnet digital.
* Notificaciones Push.

### Tecnología Involucrada
* **Backend**: Firebase (Auth, Firestore, Storage) / Supabase.
* **Mobile**: React Native (Compartiendo lógica con la web) o PWA Instalable.

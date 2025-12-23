# 🥋 Byakko Karte-Do Platform v2.0 (React + Vite)

<div align="center">
  <img src="https://img.shields.io/badge/Stack-React_v18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Style-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</div>

## 🌟 Descripción
Plataforma web integral de nueva generación para **Byakko Karate-Do Chile**.
Reconstruida desde cero con tecnologías modernas (React) para ofrecer una experiencia más rápida, interactiva y escalable. Incluye gestión de sedes, análisis de rendimiento y un sistema profesional de arbitraje WKF.

---

## ✨ Características Principales

### 🏠 Portal Institucional
- **Navegación SPA**: Transiciones instantáneas entre páginas.
- **Directorio de Sedes Interactivo**: Filtrado dinámico de equipo docente según el Dojo seleccionado.
- **Mapas Integrados**: Enlaces directos a ubicación por GPS.
- **Diseño Premium**: Estética moderna con modo oscuro/claro (Dark Mode ready).

### 🏆 Sistema de Torneos (Kumite WKF 2025)
Panel de control profesional para arbitraje de Karate Deportivo.
- **⏱️ Cronómetro de Precisión**: Control total de tiempo, pausa y reseteo.
- **🔊 Sonidos Japoneses Nativos**: Voces sintetizadas ("Hajime", "Yame", "Aka No Kachi") con pronunciación correcta.
- **🔔 Atoshi Baraku**: Aviso automático y por voz a los 15 segundos finales.
- **⚡ Mercy Rule (8 Puntos)**: Detección automática de victoria por diferencia.
- **📺 Modo Proyección**: Ventana independiente (`/kumite/view`) optimizada para TV/Proyectores sin bordes ni controles.
- **⚖️ Soporte Hantei**: Flujo completo para decisión arbitral en caso de empate.

### 📊 Dashboard de Gestión (Analytics)
- **Importación Excel**: Procesamiento local de planillas de asistencia con `SheetJS`.
- **KPIs en Tiempo Real**: Gráficos interactivos (`Chart.js`) de asistencia, retención y progreso técnico.
- **Data Privada**: El procesamiento se realiza en el navegador por privacidad.

---

## 🛠️ Tecnologías

*   **Core**: React 18, Vite.
*   **Estilos**: Tailwind CSS, CSS Modules.
*   **Estado**: React Context API (`TournamentContext`).
*   **Gráficos**: Chart.js, React-Chartjs-2.
*   **Datos**: SheetJS (XLSX), Supabase (Integración futura).
*   **Audio**: Web Speech API (Synthesis), Web Audio API (Oscillators).

---

## 🚀 Instalación y Uso

1.  **Clonar repositorio**
    ```bash
    git clone https://github.com/nfigueroaa/karate-byakko.git
    cd karate-byakko
    ```

2.  **Instalar dependencias**
    ```bash
    pnpm install
    # o
    npm install
    ```

3.  **Iniciar Servidor de Desarrollo**
    ```bash
    pnpm run dev
    ```
    Visita `http://localhost:5173`.

---

## 👨‍💻 Desarrollador

**Nelson Figueroa Albarrán**
*1° Dan Karate Do - Byakko Yuzenkai Chile*

---

© 2025 Karate Do Byakko. Todos los derechos reservados.

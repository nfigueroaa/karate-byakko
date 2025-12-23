# Byakko Karate-Do Platform

Plataforma Web para la gestión del Dojo Byakko, torneos y portal institucional.

## Requisitos Previos

*   **Node.js**: v18.0.0 o superior [Descargar Node.js](https://nodejs.org/)

## Instalación y Ejecución

Es necesario tener instalado **Node.js** y **pnpm** para ejecutar este proyecto.

1.  Si no tienes pnpm, instálalo (ej. `npm install -g pnpm` o usando el instalador de Windows).
2.  Abre una terminal en esta carpeta.
3.  Ejecuta el siguiente comando para instalar las librerías:
    ```bash
    pnpm install
    ```
4.  Una vez instalado, inicia el servidor de desarrollo:
    ```bash
    pnpm dev
    ```
5.  Abre el link que aparece (usualmente `http://localhost:5173`) en tu navegador.

## Estructura del Proyecto

*   `src/components`: Componentes reutilizables (Botones, Gráficos).
*   `src/pages`: Vistas principales (Home, Dashboard, Kumite).
*   `src/context`: Estado global de la aplicación.

## Stack Tecnológico

*   React + Vite
*   Tailwind CSS
*   Chart.js

# ☁️ Guía de Despliegue en Google Cloud Platform (Cloud Run)

Esta guía te permitirá desplegar la plataforma **Byakko Karate-Do** en Google Cloud Run utilizando contenedores Docker. Es una solución barata, escalable y segura.

## Prerrequisitos

1.  Tener una cuenta en [Google Cloud Platform](https://console.cloud.google.com/).
2.  Tener instalado el [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/docs/install).

## Opción 1: Despliegue Directo (Desde el Código Fuente)

Esta es la opción más sencilla si no quieres manejar Docker manualmente; Google Cloud Build lo hará por ti.

### 1. Iniciar sesión y seleccionar proyecto
Abre tu terminal y loguéate:
```bash
gcloud auth login
```
Crea o selecciona un proyecto (reemplaza `ID_DE_TU_PROYECTO`):
```bash
# Crear uno nuevo (opcional)
gcloud projects create byakko-web-platform --name="Byakko Web"

# Seleccionar proyecto
gcloud config set project ID_DE_TU_PROYECTO
```

### 2. Habilitar servicios necesarios
Necesitas activar Cloud Run y Cloud Build:
```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### 3. Ejecutar el despliegue
Ejecuta este comando desde la raíz del proyecto. Este comando subirá tu código, construirá el contenedor en la nube y lo desplegará.

```bash
gcloud run deploy byakko-platform \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

*   `byakko-platform`: Nombre del servicio en la nube.
*   `--source .`: Usa el código actual y el `Dockerfile` que creamos.
*   `--region`: `us-central1` suele ser la más barata, pero puedes usar la que prefieras (ej. `southamerica-west1` para Santiago, aunque suele ser más cara).
*   `--allow-unauthenticated`: Hace que el sitio sea público para todo el mundo.

### 4. ¡Listo!
Al finalizar, la terminal te mostrará una URL (ej: `https://byakko-platform-xyz-uc.a.run.app`). Esa es tu aplicación en vivo.

---

## Opción 2: Configuración de Dominio Personalizado

Si quieres usar `www.karatebyakko.cl` en lugar de la dirección de Cloud Run:

1.  Ve a la consola de [Cloud Run](https://console.cloud.google.com/run).
2.  Haz clic en "Administrar dominios personalizados" (Manage Custom Domains).
3.  Añade tu dominio.
4.  Te pedirá verificar que eres dueño del dominio (vía registro TXT en tu DNS).
5.  Una vez verificado, te dará una IP o registro CNAME para configurar en tu proveedor de dominio (NIC Chile, GoDaddy, etc.).
6.  GCP gestionará el certificado SSL (HTTPS) automáticamente.

## Costos Estimados
Para un sitio con tráfico moderado (cientos de visitas al mes):
*   Probablemente **$0 USD / mes** (dentro de la capa gratuita).
*   Cloud Run cobra solo cuando se procesan solicitudes. El contenedor se apaga si nadie entra.

---
**Soporte**
Si el despliegue falla, revisa el archivo `Dockerfile` y asegúrate de que no hay errores de sintaxis en el código antes de subir.

# 🗄️ Plan de Migración a Base de Datos (Supabase)

## 1. Configuración Inicial
- [ ] **Crear Proyecto en Supabase**:
    - Ir a [supabase.com](https://supabase.com) y crear un nuevo proyecto "Byakko Platform".
    - Obtener `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
- [ ] **Instalación de Cliente**:
    - Ejecutar en terminal: `pnpm add @supabase/supabase-js`
- [ ] **Variables de Entorno**:
    - Crear archivo `.env` en la raíz del proyecto para guardar las llaves de seguridad.

## 2. Diseño de Base de Datos (Schema)
Necesitamos crear las siguientes tablas en PostgreSQL:

### Tabla: `competitors` (Competidores)
- `id` (uuid, PK)
- `first_name` (text)
- `last_name` (text)
- `dojo` (text)
- `category` (text)
- `rank` (text) // Dan/Kyu

### Tabla: `tournaments` (Torneos)
- `id` (uuid, PK)
- `name` (text)
- `date` (date)
- `location` (text)
- `status` (enum: 'planned', 'active', 'finished')

### Tabla: `matches` (Combates)
- `id` (uuid, PK)
- `tournament_id` (fk -> tournaments)
- `aka_competitor_id` (fk -> competitors)
- `ao_competitor_id` (fk -> competitors)
- `winner_id` (fk -> competitors)
- `aka_score` (int)
- `ao_score` (int)
- `status` (enum: 'pending', 'live', 'finished')

## 3. Integración en el Frontend
- [ ] **Reemplazar `useExcel`**:
    - Crear un servicio `src/services/competitors.js` para leer datos desde Supabase en lugar de procesar el Excel localmemte.
    - El Excel podría servir ahora solo para *importar* datos masivos a la nube.
- [ ] **Sincronización en Tiempo Real (Reemplazo de BroadcastChannel)**:
    - Actualmente usamos `BroadcastChannel` que solo funciona en el *mismo* navegador.
    - Con Supabase Realtime, el árbitro puede estar en una Tablet y la TV conectada a una PC distinta, y el marcador se actualizará al instante vía internet.

## 4. Autenticación (Opcional pero recomendado)
- [ ] Implementar Login para que solo los administradores puedan editar marcadores o subir participantes.

---
**¿Te gustaría que comencemos con el Paso 1 instalando las dependencias y configurando el cliente?**

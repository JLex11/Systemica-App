# Contratos Backend - Systemica

Documento inferido desde el frontend (`src/services`, `src/pages`, `src/components`).

## Base
- `BASE_URL`: `https://systemicaback.herokuapp.com`
- Header autenticación (cuando aplica): `Authorization: <token>`
- Tipo de contenido en `POST/PUT`: `Content-Type: application/json`

## Convención de respuestas esperadas
El frontend espera, en la mayoría de endpoints:

```json
{
  "results": {},
  "message": "string opcional",
  "error": "string opcional"
}
```

Para listados:

```json
{
  "results": []
}
```

## Autenticación y registro

### POST `/login`
Request:
```json
{ "email": "string", "password": "string" }
```

Response esperada por UI:
```json
{
  "results": {
    "token": "string",
    "user_info": {
      "id_usuario": 1,
      "username": "string",
      "email": "string",
      "rol": "alumno|contratista"
    },
    "tipos_documento": [
      {
        "id_tipo_documento": 1,
        "tipo": "Cédula de ciudadanía",
        "tipo_abreviado": "CC"
      }
    ]
  },
  "message": "Login exitoso"
}
```

### POST `/register`
Request:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "rol": "alumno|contratista"
}
```

Response esperada:
```json
{
  "results": {
    "token": "string",
    "user_info": {
      "id_usuario": 1,
      "username": "string",
      "email": "string",
      "rol": "alumno|contratista"
    },
    "tipos_documento": []
  },
  "message": "Usuario registrado"
}
```

## Usuarios

### GET `/usuarios`
Auth requerido. Devuelve lista en `results`.

### PUT `/usuarios`
Auth requerido.
Request (actualización):
```json
{
  "id_usuario": 1,
  "nombres": "string",
  "apellidos": "string",
  "edad": 20,
  "nro_documento": "string|number",
  "telefono": "string"
}
```

### DELETE `/usuarios/:id`
Auth requerido.

### GET `/usuarios?assocTables=tabla1,tabla2`
El frontend también construye esta variante para asociaciones.

## Alumnos

### GET `/alumnos`
### GET `/alumnos?assocTables=cursos,usuarios.alumnos`
### POST `/alumnos`
Request:
```json
{
  "id_usuario": 1,
  "nombres": "string",
  "apellidos": "string",
  "edad": 20,
  "nro_documento": "string|number",
  "id_tipo_documento": 1,
  "telefono": "string",
  "id_curso": 1
}
```

### PUT `/alumnos/:id`
Request: mismo shape de alumno (campos editables según UI: `nombres`, `apellidos`, `edad`, `nro_documento`, `telefono`).

### DELETE `/alumnos/:id`

Entidad esperada en `results`:
```json
{
  "id_alumno": 1,
  "id_usuario": 1,
  "nombres": "string",
  "apellidos": "string",
  "edad": 20,
  "nro_documento": "string|number",
  "telefono": "string",
  "id_curso": 1
}
```

## Contratistas

### GET `/contratistas`
### POST `/contratistas`
Request:
```json
{
  "id_usuario": 1,
  "nombres": "string",
  "apellidos": "string",
  "edad": 20,
  "nro_documento": "string|number",
  "id_tipo_documento": 1,
  "telefono": "string",
  "id_establecimiento": 1
}
```

### PUT `/contratistas/:id`
### DELETE `/contratistas/:id`

Entidad esperada:
```json
{
  "id_contratista": 1,
  "id_usuario": 1,
  "nombres": "string",
  "apellidos": "string",
  "edad": 20,
  "nro_documento": "string|number",
  "telefono": "string",
  "id_establecimiento": 1
}
```

## Instituciones educativas

### GET `/instituciones_educativas`
### GET `/instituciones_educativas?assocTables=...`
### POST `/instituciones_educativas`
### PUT `/instituciones_educativas`
### DELETE `/instituciones_educativas/:id`

Request create/update:
```json
{
  "nombre": "string",
  "direccion": "string",
  "nit": "string|number",
  "telefono": "string",
  "url": "string",
  "img_url": "string"
}
```

Entidad esperada:
```json
{
  "id_institucion_educativa": 1,
  "nombre": "string",
  "direccion": "string",
  "nit": "string|number",
  "telefono": "string",
  "url": "string",
  "img_url": "string"
}
```

## Establecimientos

### GET `/establecimientos`
### GET `/establecimientos?assocTables=...`
### POST `/establecimientos`
### PUT `/establecimientos`
### DELETE `/establecimientos/:id`

Request create/update:
```json
{
  "nombre": "string",
  "tipo": "string",
  "direccion": "string",
  "nit": "string|number",
  "telefono": "string",
  "url": "string",
  "img_url": "string"
}
```

Entidad esperada:
```json
{
  "id_establecimiento": 1,
  "nombre": "string",
  "tipo": "string",
  "direccion": "string",
  "nit": "string|number",
  "telefono": "string",
  "url": "string",
  "img_url": "string"
}
```

## Cursos

### GET `/cursos`
### GET `/cursos?assocTables=...`
### POST `/cursos`
Request:
```json
{
  "curso": "string|number",
  "grupo": "string",
  "id_institucion_educativa": 1
}
```

### PUT `/cursos`
### DELETE `/cursos/:id`

Entidad esperada:
```json
{
  "id_curso": 1,
  "curso": "string|number",
  "grupo": "string",
  "id_institucion_educativa": 1
}
```

## Proyectos (alfabetizaciones)

### GET `/alfabetizaciones`
### POST `/alfabetizaciones`
### PUT `/alfabetizaciones/:id`
### DELETE `/alfabetizaciones/:id`

Request create/update:
```json
{
  "fecha_inicio": "YYYY-MM-DD",
  "fecha_finalizacion": "YYYY-MM-DD",
  "horas_realizadas": 0,
  "estado": "En progreso|Finalizado|Detenido|Cancelado",
  "id_alumno": 1,
  "id_contratista": 1
}
```

Entidad esperada:
```json
{
  "id_alfabetizacion": 1,
  "fecha_inicio": "YYYY-MM-DD",
  "fecha_finalizacion": "YYYY-MM-DD",
  "horas_realizadas": 0,
  "estado": "En progreso",
  "id_alumno": 1,
  "id_contratista": 1
}
```

### GET asociado de alfabetización-tareas
El frontend consume:
- `/alfabetizacion_tarea?assocTables=...`

## Tareas

### GET `/tareas`
### GET `/tareas?assocTables=...`
### POST `/tareas`
Request:
```json
{
  "titulo": "string",
  "descripcion": "string",
  "tarea_estado": "En progreso|Finalizado|Detenido|Cancelado",
  "id_alfabetizacion": 1,
  "fecha": "YYYY-MM-DD"
}
```

### PUT `/tareas/:id`
Request: mismo shape de tarea (sin requerir `id_alfabetizacion` en edición de UI).

### DELETE `/tareas/:id`

Entidad esperada:
```json
{
  "id_tarea": 1,
  "titulo": "string",
  "descripcion": "string",
  "tarea_estado": "En progreso",
  "id_alfabetizacion": 1,
  "fecha": "YYYY-MM-DD"
}
```

## Validaciones mínimas inferidas desde frontend
- `username`: regex `/[a-z0-9_-]{3,29}/i`
- `email`: formato email estándar
- `password`: regex `/^[a-zA-Z0-9]{5,16}/`
- Proyecto:
  - `horas_realizadas` obligatorio
  - `fecha_finalizacion >= fecha_inicio`
- Tarea:
  - `titulo` y `descripcion` obligatorios

## Inconsistencias detectadas (revisar al implementar backend)
1. `Contratistas.getContratistasAssoc` apunta a `/alfabetizacion_tarea` en lugar de `/contratistas?...`.
2. En acciones hay llamadas `getX(assocTables, id, token)` pero varios servicios `getX` aceptan solo `token`.
3. En algunos `PUT` del frontend no se envía `:id` en URL (`/cursos`, `/establecimientos`, `/instituciones_educativas`, `/usuarios`), mientras en otros sí (`/alumnos/:id`, `/contratistas/:id`, `/tareas/:id`, `/alfabetizaciones/:id`).
4. En creación de proyecto (`Proyectos/ActionBar`) se envía `estado: estado.value.value` (posible bug de frontend).
5. En desarrollo hay bypass/mocks en login y alumnos, así que contrato real debe confirmarse en backend.

## Recomendación para cerrar contrato backend/frontend
- Definir OpenAPI 3.1 con estos recursos.
- Estandarizar respuesta (`results`, `message`, `error`) y códigos HTTP.
- Unificar estrategia de `PUT` (`/:id` o body con id).
- Confirmar y documentar `assocTables` permitidas por recurso.

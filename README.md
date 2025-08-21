# Blog App

Aplicación de blog construida con NestJS, siguiendo los principios de DDD, SOLID y arquitectura Hexagonal. Incluye configuración de Docker y ESLint.

## Descripción

Este proyecto permite gestionar usuarios y artículos en un blog, con separación clara de capas y buenas prácticas de diseño.

## Principales Entidades

- **User**: Usuario del sistema, con value objects para email, id y nombre.
- **Article**: Artículo del blog, con value objects para id, título y contenido. Cada artículo tiene un autor (User).

## Arquitectura

- **DDD**: Separación entre dominio, aplicación e infraestructura.
- **Hexagonal**: Uso de puertos y adaptadores para desacoplar el núcleo de la aplicación.
- **SOLID**: Principios de diseño para código mantenible y escalable.

## Utilidades Compartidas

- Carpeta `shared/` con contratos, tipos, servicios y DTOs reutilizables (ej. paginación, generación de IDs).

## Configuración y Ejecución

### Instalar dependencias

  ```bash
  yarn install
  ```

### Ejecución
  ```bash
  docker-compose up --build

  yarn start:dev
  ```

### Linting

  ```bash
  yarn lint
  ```

### Endpoints Principales

## Endpoints Principales

### Artículos

- `POST /articles` - Crear artículo
- `GET /articles` - Listar artículos
- `GET /articles/:id` - Obtener artículo por ID
- `PUT /articles/:id` - Actualizar artículo
- `DELETE /articles/:id` - Eliminar artículo

### Usuarios

- `POST /users` - Crear usuario
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario por ID
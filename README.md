# Songs Microservice 🎵

Un microservicio desarrollado con NestJS para la gestión de canciones con operaciones CRUD completas.

## 📋 Descripción

Este microservicio proporciona una API REST para gestionar canciones, permitiendo crear, leer, actualizar y eliminar registros de canciones en una base de datos SQL Server.

## 🚀 Características

- ✅ Operaciones CRUD completas (Create, Read, Update, Delete)
- ✅ Validación de datos con class-validator
- ✅ Conexión a SQL Server con TypeORM
- ✅ Arquitectura modular con NestJS
- ✅ Contenedorización con Docker
- ✅ Variables de entorno para configuración
- ✅ Manejo de errores y respuestas consistentes
- ✅ Endpoint adicional para incrementar reproducciones

## 🛠️ Tecnologías Utilizadas

- **Framework**: NestJS (Node.js + TypeScript)
- **Base de Datos**: SQL Server
- **ORM**: TypeORM
- **Validación**: class-validator
- **Contenedorización**: Docker
- **Variables de Entorno**: dotenv

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- npm
- SQL Server (local o remoto)
- Docker (opcional)

### Instalación Local

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd songs-microservice
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=usr_polimusic_gr2
DB_PASSWORD=Politecnica1
DB_NAME=BDD_PoliMusic_Song
PORT=3000
NODE_ENV=development
```

4. Ejecutar el script SQL proporcionado para crear la base de datos y tabla.

5. Ejecutar la aplicación:
```bash
npm run start:dev
```

## 🔧 Scripts Disponibles

- `npm run start` - Ejecutar en modo producción
- `npm run start:dev` - Ejecutar en modo desarrollo (watch)
- `npm run start:debug` - Ejecutar en modo debug
- `npm run build` - Compilar el proyecto
- `npm run test` - Ejecutar tests
- `npm run lint` - Ejecutar linter

## 🐳 Docker

### Construcción y ejecución con Docker

1. Construir la imagen:
```bash
docker build -t songs-microservice .
```

2. Ejecutar con docker-compose:
```bash
docker-compose up -d
```

## 📚 API Endpoints

Base URL: `http://localhost:3000/api`

### Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información del servicio |
| GET | `/health` | Estado del servicio |
| GET | `/songs` | Obtener todas las canciones |
| GET | `/songs/:id` | Obtener canción por ID |
| POST | `/songs` | Crear nueva canción |
| PUT | `/songs/:id` | Actualizar canción completa |
| PATCH | `/songs/:id` | Actualizar canción parcial |
| DELETE | `/songs/:id` | Eliminar canción |
| PATCH | `/songs/:id/play` | Incrementar reproducciones |

### Ejemplos de Uso

#### 1. Obtener todas las canciones
```bash
GET /api/songs
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Songs retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Adventure",
      "path": "../songFiles/bensound-adventure.mp3",
      "plays": 0
    }
  ]
}
```

#### 2. Crear una nueva canción
```bash
POST /api/songs
Content-Type: application/json

{
  "name": "Nueva Canción",
  "path": "/music/nueva-cancion.mp3",
  "plays": 0
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Song created successfully",
  "data": {
    "id": 6,
    "name": "Nueva Canción",
    "path": "/music/nueva-cancion.mp3",
    "plays": 0
  }
}
```

#### 3. Actualizar una canción
```bash
PUT /api/songs/1
Content-Type: application/json

{
  "name": "Adventure Updated",
  "path": "../songFiles/bensound-adventure-updated.mp3",
  "plays": 10
}
```

#### 4. Eliminar una canción
```bash
DELETE /api/songs/1
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Song with ID 1 has been deleted successfully"
}
```

## 🗃️ Estructura del Proyecto

```
src/
├── controllers/          # Controladores HTTP
│   └── songs.controller.ts
├── dto/                 # Data Transfer Objects
│   ├── create-song.dto.ts
│   └── update-song.dto.ts
├── entities/            # Entidades de base de datos
│   └── song.entity.ts
├── modules/             # Módulos de NestJS
│   └── songs.module.ts
├── services/            # Servicios de lógica de negocio
│   └── songs.service.ts
├── app.controller.ts    # Controlador principal
├── app.module.ts        # Módulo principal
├── app.service.ts       # Servicio principal
└── main.ts              # Punto de entrada
```

## 🔍 Validaciones

El microservicio incluye validaciones automáticas para:

- **name**: Requerido, debe ser string
- **path**: Requerido, debe ser string
- **plays**: Opcional, debe ser número >= 0

## 🚨 Manejo de Errores

La API maneja los siguientes errores:

- **400**: Bad Request - Datos de entrada inválidos
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error interno del servidor

## 📊 Logging

El microservicio incluye logging automático de:

- Consultas SQL (en desarrollo)
- Errores de aplicación
- Requests HTTP

## 🔒 Seguridad

- Validación de entrada con class-validator
- Sanitización automática de datos
- CORS habilitado para desarrollo

## 📈 Despliegue

### Opciones de Despliegue

1. **Docker Hub + Cloud Provider**
2. **Azure Container Instances**
3. **AWS ECS/Fargate**
4. **Google Cloud Run**
5. **Heroku**

### Variables de Entorno para Producción

```env
DB_HOST=<production-db-host>
DB_PORT=1433
DB_USERNAME=<production-username>
DB_PASSWORD=<production-password>
DB_NAME=BDD_PoliMusic_Song
PORT=3000
NODE_ENV=production
```

## 🧪 Testing

Para probar el microservicio, puedes usar:

- **Postman**: Importar la colección de endpoints
- **Insomnia**: Configurar las requests manualmente
- **curl**: Comandos de línea
- **Thunder Client** (VS Code Extension)

## 👨‍💻 Autor

Desarrollado como parte del deber académico - Microservicio con CRUD Canciones

---

¡Gracias por usar Songs Microservice! 🎵

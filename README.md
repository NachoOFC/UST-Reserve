server/
├── api/              ← Endpoints expuestos (como /api/study-rooms)
│   └── study-rooms/
│       ├── index.ts      ← Maneja GET (listar) y POST (crear) para /api/study-rooms
│       └── [id].ts       ← Maneja GET, PUT, DELETE para /api/study-rooms/:id
├── db/               ← Conexión con Neon (base de datos PostgreSQL en la nube)
│   └── neon.ts           ← Configuración y exportación del cliente SQL
├── queries/          ← Consultas a la base de datos (organizadas por tabla o feature)
│   └── studyRooms.ts     ← Funciones para CRUD de salas de estudio
├── types/            ← Tipos globales opcionales (interfaces, enums, etc)
│   └── studyRoom.ts      ← (Ejemplo) Tipado de una sala de estudio
└── utils/            ← Funciones útiles (formato, validaciones, etc)
    └── formatDate.ts (ejemplo)

---

# Explicación de la estructura

- **api/**: Aquí van los endpoints de la API. Cada carpeta representa una ruta. Por ejemplo, `study-rooms/index.ts` maneja `/api/study-rooms` y `study-rooms/[id].ts` maneja `/api/study-rooms/:id`.
- **db/**: Configuración de la conexión a la base de datos Neon (PostgreSQL serverless).
- **queries/**: Funciones que realizan las consultas SQL y devuelven los datos. Aquí se centraliza la lógica de acceso a datos.
- **types/**: (Opcional) Tipos TypeScript globales para mantener el tipado consistente en todo el backend.
- **utils/**: Funciones auxiliares reutilizables, como formateo de fechas, validaciones, etc.

# Flujo típico de una petición
1. El frontend hace una petición a un endpoint de `api/` (por ejemplo, POST `/api/study-rooms`).
2. El endpoint recibe la petición y llama a la función correspondiente de `queries/`.
3. La función de `queries/` ejecuta la consulta SQL usando el cliente de `db/neon.ts`.
4. El resultado se devuelve al frontend como JSON.

# Ejemplo de endpoints
- **GET /api/study-rooms**: Lista todas las salas.
- **POST /api/study-rooms**: Crea una nueva sala.
- **GET /api/study-rooms/:id**: Obtiene una sala por id.
- **PUT /api/study-rooms/:id**: Actualiza una sala por id.
- **DELETE /api/study-rooms/:id**: Elimina una sala por id.

# Notas
- La estructura sigue buenas prácticas de separación de responsabilidades.
- Puedes agregar más carpetas en `queries/` y `types/` según crezcan tus features.
- Los endpoints usan métodos HTTP estándar (RESTful).

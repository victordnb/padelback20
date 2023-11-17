
```markdown
# Backend de la Aplicación de Jugadores

Este es el backend de la aplicación de jugadores. Está construido con Node.js, Express y MongoDB.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
npm install
```

## Uso

Para iniciar el servidor, ejecuta:

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`.

## API

La API tiene las siguientes rutas:

### POST /api/players

Crea un nuevo jugador.

#### Request

El cuerpo de la solicitud debe ser un objeto JSON con las siguientes propiedades:

- `name`: String, requerido
- `score`: Number, requerido

#### Response

Si la solicitud es exitosa, recibirás una respuesta con un código de estado HTTP 200 y el siguiente cuerpo:

```json
{
  "message": "Datos recibidos y guardados en la base de datos"
}
```

Si ocurre un error, recibirás una respuesta con un código de estado HTTP 500 y un mensaje de error.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.
```

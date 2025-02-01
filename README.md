# 1. Información básica del proyecto

## Ocassio

Es una aplicación web para la gestión de eventos.

# 2. Descripción

En el desarrollo del proyecto, se ha implementado inicialmente la funcionalidad que permite a los usuarios crear una cuenta o registrarse en la plataforma en caso de no tener una cuenta previa. Una vez que el usuario ha iniciado sesión, se le presenta una lista donde están los eventos que el usuario ha agregado. Cada tarjeta muestra la imagen del evento, su titulo, fecha, hora y ubicación. Además, cada tarjeta o evento incluye un botón para editar los detalles del evanto y otro boton para eliminar el evento. Finalmente, el usuario dispone de un botón para cerrar sesión. El objetivo de este proyecto es poner en práctica los conocimientos adquiridos durante la etapa lectiva de Tecnico Laboral en Asistente en Desarrollo de Software.

# 3. Instalación

Para utilizar el proyecto, primero es necesario comprender la estructura de carpetas. La carpeta principal del proyecto se llama "event-management", y dentro de ella se encuentran dos subcarpetas: "be" y "fe", que contienen respectivamente el backend y el frontend.

El proyecto sigue el modelo de arquitectura MERN (MongoDB, Express, React, Node.js). En el backend, se utiliza Node.js como entorno de ejecución de JavaScript, y Express.js para simplificar la creación de rutas, middleware y controladores para el manejo de solicitudes HTTP. Para la persistencia de datos, se emplea MongoDB Atlas, una base de datos no relacional para la gestión de productos.

En el frontend, React.js se encarga de renderizar la vista en el navegador y gestionar el estado de la interfaz de usuario.

### En resumen:

Frontend: React.js + Vite y Bootstrap

Backend: Node.js + Express.js (lógica del servidor) + MongoDB (almacenamiento de datos)

### Ejecución Backend:

1. Abra una terminal dentro de la carpeta "event-management".

2. Ejecute el siguiente comando:

### `cd be/`

3. Instalar las dependencias:

### `npm install`

4. Iniciar el servidor:

### `npm run start`

5. Previamente asegúrese de tener las herramientas necesarias como Node.js y npm.

### `node -v` y `npm -v`

### Ejecución Frontend:

1. Abra una terminal dentro de la carpeta "event-management".

2. Ejecute el siguiente comando:

### `cd fe/`

3. Instalar las dependencias:

### `npm install`

4. Iniciar el servidor:

### `npm run dev`

5. Configuración adicional (si es necesario)

- Archivo .env: Asegúrate de que las variables en el archivo .env estén correctamente configuradas (por ejemplo, URL de la API del backend).

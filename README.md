
# Proyecto de Finanzas API - README

Este proyecto es una aplicación de finanzas que permite gestionar categorías, transacciones y usuarios, con autenticación JWT implementada.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (versión 14.x o superior)

NPM (viene junto con Node.js)

PostgreSQL (o la base de datos que vayas a utilizar)

## Configuración del proyecto

1. Clonar el repositorio

Clona este repositorio en tu máquina local:

  

```bash
git clone <url_del_repositorio>

cd <nombre_del_repositorio>
```

2. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```
3. Configurar la base de datos

Asegúrate de que tu base de datos PostgreSQL esté en funcionamiento y crea una base de datos para el proyecto. Luego, configura el acceso a la base de datos en el archivo ormconfig.json o app.module.ts si estás usando TypeORM:

  

```json
{
"type": "postgres",
"host": "localhost",
"port": 5432,
"username": "tu_usuario",
"password": "tu_contraseña",
"database": "nombre_de_tu_base_de_datos",
"entities": ["dist/**/*.entity{.ts,.js}"],
"synchronize": true

}
```
4. Ejecutar la migración (opcional)

Si tienes migraciones para la base de datos, puedes ejecutarlas con el siguiente comando:

```bash
npm run typeorm migration:run
```

5. Iniciar el servidor

Inicia el servidor de desarrollo con el siguiente comando:

```bash
npm run start:dev
```
El servidor debería estar corriendo en http://localhost:3000.

## Endpoints disponibles

### Autenticación JWT

#### Login (Obtener token)

POST /auth/login

Body:

```json
{
"username": "testuser",
"password": "testpassword"
}
```

Respuesta exitosa:

```json
{
"access_token": "token_jwt_aquí"
}
```

#### Obtener perfil autenticado

GET /auth/profile

Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```

### Usuarios

#### Crear usuario

POST /user

Body:

```json
{
"username": "nuevo_usuario",
"password": "contrasena",
"active": true
}
```

#### Obtener todos los usuarios

 
GET /user

### Categorías

#### Crear una categoría

POST /categories

Body:

```json
{
"description": "Entretenimiento"
}
```
Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```

#### Obtener todas las categorías

GET /categories

Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```

#### Obtener una categoría por ID

  

GET /categories/:id

Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```

#### Actualizar una categoría
  
PUT /categories/:id

Body:

```json
{
"description": "Salud"
}
```
Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```
#### Eliminar una categoría

DELETE /categories/:id

Headers:

```json

{
"Authorization": "Bearer <tu_token>"
}
```
### Transacciones

#### Crear una transacción


POST /transactions

Body:

```json

{
"amount": 100,
"date": "2024-09-10",
"description": "Compra de alimentos",
"user": 1,
"category": 1
}

Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```
#### Obtener todas las transacciones

GET /transactions

Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```
#### Obtener una transacción por ID

GET /transactions/:id

Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```

#### Actualizar una transacción  

PUT /transactions/:id

Body:

```json
{
"amount": 150,
"date": "2024-09-11",
"description": "Compra de ropa",
"user": 1,
"category": 2
}
```
Headers:

```json
{
"Authorization": "Bearer <tu_token>"
}
```
#### Eliminar una transacción

DELETE /transactions/:id

Headers:

``` json
{
"Authorization": "Bearer <tu_token>"
}
```
## Probar con Postman

Puedes probar todos los endpoints utilizando Postman. Para simplificar la configuración, incluye una colección de Postman que ya tiene todos los endpoints preparados.


- Importa la colección JSON proporcionada en Postman.

- Configura la variable baseUrl con la URL donde está corriendo tu API (por ejemplo, http://localhost:3000).

- Realiza el Login primero para obtener el token JWT y configúralo en la variable token en Postman.

A partir de ahí, puedes probar todos los demás endpoints agregando el token a la cabecera Authorization.

## Swagger

Esta API está documentada utilizando Swagger. Una vez que el servidor esté corriendo, puedes acceder a la documentación en:


```bash
http://localhost:3000/api
```
Swagger te permitirá interactuar con los endpoints directamente desde el navegador.
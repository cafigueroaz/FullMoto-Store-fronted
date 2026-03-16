# FullMoto Store -- Frontend

FullMoto es una plataforma e-commerce dedicada a la venta de accesorios para motocicletas y equipamiento para motociclistas. Este repositorio contiene el **cliente web** construido con Angular.

## Tech Stack

| Tecnologia        | Version | Proposito                        |
| ----------------- | ------- | -------------------------------- |
| Angular           | 21.x    | Framework SPA                    |
| Angular CLI       | 21.x    | Herramientas de desarrollo       |
| TypeScript        | 5.9     | Lenguaje principal               |
| RxJS              | 7.8     | Programacion reactiva            |
| ngx-mask          | 20.x    | Mascaras de entrada en forms     |
| Vitest            | 4.x     | Test runner para pruebas unitarias |

## Instalacion

```bash
# 1. Clonar el repositorio
git clone https://github.com/cafigueroaz/FullMoto-Store-fronted.git
cd FullMoto-Store-fronted

# 2. Instalar dependencias
npm install

# 3. Configurar el entorno
# Editar src/environments/environment.ts con la URL de la API:
#   apiUrl: 'http://localhost:3000/api/v1'

# 4. Ejecutar en desarrollo
npm start
```

La aplicacion estara disponible en `http://localhost:4200/`.

## Estructura del Proyecto

```
src/
├── environments/                    # Variables de entorno
├── main.ts                          # Entry point
├── styles.css                       # Estilos globales
└── app/
    ├── app.ts                       # Componente raiz
    ├── app.routes.ts                # Definicion de rutas
    ├── app.config.ts                # Configuracion de la app
    ├── core/
    │   ├── guards/
    │   │   ├── auth-guard.ts        # Proteccion de rutas autenticadas
    │   │   ├── public-guard-guard.ts # Bloqueo de rutas publicas para usuarios logueados
    │   │   └── role-guard.ts        # Proteccion por rol (admin, staff)
    │   ├── interfaces/
    │   │   ├── user.ts              # Interfaz de usuario
    │   │   └── response-login.ts    # Interfaz de respuesta de login
    │   └── services/
    │       ├── http-auth.ts         # Servicio de autenticacion
    │       ├── http-cart.ts         # Servicio de carrito
    │       ├── http-category.ts     # Servicio de categorias
    │       ├── http-product.ts      # Servicio de productos
    │       ├── http-user.ts         # Servicio de usuarios
    │       ├── cart.services.ts     # Logica local del carrito
    │       └── pagos.services.ts    # Logica de pagos
    ├── features/
    │   └── pages/
    │       ├── home/                # Pagina de inicio
    │       ├── login/               # Inicio de sesion
    │       ├── register/            # Registro de usuario
    │       ├── catalog/             # Catalogo de productos
    │       ├── categories/          # Paginas de categorias
    │       ├── products/            # Detalle, listado y formularios de productos
    │       ├── cart/                # Carrito de compras
    │       ├── pagos/               # Proceso de pago
    │       ├── confirmacion/        # Confirmacion de compra
    │       ├── mis-compras/         # Historial de compras
    │       ├── profile/             # Perfil de usuario
    │       ├── dashboard/           # Panel de administracion
    │       ├── users/               # Gestion de usuarios (admin)
    │       └── page-not-found/      # Pagina 404
    └── shared/
        └── layout/
            ├── card/                # Componente de tarjeta
            ├── footer/              # Pie de pagina
            ├── header/              # Encabezado
            └── navbar/              # Barra de navegacion
```

## Rutas de la Aplicacion

### Publicas

| Ruta                 | Componente       | Descripcion                    |
| -------------------- | ---------------- | ------------------------------ |
| `/home`              | Home             | Pagina de inicio               |
| `/login`             | Login            | Inicio de sesion               |
| `/register`          | Register         | Registro de usuario            |
| `/catalogo`          | CatalogPage      | Catalogo general de productos  |
| `/catalogo/:id`      | CategoryPage     | Productos por categoria        |
| `/producto/:id`      | ProductsDetail   | Detalle de un producto         |
| `/cart`              | CartPage         | Carrito de compras             |
| `/pagos`             | Pagos            | Proceso de pago                |
| `/confirmacion`      | Confirmacion     | Confirmacion de compra         |
| `/mis-compras`       | MisCompras       | Historial de compras           |
| `/404`               | PageNotFound     | Pagina no encontrada           |

### Protegidas (requieren autenticacion)

| Ruta                 | Componente       | Descripcion                    |
| -------------------- | ---------------- | ------------------------------ |
| `/profile/:id`       | ProfilePage      | Perfil del usuario             |

### Dashboard (requieren autenticacion + rol)

| Ruta                                  | Componente       | Roles requeridos   |
| ------------------------------------- | ---------------- | ------------------ |
| `/dashboard/productos`                | ProductList      | `admin`, `staff`   |
| `/dashboard/productos/crear`          | ProductNewForm   | `admin`, `staff`   |
| `/dashboard/productos/editar/:id`     | ProductEditForm  | `admin`, `staff`   |
| `/dashboard/categorias`               | CategoryList     | `admin`, `staff`   |
| `/dashboard/categorias/crear`         | CategoryNewForm  | `admin`, `staff`   |
| `/dashboard/categorias/editar/:id`    | CategoryEditForm | `admin`, `staff`   |
| `/dashboard/usuarios`                 | UsersList        | `admin`            |
| `/dashboard/usuarios/crear`           | Register         | `admin`            |
| `/dashboard/usuarios/editar/:id`      | UsersEditForm    | `admin`            |

## Guards

| Guard          | Descripcion                                                |
| -------------- | ---------------------------------------------------------- |
| `AuthGuard`    | Verifica que el usuario este autenticado (token JWT valido) |
| `publicGuard`  | Impide acceso a login/register si ya esta autenticado       |
| `roleGuard`    | Verifica que el usuario tenga el rol requerido por la ruta  |

## Servicios HTTP

| Servicio           | Descripcion                                   |
| ------------------ | --------------------------------------------- |
| `http-auth`        | Login, registro y renovacion de token          |
| `http-cart`        | Operaciones CRUD del carrito contra la API     |
| `http-category`    | Operaciones CRUD de categorias contra la API   |
| `http-product`     | Operaciones CRUD de productos contra la API    |
| `http-user`        | Operaciones CRUD de usuarios contra la API     |
| `cart.services`    | Logica local de gestion del carrito            |
| `pagos.services`   | Logica de procesamiento de pagos               |

## Scripts Disponibles

| Comando         | Descripcion                              |
| --------------- | ---------------------------------------- |
| `npm start`     | Servidor de desarrollo en puerto 4200    |
| `npm run build` | Build de produccion en `dist/`           |
| `npm test`      | Ejecutar pruebas unitarias con Vitest    |
| `npm run watch` | Build en modo watch (desarrollo)         |

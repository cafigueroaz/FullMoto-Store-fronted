# FullMoto Store -- Frontend

FullMoto es una plataforma e-commerce dedicada a la venta de accesorios para motocicletas y equipamiento para motociclistas. Este repositorio contiene el **cliente web** construido con Angular.

## Tech Stack

| Tecnologia  | Version | Proposito                          |
| ----------- | ------- | ---------------------------------- |
| Angular     | 21.0    | Framework SPA                      |
| Angular CLI | 21.0    | Herramientas de desarrollo         |
| TypeScript  | 5.9     | Lenguaje principal                 |
| RxJS        | 7.8     | Programacion reactiva              |
| ngx-mask    | 20.x    | Mascaras de entrada en forms       |
| Vitest      | 4.x     | Test runner para pruebas unitarias |

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

```text
src/
├── environments/                    # Variables de entorno
├── main.ts                          # Entry point
├── styles.css                       # Estilos globales
└── app/
    ├── app.ts                       # Componente raiz
    ├── app.routes.ts                # Definicion de rutas
    ├── app.config.ts                # Configuracion de la app
    ├── core/
    │   ├── guards/                  # Guards para proteccion de rutas
    │   ├── interfaces/              # Interfaces TS
    │   └── services/                # Servicios HTTP y logica de negocio
    ├── features/
    │   ├── auth/                    # Login y Registro
    │   ├── cart/                    # Carrito de compras
    │   ├── catalog/                 # Catalogo general
    │   ├── categories/              # Categoria individual
    │   ├── checkout/                # Pagos, confirmacion, historial
    │   ├── dashboard/               # Panel de administracion (CRUD)
    │   ├── home/                    # Pagina de inicio
    │   ├── page-not-found/          # Pagina 404
    │   ├── products/                # Detalle de producto
    │   └── profile/                 # Perfil de usuario
    └── shared/
        ├── components/              # Componentes reutilizables
        └── layout/                  # Encabezado, pie de pagina, etc.
```

## Rutas de la Aplicacion

### Publicas

| Ruta            | Componente     | Descripcion                   |
| --------------- | -------------- | ----------------------------- |
| `/home`         | Home           | Pagina de inicio              |
| `/login`        | Login          | Inicio de sesion              |
| `/register`     | Register       | Registro de usuario           |
| `/catalogo`     | CatalogPage    | Catalogo general de productos |
| `/catalogo/:id` | CategoryPage   | Productos por categoria       |
| `/producto/:id` | ProductsDetail | Detalle de un producto        |
| `/404`          | PageNotFound   | Pagina no encontrada          |

### Protegidas (requieren autenticacion)

| Ruta                             | Componente   | Descripcion            |
| -------------------------------- | ------------ | ---------------------- |
| `/profile/:id`                   | ProfilePage  | Perfil del usuario     |
| `/profile/:id/profile/my-orders` | MyOrders     | Historial del compras  |
| `/cart`                          | CartPage     | Carrito de compras     |
| `/checkout`                      | Checkout     | Proceso de pago        |
| `/confirmacion`                  | Confirmation | Confirmacion de compra |

### Dashboard (requieren autenticacion + rol)

| Ruta                               | Componente       | Roles requeridos |
| ---------------------------------- | ---------------- | ---------------- |
| `/dashboard/productos`             | ProductList      | `admin`, `staff` |
| `/dashboard/productos/crear`       | ProductNewForm   | `admin`, `staff` |
| `/dashboard/productos/editar/:id`  | ProductEditForm  | `admin`, `staff` |
| `/dashboard/categorias`            | CategoryList     | `admin`, `staff` |
| `/dashboard/categorias/crear`      | CategoryNewForm  | `admin`, `staff` |
| `/dashboard/categorias/editar/:id` | CategoryEditForm | `admin`, `staff` |
| `/dashboard/usuarios`              | UsersList        | `admin`          |
| `/dashboard/usuarios/crear`        | Register         | `admin`          |
| `/dashboard/usuarios/editar/:id`   | UsersEditForm    | `admin`          |

## Guards

| Guard              | Descripcion                                                 |
| ------------------ | ----------------------------------------------------------- |
| `AuthGuard`        | Verifica que el usuario este autenticado (token JWT valido) |
| `publicGuardGuard` | Impide acceso a login/register si ya esta autenticado       |
| `roleGuard`        | Verifica que el usuario tenga el rol requerido por la ruta  |

## Servicios HTTP y Locales

| Servicio        | Descripcion                                  |
| --------------- | -------------------------------------------- |
| `http-auth`     | Login, registro y renovacion de token        |
| `http-cart`     | Operaciones CRUD del carrito contra la API   |
| `http-category` | Operaciones CRUD de categorias contra la API |
| `http-product`  | Operaciones CRUD de productos contra la API  |
| `http-user`     | Operaciones CRUD de usuarios contra la API   |

## Scripts Disponibles

| Comando         | Descripcion                           |
| --------------- | ------------------------------------- |
| `npm start`     | Servidor de desarrollo en puerto 4200 |
| `npm run build` | Build de produccion en `dist/`        |
| `npm test`      | Ejecutar pruebas unitarias con Vitest |
| `npm run watch` | Build en modo watch (desarrollo)      |

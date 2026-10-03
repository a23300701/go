# GomiFyles, front en Astro

Estructura (igual que el tutorial de Astro):

```
src/
├── components/   piezas reutilizables (.astro y .jsx de React)
├── layouts/      BaseLayout.astro (el molde con <slot />)
├── pages/        index (bienvenida), tienda, categoria/[id], carrito, checkout, login, admin y api/
├── scripts/      graphql.js (fetch al backend), sesion.js (cookie), menu.js y tema.js
├── stores/       carrito y busqueda (nanostores)
└── styles/       global.css
```

Correr (con el backend ya prendido):

```
npm install
copy .env.example .env
npm run dev
```

Abre http://localhost:4321

## Autenticación

El backend firma un JWT con el id y el rol, y Astro lo guarda en la cookie `sesion` (httpOnly).

- **Administrador:** correo y contraseña en `/login`. El formulario llama a `/api/auth/login`. `/admin` solo abre si el rol es admin.
- **Clientes:** "Entrar con GitHub". `/api/auth/github` manda a GitHub y `/api/auth/github/callback` recibe el código, pide los datos y crea o busca la cuenta con rol cliente.
- `/api/auth/me` lee la cookie y le pregunta al backend quién es. `/api/auth/salir` borra la cookie.
- Para hacer un pedido hay que tener sesión: el checkout lo manda por `/api/pedido`, que le pasa el token al backend.

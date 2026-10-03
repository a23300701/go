Node.js instalado
Una base de PostgreSQL (local o en la nube)

Como correrlo
1. Instala las dependencias:
npm install

2. Necesitas una base de PostgreSQL. Dos opciones:

   - Local: instala PostgreSQL, crea una base llamada `gomifyles`.
   - En la nube (más fácil, no instalas nada): crea una base gratis en
     Neon (neon.tech) o Supabase (supabase.com), y copia host, usuario,
     contraseña y nombre de la base.

   Con esos datos, edita `src/app.module.ts`, en el bloque
   `TypeOrmModule.forRoot({ ... })`, y pon tu host/usuario/contraseña/base
   en vez de los que están ahí (son de un Postgres local de ejemplo).

   Si usas Neon o Supabase, deja la línea `ssl: { rejectUnauthorized: false }`
   tal cual (la piden ellos). Si usas Postgres local y te da error de
   conexión por SSL, borra esa línea completa.

3. Levanta el servidor:
   npm run start

4. Abre `http://localhost:3000/graphql` para probar queries y mutations
   sin necesidad del frontend.

## Cómo está organizado

Un módulo por entidad: `categoria/`, `producto/`, `pedido/`, `detalle-pedido/` y `usuario/`.
Cada uno tiene: `*.entity.ts` (type de GraphQL + tabla), `*.service.ts` (lógica),
`*.resolver.ts` (queries/mutations). `producto/producto.input.ts` trae los
inputs para crear/actualizar producto.

## Ejemplos para el Playground

Catálogo con categoría:
```graphql
{
  productos {
    id
    nombre
    precio
    disponibilidad
    categoria { nombre }
  }
}
```

Detalle de un producto:
```graphql
{
  producto(id: 1) {
    nombre
    precio
    sabores
    disponibilidad
  }
}
```

Login del administrador (devuelve un token):
```graphql
mutation {
  iniciarSesion(input: { email: "admin@gomifyles.com", password: "Admin1234" }) {
    token
    usuario { nombre rol }
  }
}
```

Las mutations de abajo piden el token. En el Playground, abajo en "HTTP headers" pon:
```json
{ "Authorization": "Bearer EL_TOKEN_QUE_TE_DIO_EL_LOGIN" }
```

CRUD de producto (solo administrador):
```graphql
mutation {
  crearProducto(input: {
    nombre: "Paletas de gomita"
    precio: 25
    disponibilidad: 30
    categoriaId: 2
  }) { id nombre }
}

mutation {
  actualizarProducto(input: { id: 1, precio: 49.00 }) { id nombre precio }
}

mutation {
  eliminarProducto(id: 1)
}
```

Registrar un pedido (checkout), con el token de cualquier usuario con sesión:
```graphql
mutation {
  crearPedido(items: [{ productoId: 1, cantidad: 2 }, { productoId: 2, cantidad: 1 }]) {
    id
    total
    detalles {
      cantidad
      producto { nombre }
    }
  }
}
```

Ver todos los pedidos (solo administrador):
```graphql
{
  pedidos {
    id
    total
    usuario { nombre }
  }
}
```

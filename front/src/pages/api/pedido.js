import { consultarGraphQL } from '../../scripts/graphql.js'
import { COOKIE_SESION } from '../../scripts/sesion.js'

export async function POST({ request, cookies }) {
  const token = cookies.get(COOKIE_SESION)?.value

  if (!token) {
    return Response.json({ error: 'Debes iniciar sesión' }, { status: 401 })
  }

  const { items } = await request.json()

  try {
    const datos = await consultarGraphQL(
      `
        mutation ($items: [ItemPedidoInput!]!) {
          crearPedido(items: $items) { id total }
        }
      `,
      { items },
      token,
    )
    return Response.json(datos.crearPedido)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 })
  }
}

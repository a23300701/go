import { consultarGraphQL } from './graphql.js'

export const COOKIE_SESION = 'sesion'

export function guardarSesion(cookies, token) {
  cookies.set(COOKIE_SESION, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function usuarioDeLaCookie(cookies) {
  const token = cookies.get(COOKIE_SESION)?.value
  if (!token) return null

  try {
    const datos = await consultarGraphQL('{ yo { id nombre email rol } }', {}, token)
    return datos.yo
  } catch {
    return null
  }
}

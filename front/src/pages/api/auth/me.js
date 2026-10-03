import { usuarioDeLaCookie } from '../../../scripts/sesion.js'

export async function GET({ cookies }) {
  const usuario = await usuarioDeLaCookie(cookies)

  if (!usuario) {
    return Response.json({ error: 'No hay sesión' }, { status: 401 })
  }

  return Response.json({ usuario })
}

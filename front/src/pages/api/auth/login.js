import { consultarGraphQL } from '../../../scripts/graphql.js'
import { guardarSesion } from '../../../scripts/sesion.js'

export async function POST({ request, cookies, redirect }) {
  const formulario = await request.formData()

  try {
    const datos = await consultarGraphQL(
      `
        mutation ($input: IniciarSesionInput!) {
          iniciarSesion(input: $input) { token }
        }
      `,
      { input: { email: formulario.get('email'), password: formulario.get('password') } },
    )
    guardarSesion(cookies, datos.iniciarSesion.token)
    return redirect('/admin')
  } catch {
    return redirect('/login?error=1')
  }
}

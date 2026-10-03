import { consultarGraphQL } from '../../../../scripts/graphql.js'
import { guardarSesion } from '../../../../scripts/sesion.js'

export async function GET({ url, cookies, redirect }) {
  const codigo = url.searchParams.get('code')
  const estado = url.searchParams.get('state')
  const estadoGuardado = cookies.get('estado_github')?.value

  cookies.delete('estado_github', { path: '/' })

  if (!codigo || !estado || estado !== estadoGuardado) {
    console.error('GitHub: el state no coincide o falta el code. Entra siempre desde http://localhost:4321')
    return redirect('/login?error=github')
  }

  try {
    const respuestaToken = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: import.meta.env.GITHUB_CLIENT_ID,
        client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
        code: codigo,
        redirect_uri: import.meta.env.GITHUB_REDIRECT_URI,
      }),
    })
    const { access_token, error, error_description } = await respuestaToken.json()

    if (!access_token) {
      console.error('GitHub no dio el token:', error, error_description)
      return redirect('/login?error=github')
    }

    const cabeceras = { Authorization: `Bearer ${access_token}`, 'User-Agent': 'gomifyles' }
    const perfil = await (await fetch('https://api.github.com/user', { headers: cabeceras })).json()

    if (!perfil.id) {
      console.error('GitHub no dio el perfil:', perfil)
      return redirect('/login?error=github')
    }

    let correo = perfil.email
    if (!correo) {
      const correos = await (await fetch('https://api.github.com/user/emails', { headers: cabeceras })).json()
      correo = Array.isArray(correos) ? correos.find((c) => c.primary)?.email : null
    }

    const datos = await consultarGraphQL(
      `
        mutation ($githubId: String!, $nombre: String!, $email: String, $clave: String!) {
          entrarConGithub(githubId: $githubId, nombre: $nombre, email: $email, clave: $clave) { token }
        }
      `,
      {
        githubId: String(perfil.id),
        nombre: perfil.name || perfil.login,
        email: correo,
        clave: import.meta.env.CLAVE_INTERNA,
      },
    )

    guardarSesion(cookies, datos.entrarConGithub.token)
    return redirect('/tienda')
  } catch (e) {
    console.error('Fallo el backend o la conexion:', e.message)
    return redirect('/login?error=github')
  }
}
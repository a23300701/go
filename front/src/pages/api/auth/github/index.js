export function GET({ cookies, redirect }) {
  const estado = crypto.randomUUID()

  cookies.set('estado_github', estado, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })

  const parametros = new URLSearchParams({
    client_id: import.meta.env.GITHUB_CLIENT_ID,
    redirect_uri: import.meta.env.GITHUB_REDIRECT_URI,
    scope: 'read:user user:email',
    state: estado,
  })

  return redirect(`https://github.com/login/oauth/authorize?${parametros}`)
}

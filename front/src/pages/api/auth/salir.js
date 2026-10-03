import { COOKIE_SESION } from '../../../scripts/sesion.js'

export function POST({ cookies, redirect }) {
  cookies.delete(COOKIE_SESION, { path: '/' })
  return redirect('/tienda')
}

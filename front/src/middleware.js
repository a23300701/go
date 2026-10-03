import { defineMiddleware } from 'astro:middleware'
import { usuarioDeLaCookie } from './scripts/sesion.js'

export const onRequest = defineMiddleware(async (contexto, siguiente) => {
  contexto.locals.usuario = await usuarioDeLaCookie(contexto.cookies)
  return siguiente()
})

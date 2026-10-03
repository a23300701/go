const URL_BACKEND = 'http://localhost:3000/graphql'

export async function consultarGraphQL(query, variables = {}, token) {
  const cabeceras = { 'Content-Type': 'application/json' }
  if (token) cabeceras.Authorization = `Bearer ${token}`

  const respuesta = await fetch(URL_BACKEND, {
    method: 'POST',
    headers: cabeceras,
    body: JSON.stringify({ query, variables }),
  })

  const resultado = await respuesta.json()

  if (resultado.errors) {
    throw new Error(resultado.errors[0].message)
  }

  return resultado.data
}

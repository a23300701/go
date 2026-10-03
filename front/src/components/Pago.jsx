import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { carrito, totalCarrito, vaciarCarrito } from '../stores/carrito'

export default function Pago({ usuario }) {
  const items = useStore(carrito)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [pedido, setPedido] = useState(null)

  async function confirmarPedido(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError(null)

    const itemsParaBackend = items.map((item) => ({
      productoId: item.producto.id,
      cantidad: item.cantidad,
    }))

    const respuesta = await fetch('/api/pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: itemsParaBackend }),
    })
    const datos = await respuesta.json()

    if (respuesta.ok) {
      setPedido(datos)
      vaciarCarrito()
    } else {
      setError(datos.error)
    }

    setEnviando(false)
  }

  if (!usuario) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 texto-suave">Para hacer un pedido tienes que iniciar sesión.</p>
        <a href="/login" className="boton">Entrar</a>
      </div>
    )
  }

  if (pedido) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Pedido confirmado</p>
        <p className="mb-6 texto-suave">Pedido #{pedido.id} · Total ${pedido.total}</p>
        <a href="/tienda" className="hover:underline" style={{ color: 'var(--color-primary)' }}>Volver al catálogo</a>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 texto-suave">No hay nada en tu carrito.</p>
        <a href="/tienda" className="hover:underline" style={{ color: 'var(--color-primary)' }}>Ir al catálogo</a>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl mb-6">Confirmar compra</h2>

      <form onSubmit={confirmarPedido} className="flex flex-col gap-4">
        <div className="tarjeta p-4">
          <p className="text-sm mb-1 texto-suave">Cliente: {usuario.nombre}</p>
          <p className="text-sm mb-2 texto-suave">{items.length} producto(s) en el pedido</p>
          <p className="text-lg font-semibold">Total: ${totalCarrito(items).toFixed(2)}</p>
        </div>

        {error && <p className="text-sm texto-error">{error}</p>}

        <button type="submit" disabled={enviando} className="boton">
          {enviando ? 'Enviando...' : 'Confirmar pedido'}
        </button>

        <a href="/carrito" className="text-sm hover:underline texto-suave">← Volver al carrito</a>
      </form>
    </div>
  )
}

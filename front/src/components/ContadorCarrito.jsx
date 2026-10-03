import { useStore } from '@nanostores/react'
import { carrito } from '../stores/carrito'

export default function ContadorCarrito() {
  const items = useStore(carrito)
  const cantidad = items.reduce((suma, item) => suma + item.cantidad, 0)

  if (cantidad === 0) return null

  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs rounded-full font-medium"
      style={{ background: 'var(--color-primary)', color: 'var(--color-primary-ink)' }}
    >
      {cantidad}
    </span>
  )
}

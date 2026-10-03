import { useStore } from '@nanostores/react'
import { carrito, quitarProducto, totalCarrito } from '../stores/carrito'

export default function ListaCarrito() {
  const items = useStore(carrito)

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 texto-suave">Tu carrito está vacío.</p>
        <a href="/tienda" className="hover:underline" style={{ color: 'var(--color-primary)' }}>Ir al catálogo</a>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl mb-6">Tu carrito</h2>

      <div className="flex flex-col gap-3 mb-6">
        {items.map((item) => (
          <div key={item.producto.id} className="tarjeta flex items-center gap-4 p-3">
            <img src={item.producto.imagen} alt="" className="h-16 w-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-medium">{item.producto.nombre}</p>
              <p className="text-sm texto-suave">{item.cantidad} × ${item.producto.precio}</p>
            </div>
            <button type="button" onClick={() => quitarProducto(item.producto.id)} className="text-xs hover:underline texto-error">
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-lg font-semibold">Total: ${totalCarrito(items).toFixed(2)}</p>
        <a href="/checkout" className="boton">Ir a pagar</a>
      </div>
    </div>
  )
}

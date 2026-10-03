import { useState } from 'react'

export default function DetalleProducto({ producto, onAgregar }) {
  const [cantidad, setCantidad] = useState(1)
  const agotado = producto.disponibilidad <= 0

  return (
    <div>
      <img src={producto.imagen} alt={producto.nombre} className="h-48 w-full object-cover rounded mb-4" />
      <p className="text-sm mb-1 texto-suave">{producto.categoria.nombre}</p>
      <h4 className="text-xl mb-2">{producto.nombre}</h4>
      <p className="text-lg font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>${producto.precio}</p>

      {producto.sabores?.length > 0 && (
        <p className="text-sm mb-2 texto-suave">Sabores: {producto.sabores.join(', ')}</p>
      )}

      <p className="text-sm mb-4">
        {agotado ? (
          <span className="texto-error">Agotado</span>
        ) : (
          <span className="texto-suave">{producto.disponibilidad} disponibles</span>
        )}
      </p>

      {!agotado && (
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            max={producto.disponibilidad}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="campo w-20"
          />
          <button type="button" onClick={() => onAgregar(producto, cantidad)} className="boton flex-1">
            Agregar al carrito
          </button>
        </div>
      )}
    </div>
  )
}

export default function TarjetaProducto({ producto, onSeleccionar }) {
  const agotado = producto.disponibilidad <= 0

  return (
    <button
      type="button"
      onClick={() => onSeleccionar(producto)}
      disabled={agotado}
      className="tarjeta text-left p-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img src={producto.imagen} alt={producto.nombre} className="h-32 w-full object-cover rounded mb-3" />
      <p className="font-medium mb-1">{producto.nombre}</p>
      <p className="font-semibold" style={{ color: 'var(--color-accent)' }}>${producto.precio}</p>
      <p className="text-xs mt-1 texto-suave">
        {agotado ? 'Agotado' : `${producto.disponibilidad} disponibles`}
      </p>
    </button>
  )
}

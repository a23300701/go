import { useState } from 'react'
import TarjetaProducto from './TarjetaProducto'
import DetalleProducto from './DetalleProducto'
import Modal from './Modal'
import { useStore } from '@nanostores/react'
import { agregarProducto } from '../stores/carrito'
import { busqueda } from '../stores/busqueda'

export default function Catalogo({ productos }) {
  const texto = useStore(busqueda).toLowerCase()
  const [seleccionado, setSeleccionado] = useState(null)

  const filtrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(texto))

  function agregarYCerrar(producto, cantidad) {
    agregarProducto(producto, cantidad)
    setSeleccionado(null)
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filtrados.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} onSeleccionar={setSeleccionado} />
        ))}
      </div>

      {filtrados.length === 0 && (
        <p className="mt-6 texto-suave">No se encontraron productos con ese nombre.</p>
      )}

      <Modal abierto={!!seleccionado} onCerrar={() => setSeleccionado(null)} titulo="Detalle del producto">
        {seleccionado && <DetalleProducto producto={seleccionado} onAgregar={agregarYCerrar} />}
      </Modal>
    </div>
  )
}

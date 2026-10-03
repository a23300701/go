import { useStore } from '@nanostores/react'
import { busqueda } from '../stores/busqueda'

export default function Buscador() {
  const texto = useStore(busqueda)

  return (
    <input
      type="text"
      value={texto}
      onChange={(e) => busqueda.set(e.target.value)}
      placeholder="Buscar por nombre de producto..."
      className="campo"
    />
  )
}

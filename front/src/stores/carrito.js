import { atom } from 'nanostores'

function leerGuardado() {
  if (typeof localStorage === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem('carrito')) || []
  } catch {
    return []
  }
}

export const carrito = atom(leerGuardado())

function actualizar(items) {
  carrito.set(items)
  localStorage.setItem('carrito', JSON.stringify(items))
}

export function agregarProducto(producto, cantidad = 1) {
  const items = carrito.get()
  const yaExiste = items.find((item) => item.producto.id === producto.id)

  if (yaExiste) {
    actualizar(
      items.map((item) =>
        item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item,
      ),
    )
  } else {
    const { id, nombre, imagen, precio } = producto
    actualizar([...items, { producto: { id, nombre, imagen, precio }, cantidad }])
  }
}

export function quitarProducto(productoId) {
  actualizar(carrito.get().filter((item) => item.producto.id !== productoId))
}

export function vaciarCarrito() {
  actualizar([])
}

export function totalCarrito(items) {
  return items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0)
}

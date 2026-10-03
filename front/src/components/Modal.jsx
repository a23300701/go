import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ abierto, onCerrar, titulo, children }) {
  useEffect(() => {
    if (!abierto) return

    const cerrarConEsc = (e) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', cerrarConEsc)

    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', cerrarConEsc)
      document.body.style.overflow = overflowPrevio
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCerrar}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
        className="tarjeta relative w-full max-w-lg p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg">{titulo}</h3>
          <button onClick={onCerrar} aria-label="Cerrar" className="boton-borde">
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

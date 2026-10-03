document.getElementById('botonTema')?.addEventListener('click', () => {
  const oscuro = document.documentElement.classList.toggle('dark')
  localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro')
})

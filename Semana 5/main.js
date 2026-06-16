function toggleMenu(btn) {
    const nav = document.getElementById('main-nav');
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
}
  
document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('main-nav');
      const btn = document.querySelector('.menu-toggle');
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menú de navegación');
    });
});
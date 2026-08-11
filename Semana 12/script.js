// ---------------------------------------------
// PRESENTATIONAL: solo sabe renderizar, no sabe de dónde vienen los datos
// ---------------------------------------------
class UserListView {
    constructor(container) {
      this.container = container;
    }
  
    render(users) {
      this.container.innerHTML = `
        <ul class="user-list">
          ${users.map(user => `
            <li class="user-card">
              <img src="${user.photo}" alt="Foto de ${user.name}">
              <div class="user-info">
                <strong>${user.name}</strong>
                <span>${user.email}</span>
              </div>
            </li>
          `).join('')}
        </ul>
      `;
    }
  
    renderLoading() {
      this.container.innerHTML = `<p class="state-message">Cargando usuarios...</p>`;
    }
  
    renderError(message) {
      this.container.innerHTML = `<p class="state-message error">Error: ${message}</p>`;
    }
  }
  
  // ---------------------------------------------
  // CONTAINER: sabe de dónde vienen los datos y maneja el estado/lógica
  // ---------------------------------------------
  class UserListContainer {
    constructor(view) {
      this.view = view;
    }
  
    async loadUsers() {
      this.view.renderLoading();
  
      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        if (!response.ok) throw new Error('No se pudo obtener la lista de usuarios');
  
        const data = await response.json();
  
        // el container procesa/transforma los datos antes de pasarlos
        const simplifiedUsers = data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          photo: user.picture.large
        }));
  
        this.view.render(simplifiedUsers);
      } catch (error) {
        this.view.renderError(error.message);
      }
    }
  }
  
  const containerEl = document.getElementById('app');
  const view = new UserListView(containerEl);
  const controller = new UserListContainer(view);
  
  controller.loadUsers();
  
  document.getElementById('reloadBtn').addEventListener('click', () => {
    controller.loadUsers();
  });
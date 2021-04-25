const openModalButtons = document.querySelector('[data-modal-target]');
const closeModalButtons = document.querySelector('[data-close-button]');
const overlay = document.getElementById('overlay');

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

openModalButtons.addEventListener('click', () => {
  const modal = document.querySelector(openModalButtons.dataset.modalTarget);
  openModal(modal);
});

overlay.addEventListener('click', () => {
  const modal = document.querySelector('.modal.active');
  closeModal(modal);
});

closeModalButtons.addEventListener('click', () => {
  const modal = closeModalButtons.closest('.modal');
  closeModal(modal);
});

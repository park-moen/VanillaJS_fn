const topBtn = document.querySelector('.top-btn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) topBtn.classList.add('active');
  else topBtn.classList.remove('active');
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

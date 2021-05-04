const topBtn = document.querySelector('.top-btn');

console.log(topBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    topBtn.classList.add('active');
  } else {
    topBtn.classList.remove('active');
  }
});

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const images = document.querySelectorAll('img');

const imgOptions = {
  threshold: 0.8,
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    const newURI = img.getAttribute('data-src');
    img.src = newURI;
    imgObserver.unobserve(entry.target);
  });
}, imgOptions);

images.forEach(img => {
  imgObserver.observe(img);
});

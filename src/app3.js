const $carouselContainer = document.querySelector('.carousel-container');
const $carousel = document.querySelector('.carousel');
const $slides = document.getElementsByClassName('slide');
const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');

let index = 0;
const { length } = $slides;
const currTransl = [];
let traslationComplete = true;
let moveOffset = 0;

const transitionCompleted = function () {
  traslationComplete = true;
};

function prev() {
  if (traslationComplete === true) {
    traslationComplete = false;

    index--;

    if (index === -1) {
      index = length - 1;
    }

    const outerIndex = index % length;
    for (let i = 0; i < length; i++) {
      const slide = $slides[i];
      slide.style.opacity = '1';
      slide.style.transform = `translateX(${currTransl[i] + moveOffset}px)`;

      currTransl[i] += moveOffset;
    }

    const outerSlide = $slides[outerIndex];
    outerSlide.style.transform = `translateX(${
      currTransl[outerIndex] - moveOffset * length
    }px)`;

    outerSlide.style.opacity = '0';
    currTransl[outerIndex] -= moveOffset * length;
  }
}

function next() {
  if (traslationComplete === true) {
    traslationComplete = false;
    const outerIndex = index % length;

    index++;

    for (let i = 0; i < length; i++) {
      const slide = $slides[i];
      slide.style.opacity = '1';
      slide.style.transform = `translateX(${currTransl[i] - moveOffset}px)`;

      currTransl[i] -= moveOffset;
    }

    const outerSlide = $slides[outerIndex];

    outerSlide.style.transform = `translateX(${
      currTransl[outerIndex] + moveOffset * length
    }px)`;

    outerSlide.style.opacity = '0';
    currTransl[outerIndex] += moveOffset * length;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // parseInt는 만약 첫번째 자리가 숫자라면 뒤에 문자열이 와도 문자열을 자르고 숫자만을 반환
  moveOffset = parseInt(window.getComputedStyle($carouselContainer).width, 10);

  $carousel.style.width = `${length * moveOffset}px`;

  for (let i = 0; i < length; i++) {
    currTransl[i] = -moveOffset;

    $slides[i].addEventListener('transitionend', transitionCompleted, true);
  }

  $carousel.insertBefore($carousel.children[4], $carousel.children[0]);

  $prev.addEventListener('click', prev);
  $next.addEventListener('click', next);
});

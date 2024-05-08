let slideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  if (index < 0) {
    slideIndex = slides.length - 1;
  } else if (index >= slides.length) {
    slideIndex = 0;
  }
  const slideWidth = slides[0].offsetWidth;
  const offset = -slideIndex * slideWidth;
  document.querySelector('.carousel-slide').style.transform = `translateX(${offset}px)`;
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

showSlide(slideIndex);
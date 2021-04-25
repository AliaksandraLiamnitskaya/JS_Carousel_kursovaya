const slides = document.querySelectorAll(".slide");
const indicatorsContainer = document.querySelector("#indicators-container");

const indicators = document.querySelectorAll(".indicator");
const pauseBtn = document.querySelector("#pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

let slidesCount = slides.length;
let currentSlide = 0;
let timerID = null;
let isPlaying = true;

function gotoSlide(n) {
  indicators[currentSlide].classList.toggle("active");
  slides[currentSlide].classList.toggle("active");
  currentSlide = (n + slidesCount) % slidesCount;
  indicators[currentSlide].classList.toggle("active");
  slides[currentSlide].classList.toggle("active");
}

const prevSlide = () => gotoSlide(currentSlide - 1);

const nextSlide = () => gotoSlide(currentSlide + 1);

function prev() {
  pause();
  prevSlide();
}

function next() {
  pause();
  nextSlide();
}

function pause() {
  if (isPlaying) {
    pauseBtn.innerHTML = "Play";
    isPlaying = false;
    clearInterval(timerID);
  }
}

function play() {
  pauseBtn.innerHTML = "Pause";
  isPlaying = true;
  timerID = setInterval(nextSlide, 1000);
}

const pausePlay = () => (isPlaying ? pause() : play());

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

timerID = setInterval(nextSlide, 1000);

function handler(e) {
  const target = e.target;

  if (target && target.classList.contains('indicator')) {
    pause();
    gotoSlide(+target.dataset.slideTo);

  }
}

indicatorsContainer.addEventListener('click', handler);

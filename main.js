const container = document.querySelector('#carousel');
const slides = container.querySelectorAll(".slide");
const indicatorsContainer = container.querySelector("#indicators-container");
const indicators = indicatorsContainer.querySelectorAll(".indicator");
const pauseBtn = container.querySelector("#pause");
const prevBtn = container.querySelector("#prev");
const nextBtn = container.querySelector("#next");

const CODE_SPACE = "Space";
const CODE_ARROW_LEFT = "ArrowLeft";
const CODE_ARROW_RIGHT = "ArrowRight";

let slidesCount = slides.length;
let currentSlide = 0;
let timerID = null;
let isPlaying = true;
let swipeStartX = null;
let swipeEndX = null;

function gotoSlide(n) {
  indicators[currentSlide].classList.toggle('active');
  slides[currentSlide].classList.toggle('active');
  currentSlide = (n + slidesCount) % slidesCount;
  indicators[currentSlide].classList.toggle('active');
  slides[currentSlide].classList.toggle('active');
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

function handler(e) {
  const target = e.target;

  if (target && target.classList.contains('indicator')) {
    pause();
    gotoSlide(+target.dataset.slideTo);

  }
}

function pressKey(e) {
  if (e.code === CODE_ARROW_LEFT) prev();
  if (e.code === CODE_ARROW_RIGHT) next();
  if (e.code === CODE_SPACE) pausePlay();
}

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].clientX;
  console.log(swipeStartX - swipeEndX);
 
}

function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].clientX;
  swipeStartX - swipeEndX > 100 && prev();
  swipeStartX - swipeEndX < -100 && next();
}

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
indicatorsContainer.addEventListener('click', handler);
document.addEventListener('keydown', pressKey);
container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);


timerID = setInterval(nextSlide, 1000);



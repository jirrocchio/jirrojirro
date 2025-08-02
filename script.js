let slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let slideInterval;

// Show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });

  // Pause auto-slideshow if current slide contains a video
  const currentSlide = slides[index];
  const video = currentSlide.querySelector('video');

  if (video) {
    clearInterval(slideInterval); // Stop auto slide
    video.play(); // Optionally play the video
  }
}

// Move to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Start auto slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

// === Music Toggle ===
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔇";
  }
});

// === Attempt Autoplay + Unlock on Tap ===
window.addEventListener('load', () => {
  bgMusic.play().catch(() => {
    console.log("Autoplay blocked until user interacts.");
  });
});

document.body.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      console.log("Still blocked — manual toggle required.");
    });
  }
}, { once: true });

// === Initialize Slideshow ===
showSlide(currentIndex);
startSlideshow();

// Slide logic
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Initialize
showSlide(currentIndex);
setInterval(nextSlide, 5000);

// Music toggle logic
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

// Enable autoplay after user gesture
document.body.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      console.log("Autoplay failed until user interaction.");
    });
  }
}, { once: true });

// Attempt autoplay directly
window.addEventListener('load', () => {
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.play().catch(() => {
    console.log("Autoplay blocked until user interacts.");
  });
});

// Unlock autoplay on first interaction
document.body.addEventListener('click', () => {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      console.log("Still blocked — user may need to press play.");
    });
  }
}, { once: true });

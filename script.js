const slides = document.querySelectorAll('.slide');
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const restartBtn = document.getElementById("restartBtn");

let currentIndex = 0;
let slideInterval;

// Show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });

  const currentSlide = slides[index];
  const video = currentSlide.querySelector('video');

  // Stop slideshow if this is the last slide (final video)
  if (index === slides.length - 1 && video) {
    clearInterval(slideInterval);
    restartBtn.style.display = 'inline-block';
  } else {
    restartBtn.style.display = 'none';
  }

  // Autoplay video (optional)
  if (video) {
    video.play().catch(() => {
      console.log("Video autoplay blocked.");
    });
  }
}

// Move to the next slide
function nextSlide() {
  currentIndex++;
  if (currentIndex < slides.length) {
    showSlide(currentIndex);
  } else {
    clearInterval(slideInterval);
  }
}

// Start auto slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

// Restart button logic
restartBtn?.addEventListener('click', () => {
  currentIndex = 0;
  showSlide(currentIndex);
  startSlideshow();
  restartBtn.style.display = 'none';
});

// === Music Toggle ===
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔇";
  }
});

// === Autoplay Fallback for Music ===
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

// === Initialize ===
showSlide(currentIndex);
startSlideshow();

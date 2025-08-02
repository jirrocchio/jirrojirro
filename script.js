let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let interval;

// Show one slide at a time
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  if (index < slides.length) {
    slides[index].classList.add("active");

    // Pause auto if slide contains video
    const video = slides[index].querySelector("video");
    if (video) {
      clearInterval(interval);
      video.addEventListener("ended", () => {
        slideIndex++;
        showSlide(slideIndex);
        autoPlay();
      });
    }
  }

  // If it's the last slide, show restart button
  if (index === slides.length - 1) {
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.classList.add("fade-in");
  }
}

// Auto play slides
function autoPlay() {
  interval = setInterval(() => {
    slideIndex++;
    if (slideIndex >= slides.length) {
      clearInterval(interval);
      return;
    }
    showSlide(slideIndex);
  }, 5000);
}

// Music toggle
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔈";
  }
});

// Start slideshow on button click
document.getElementById("startSlideshowBtn").addEventListener("click", () => {
  document.getElementById("startContainer").style.display = "none";
  document.querySelector(".slideshow-container").style.display = "block";
  slides = document.querySelectorAll(".slide");
  slideIndex = 0;
  showSlide(slideIndex);
  autoPlay();
});

// Restart button
document.getElementById("restartBtn").addEventListener("click", () => {
  slideIndex = 0;
  showSlide(slideIndex);
  autoPlay();
  document.getElementById("restartBtn").classList.remove("fade-in");
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.slide');
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const restartBtn = document.getElementById("restartBtn");
  const restartMsg = document.getElementById("restartMsg");

  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });

    const currentSlide = slides[index];
    const video = currentSlide.querySelector('video');

    if (index === slides.length - 1 && video) {
      clearInterval(slideInterval);
      restartBtn.style.display = 'inline-block';
      restartMsg.style.display = 'block';

      setTimeout(() => {
        restartBtn.classList.add('fade-in');
      }, 500);
    } else {
      restartBtn.style.display = 'none';
      restartMsg.style.display = 'none';
      restartBtn.classList.remove('fade-in');
    }

    if (video) {
      video.play().catch(() => {
        console.log("Video autoplay blocked.");
      });
    }
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex < slides.length) {
      showSlide(currentIndex);
    } else {
      clearInterval(slideInterval);
    }
  }

  function startSlideshow() {
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  restartBtn?.addEventListener('click', () => {
    currentIndex = 0;
    showSlide(currentIndex);
    startSlideshow();
    restartBtn.style.display = 'none';
    restartMsg.style.display = 'none';
    restartBtn.classList.remove('fade-in');
  });

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = "🔊";
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🔇";
    }
  });

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

  // Start everything
  showSlide(currentIndex);
  startSlideshow();
});

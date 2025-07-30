document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".tech-swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: false, // Manual loop simulation using cloned slides
    allowTouchMove: true,
    speed: 5000, // Smooth continuous scroll speed
    autoplay: {
      delay: 0, // No delay between loops
      disableOnInteraction: false, // Keep autoplay running after interaction
      reverseDirection: false,
    },
    breakpoints: {
      320: { spaceBetween: 20 },
      480: { spaceBetween: 30 },
      640: { spaceBetween: 40 },
    },
    on: {
      // Before Swiper initializes
      beforeInit: function () {
        const slides = this.el.querySelectorAll(".swiper-slide");

        // Clone each slide to simulate infinite loop visually
        slides.forEach((slide) => {
          this.el
            .querySelector(".swiper-wrapper")
            .appendChild(slide.cloneNode(true));
        });
      },
    },
  });

  // Ensure autoplay starts immediately
  swiper.autoplay.start();
});

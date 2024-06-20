
document.addEventListener("DOMContentLoaded", function () {
    // before after slider
    var beforeAfterSlider = new Splide("#before-after-preview-slider", {
      arrows: true,
      pagination: false,
      perPage: 1,
      mediaQuery: "min",
      breakpoints: {
        1024: {
          perPage: 3,

        },
        576: {
          perPage: 2,
          gap: "12px",
        },
      },
    });
    
    beforeAfterSlider.mount();
  });